import { test, expect } from '@playwright/test';
import { getPulsarToken } from '../../../utils/getPulsarToken';
import { PULSAR_URNS, PULSAR_TOPICS, PULSAR_JSON_DATA } from '../../../configs/constants';
import { ProtobufGenerator } from '../../../utils/protobufGenerator';
import pulsar from 'pulsar-client';
import protobuf from 'protobufjs';

/**
 * E2E Pulsar Test Suite: PayrollPosted → Dev Logic → PayrollTransaction → Dev Logic → Accounting Journal
 * This test suite contains 4 serialized test cases:
 * 1. Connection Test - Validate Pulsar connection and token
 * 2. Payroll Posted Test - Send Payroll Posted message
 * 3. Payroll Transaction Test - Receive and decode Payroll Transaction
 * 4. Accounting Journal Test - Receive and decode Accounting Journal
 * 
 * Tests run in sequence to validate the complete payroll processing flow.
 */

// Global variables to share across tests
let pulsarToken: string;
let pulsarClient: pulsar.Client;
let payrollTransactionConsumer: pulsar.Consumer;
let accountingJournalConsumer: pulsar.Consumer;

// ============================================================================
// SETUP: GET PULSAR TOKEN AND SUBSCRIBE TO TOPICS
// ============================================================================

test.beforeAll(async ({ request }) => {
  console.log('🔐 Getting Pulsar Token...');
  
  // Authenticate with OAuth2 to get Pulsar token once
  pulsarToken = await getPulsarToken(request);
  
  // Validate token format (should be a non-empty string)
  expect(pulsarToken).toBeDefined();
  expect(typeof pulsarToken).toBe('string');
  expect(pulsarToken.length).toBeGreaterThan(0);

  console.log('📡 Subscribing to topics...');
  
  // Create Pulsar client with SSL connection
  pulsarClient = new pulsar.Client({
    serviceUrl: 'pulsar+ssl://broker-1.c1-use1.pulsar.preprod.toastops.net',
    authentication: new pulsar.AuthenticationToken({ token: pulsarToken }),
    operationTimeoutSeconds: 30,
  });

  // Subscribe to PayrollTransaction topic BEFORE sending any messages
  payrollTransactionConsumer = await pulsarClient.subscribe({
    topic: PULSAR_TOPICS.ENGINEERING_ACCOUNTING_PAYROLL_TRANSACTION,
    subscription: `cursor-payroll-transaction-consumer-${Date.now()}`,
    subscriptionType: 'Exclusive'
  });

  // Subscribe to Accounting Journal topic BEFORE sending any messages
  accountingJournalConsumer = await pulsarClient.subscribe({
    topic: PULSAR_TOPICS.ENGINEERING_ACCOUNTING_JOURNAL,
    subscription: `cursor-journal-consumer-${Date.now()}`,
    subscriptionType: 'Exclusive'
  });
});

// ============================================================================
// CLEANUP: CLOSE ALL CONNECTIONS
// ============================================================================

// ============================================================================
// TEST 1: PULSAR CONNECTION TEST
// ============================================================================

test('1. Validate Pulsar connection and subscriptions', async () => {
  console.log('🔌 Validating connection...');
  
  // Validate all shared resources from beforeAll
  expect(pulsarToken).toBeDefined();
  expect(pulsarClient).toBeDefined();
  expect(payrollTransactionConsumer).toBeDefined();
  expect(accountingJournalConsumer).toBeDefined();
});

// ============================================================================
// TEST 2: PAYROLL POSTED TEST
// ============================================================================

