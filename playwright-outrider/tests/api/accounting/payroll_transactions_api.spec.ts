import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getAccessToken } from '../../../utils/apiHelpers';
import { REST_API_CONFIG } from '../../../configs/constants';

dotenv.config(); // Load environment variables from .env

test.describe.configure({ mode: 'serial' });

// Shared variables
let sharedToken: string = '';

// Get token once for all tests
test.beforeAll(async ({ request }) => {
  sharedToken = await getAccessToken(request);
  console.log('🔑 ToastAuth Token obtained successfully');
});

test.describe(`GET ${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}`, () => {

  test('@C1934345 should retrieve payroll transaction details using valid transaction ID', async ({ request }) => {
    const transactionId = REST_API_CONFIG.TEST_CASES.VALID_TRANSACTION_ID;

    const response = await request.get(
      `${process.env.REST_API_BASE_URL}${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${sharedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🔍 Response status:', response.status());

    expect(response.status()).toBe(REST_API_CONFIG.EXPECTED_STATUS_CODES.SUCCESS);

    const responseBody = await response.json();
    console.log('✅ Payroll transaction details:', responseBody);

    // Basic response structure validation
    expect(responseBody).toBeTruthy();
    expect(typeof responseBody).toBe('object');
    expect(responseBody.payGroupName).toBe(REST_API_CONFIG.TEST_DATA.EXPECTED_PAYGROUP_NAME);
    expect(responseBody.payGroupUuid).toBe(REST_API_CONFIG.TEST_DATA.EXPECTED_PAYGROUP_UUID);
  });

  test('@C1934346 should return 404 for non-existent transaction ID', async ({ request }) => {
    const transactionId = REST_API_CONFIG.TEST_CASES.NON_EXISTENT_TRANSACTION_ID;

    const response = await request.get(
      `${process.env.REST_API_BASE_URL}${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${sharedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🔍 Response status:', response.status());

    expect(response.status()).toBe(REST_API_CONFIG.EXPECTED_STATUS_CODES.NOT_FOUND);
    
    const errorResponse = await response.json();
    console.log('✅ 404 Error Response:', errorResponse);
  });

  test('@C1934347 should return 400 for invalid transaction ID format', async ({ request }) => {
    const transactionId = REST_API_CONFIG.TEST_CASES.INVALID_TRANSACTION_ID_FORMAT;

    const response = await request.get(
      `${process.env.REST_API_BASE_URL}${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${sharedToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🔍 Response status:', response.status());

    expect(response.status()).toBe(REST_API_CONFIG.EXPECTED_STATUS_CODES.BAD_REQUEST);
    
    const errorResponse = await response.json();
    console.log('✅ 400 Error Response:', errorResponse);
  });

  test('@C1934348 should return 401 when no authentication is provided', async ({ request }) => {
    const transactionId = REST_API_CONFIG.TEST_CASES.VALID_TRANSACTION_ID;

    const response = await request.get(
      `${process.env.REST_API_BASE_URL}${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}/${transactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🔍 Response status:', response.status());

    expect(response.status()).toBe(REST_API_CONFIG.EXPECTED_STATUS_CODES.UNAUTHORIZED);
    
    const errorResponse = await response.json();
    console.log('✅ 401 Error Response (No Auth):', errorResponse);
  });

  test('@C1934349 should return 401 for expired or invalid token', async ({ request }) => {
    const transactionId = REST_API_CONFIG.TEST_CASES.VALID_TRANSACTION_ID;
    const invalidToken = 'invalid_token_here';

    const response = await request.get(
      `${process.env.REST_API_BASE_URL}${process.env.PAYROLL_TRANSACTIONS_ENDPOINT}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${invalidToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🔍 Response status:', response.status());

    expect(response.status()).toBe(REST_API_CONFIG.EXPECTED_STATUS_CODES.UNAUTHORIZED);
    
    const errorResponse = await response.json();
    console.log('✅ 401 Error Response (Invalid Token):', errorResponse);
  });
}); 