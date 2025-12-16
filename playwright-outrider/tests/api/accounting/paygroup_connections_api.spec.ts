import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { getAccessToken } from '../../../utils/apiHelpers';

dotenv.config(); // Load environment variables from .env

test.describe.configure({ mode: 'serial' });

// Shared variables
let createdPaygroupUuid: string = '';
let responsePaygroupUuid: string = '';
let sharedToken: string = '';

// Get token once for all tests
test.beforeAll(async ({ request }) => {
  sharedToken = await getAccessToken(request);
});

test.describe(`POST ${process.env.API_PAYGROUP_CONNECTION_MAPPINGS}`, () => {

  test('should create a new paygroup connection mapping with dynamic UUID and validate creation', async ({ request }) => {
    const paygroupUuid = uuidv4(); // Generate a dynamic paygroupUuid
    const connectionUuid = 'a0e0d139-5c98-462f-8c1b-4f670aeb0c07'; // Replace with real or fetched value

    const response = await request.post(
      `${process.env.API_BASE_URL}${process.env.API_PAYGROUP_CONNECTION_MAPPINGS}`,
      {
        headers: {
          Authorization: `Bearer ${sharedToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          paygroupUuid,
          connectionUuid,
        },
      }
    );

    console.log('🔍 Response status:', response.status());
    
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log('✅ Mapping created:', responseBody);

    expect(responseBody).toMatchObject({
      paygroupUuid,
      connectionUuid,
    });

    // Store the created paygroupUuid for use in the next test
    createdPaygroupUuid = paygroupUuid;
    
    // Wait for the paygroup to be fully created in the system
    await new Promise(resolve => setTimeout(resolve, 3000));
  });
});

test.describe(`POST ${process.env.API_PAYGROUP_CONNECTIONS}`, () => {

  test('should retrieve paygroup connections using the UUID created in the previous test', async ({ request }) => {
    // Use the paygroupUuid created in the previous test
    const response = await request.post(
      `${process.env.API_BASE_URL}${process.env.API_PAYGROUP_CONNECTIONS}`,
      {
        headers: {
          Authorization: `Bearer ${sharedToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          paygroupUuids: [createdPaygroupUuid] // Use the newly created paygroup UUID
        },
      }
    );

    console.log('🔍 Response status:', response.status());
    
    const responseBody = await response.json();
    
    expect(response.ok()).toBeTruthy();

    console.log('✅ Paygroup connections:', responseBody);

    // Store the paygroupUuid from the response for validation
    responsePaygroupUuid = responseBody.payGroupConnections[0].paygroupUuid;

    expect(responseBody).toBeTruthy();
  });
});

// Validate after all tests complete
test.afterAll(async () => {
  try {
    // Validate that the created GUID matches the response paygroupUuid
    expect(createdPaygroupUuid).toBe(responsePaygroupUuid);
    console.log('✅ Validation: Created GUID matches response paygroupUuid');
    console.log('   Created GUID:', createdPaygroupUuid);
    console.log('   Response GUID:', responsePaygroupUuid);
  } catch (error) {
    console.error('❌ Validation failed!');
    console.error('   Created GUID:', createdPaygroupUuid);
    console.error('   Response GUID:', responsePaygroupUuid);
    console.error('   Error:', error instanceof Error ? error.message : String(error));
    throw error; // Re-throw to fail the test
  }
});