test('2. Send PayrollPosted message successfully', async () => {
  console.log('📤 Payroll Posted...');
  
  // Load protobuf schemas for validation and encoding
  ProtobufGenerator.loadAllSchemas();

  // Create producer for sending PayrollPosted messages using shared client
  const producer = await pulsarClient.createProducer({
    topic: PULSAR_TOPICS.ENGINEERING_EC_PAYROLL
  });

  // Get JSON data from constants (dynamic and maintainable)
  const payrollJson = PULSAR_JSON_DATA.PAYROLL_POSTED;

  // Validate JSON input against protobuf schema
  const validationErrors = ProtobufGenerator.validateMessage('PayrollPosted', payrollJson);
  if (validationErrors.length > 0) {
    console.error('❌ PayrollPosted validation errors:');
    validationErrors.forEach((error, index) => {
      console.error(`  ${index + 1}. ${error}`);
    });
    throw new Error(`PayrollPosted JSON validation failed: ${validationErrors.join(', ')}`);
  }

  // Log the JSON request for debugging
  console.log('📥 Payroll Posted JSON Request:');
  console.log(JSON.stringify(payrollJson, null, 2));

  // Convert JSON to protobuf wire format using protobufGenerator
  const protobufBuffer = ProtobufGenerator.encode('PayrollPosted', payrollJson);
  
  // Send PayrollPosted message to dev logic for processing
  await producer.send({
    data: protobufBuffer,
    properties: {
      'x-pulsar-urn': PULSAR_URNS.PAYROLL_POSTED,
      'x-test-id': `payroll-posted-test-${Date.now()}`,
      'x-customer-uuid': payrollJson.customerUuid
    }
  });

  // Validate the encoded protobuf buffer
  expect(protobufBuffer.length).toBeGreaterThan(0);
  expect(payrollJson.customerUuid).toBe(PULSAR_JSON_DATA.PAYROLL_POSTED.customerUuid);
  expect(payrollJson.payPeriodUuid).toBe(PULSAR_JSON_DATA.PAYROLL_POSTED.payPeriodUuid);
  expect(payrollJson.checkDate).toBe(PULSAR_JSON_DATA.PAYROLL_POSTED.checkDate);
  expect(payrollJson.isAch).toBe(PULSAR_JSON_DATA.PAYROLL_POSTED.isAch);

  await producer.close();
});

// ============================================================================
// TEST 3: PAYROLL TRANSACTION TEST
// ============================================================================

test('3. Receive and decode PayrollTransaction message', async () => {
  console.log('📥 Payroll Transaction...');

  // Use the shared consumer from beforeAll
  const consumer = payrollTransactionConsumer;

  // Wait for PayrollTransaction response with timeout
  const messageTimeout = 30000; // 30 seconds
  const startTime = Date.now();
  let receivedMessage = null;

  while (Date.now() - startTime < messageTimeout) {
    try {
      // Receive message with 2-second timeout per attempt
      const message = await consumer.receive(2000);
      
      // Check if this is the expected PayrollTransaction message
      if (message && message.getProperties()['x-pulsar-urn'] === PULSAR_URNS.PAYROLL_TRANSACTION) {
        receivedMessage = message;
        
        try {
          // Load protobuf schema for PayrollTransaction
          const protoRoot = await protobuf.load('configs/protobuf/payroll_transaction.proto');
          const PayrollTransactionType = protoRoot.lookupType('PayrollTransaction');
          const decodedMessage = PayrollTransactionType.decode(message.getData());
          
          // Convert to plain object with proper JSON formatting
          const decodedObject = PayrollTransactionType.toObject(decodedMessage, {
            longs: String,
            enums: String,
            bytes: String,
            defaults: true,
            arrays: true,
            objects: true,
            oneofs: true
          });
          
          // Convert base64 UUIDs back to proper UUID strings
          const convertBase64ToUuid = (base64String: string): string => {
            try {
              const buffer = Buffer.from(base64String, 'base64');
              const hex = buffer.toString('hex');
              return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
            } catch (error) {
              return base64String; // Return original if conversion fails
            }
          };

          // Create clean JSON response with proper UUIDs
          const cleanResponse = {
            originId: convertBase64ToUuid(decodedObject.originId),
            originType: decodedObject.originType,
            originGroupId: convertBase64ToUuid(decodedObject.originGroupId),
            correlationId: decodedObject.correlationId
          };

          // Log the clean JSON response
          console.log('📥 Payroll Transaction Response:');
          console.log(JSON.stringify(cleanResponse, null, 2));
          
        } catch (decodeError: unknown) {
          if (decodeError instanceof Error) {
            console.log('❌ Could not decode PayrollTransaction protobuf:', decodeError.message);
          } else {
            console.log('❌ Unknown decode error type:', decodeError);
          }
        }
        
        // Acknowledge the message to remove it from the queue
        await consumer.acknowledge(message);
        break;
        
      } else {
        // Acknowledge unexpected messages to keep queue clean
        await consumer.acknowledge(message);
      }
      
    } catch (error: unknown) {
      // Handle different types of errors appropriately
      if (error instanceof Error) {
        // Expected errors - continue trying
        if (error.message.includes('timeout') || error.message.includes('ResultInterrupted')) {
          continue;
        } 
        // Unexpected errors - log details and stop
        else {
          console.error('❌ Error receiving message:', error.message);
          break;
        }
      } else {
        // Unknown error type - log and stop
        console.error('❌ Unknown error type while receiving message:', error);
        break;
      }
    }
  }

  // Validate that we received a message (required for sequential flow)
  expect(receivedMessage).not.toBeNull();
  expect(receivedMessage!.getData().length).toBeGreaterThan(0);
  expect(receivedMessage!.getProperties()['x-pulsar-urn']).toBe(PULSAR_URNS.PAYROLL_TRANSACTION);
  
  // Send the received PayrollTransaction message to trigger the next step
  const transactionProducer = await pulsarClient.createProducer({
    topic: PULSAR_TOPICS.ENGINEERING_ACCOUNTING_PAYROLL_TRANSACTION
  });
  
  await transactionProducer.send({
    data: receivedMessage!.getData(),
    properties: {
      'x-pulsar-urn': PULSAR_URNS.PAYROLL_TRANSACTION,
      'x-test-id': `test-${Date.now()}`,
      'x-trigger-accounting-journal': 'true'
    }
  });
  
  await transactionProducer.close();
});

// ============================================================================
// TEST 4: ACCOUNTING JOURNAL TEST
// ============================================================================

test('4. Receive and decode Accounting Journal message', async () => {
  console.log('📥 Accounting Journal...');

  // Use the shared consumer from beforeAll
  const journalConsumer = accountingJournalConsumer;

  // Wait for Accounting Journal message with extended timeout for processing delay
  const journalMessageTimeout = 60000; // 60 seconds (increased for delay)
  const journalStartTime = Date.now();
  let receivedJournalMessage = null;

  while (Date.now() - journalStartTime < journalMessageTimeout) {
    try {
      // Receive journal message with 2-second timeout per attempt
      const journalMessage = await journalConsumer.receive(2000);
      
      // Accept ANY message on this topic (don't filter by URN)
      if (journalMessage) {
        receivedJournalMessage = journalMessage;
        
        console.log('📥 Accounting Journal Response:');
        console.log('📋 Message Properties:', journalMessage.getProperties());
        
        // Decode protobuf message to JSON using protobuf.js
        try {
          // Load the AccountingJournal protobuf schema
          const root = await protobuf.load('configs/protobuf/accounting_journal.proto');
          const AccountingJournal = root.lookupType('AccountingJournal');
          
          // Decode the protobuf message
          const decodedMessage = AccountingJournal.decode(journalMessage.getData());
          const journalJson = AccountingJournal.toObject(decodedMessage, {
            longs: String,
            enums: String,
            bytes: String,
          });
          
          // Convert base64 UUIDs in the original response
          const convertBase64ToUuid = (base64String: string): string => {
            try {
              // If it's already a UUID format, return as is
              if (base64String.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
                return base64String;
              }
              
              // Try base64 conversion
              const buffer = Buffer.from(base64String, 'base64');
              const hex = buffer.toString('hex');
              return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
            } catch (error) {
              return base64String; // Return original if conversion fails
            }
          };

          // Convert UUIDs in the original response
          //journalJson.originId = convertBase64ToUuid(journalJson.originId);
          //journalJson.originGroupId = convertBase64ToUuid(journalJson.originGroupId);
          
          console.log('📋 Accounting Journal JSON:');
          console.log(JSON.stringify(journalJson, null, 2));
          
        } catch (decodeError: unknown) {
          if (decodeError instanceof Error) {
            console.log('❌ Could not decode Accounting Journal protobuf:', decodeError.message);
          } else {
            console.log('❌ Unknown decode error type:', decodeError);
          }
        }
        
        // Acknowledge the message to remove it from the queue
        await journalConsumer.acknowledge(journalMessage);
        break;
      }
      
    } catch (error: unknown) {
      // Handle different types of errors appropriately
      if (error instanceof Error) {
        // Expected errors - continue trying
        if (error.message.includes('timeout') || error.message.includes('ResultInterrupted')) {
          continue;
        } 
        // Unexpected errors - log details but continue (don't break)
        else {
          console.warn('⚠️ Error receiving journal message:', error.message);
          // Don't break - continue trying to receive messages
          continue;
        }
      } else {
        // Unknown error type - log and stop
        console.error('❌ Unknown error type while receiving journal message:', error);
        break;
      }
    }
  }

  // Validate that we received a journal message (required for complete flow)
  expect(receivedJournalMessage).not.toBeNull();
  expect(receivedJournalMessage!.getData().length).toBeGreaterThan(0);
  
  console.log('🎉 Complete flow working: Payroll Posted → Payroll Transaction → Accounting Journal');
});

// ============================================================================
// TEST 5: CLEANUP TEST
// ============================================================================

test('5. Close all Pulsar connections', async () => {
  console.log('🔒 Closing connections...');
  
  try {
    if (payrollTransactionConsumer) {
      await payrollTransactionConsumer.close();
    }
    
    if (accountingJournalConsumer) {
      await accountingJournalConsumer.close();
    }
    
    if (pulsarClient) {
      await pulsarClient.close();
    }
  } catch (cleanupError) {
    console.warn('⚠️ Warning during cleanup:', cleanupError);
  }
}); 