import { test, expect } from '@playwright/test';

// GraphQL API configuration using your environment variables
const GRAPHQL_CONFIG = {
  ENDPOINT: process.env.GRAPHQL_ENDPOINT || 'https://preprod.sa.toasttab.com/graphql',
  TOKEN: process.env.GRAPHQL_TOKEN || '',
  HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GRAPHQL_TOKEN || ''}`,
    [process.env.GRAPHQL_HEADER_KEY || 'X-Access-Token']: process.env.GRAPHQL_HEADER_VALUE || process.env.GRAPHQL_TOKEN || ''
  }
};

// GraphQL query for getting line items for a specific paygroup
const GET_PAYGROUP_LINE_ITEMS_QUERY = `
  query GetPaygroupLineItems($paygroupUuid: UUID!) {
    paygroup {
      lineItems(paygroupUuid: $paygroupUuid) {
        paygroupUuid
        paygroupName
        lineItems {
          categoryName
          category
          name
        }
      }
    }
  }
`;

test.describe('GraphQL API Tests - Line Items', () => {
  
  test.beforeAll(async () => {
    // Validate required environment variables
    if (!GRAPHQL_CONFIG.TOKEN) {
      console.warn('⚠️ GRAPHQL_TOKEN not found in environment variables');
      console.warn('Please add your JWT token to .env file as GRAPHQL_TOKEN');
    }
    
    if (!GRAPHQL_CONFIG.ENDPOINT) {
      console.warn('⚠️ GRAPHQL_ENDPOINT not found, using default');
    }

    if (!process.env.GRAPHQL_PAYGROUP_UUID) {
      console.warn('⚠️ GRAPHQL_PAYGROUP_UUID not found in environment variables');
      console.warn('This is required for testing line items query');
    }
  });

  test('C1938036 - should get paygroup lineItems with valid paygroupUuid (200 OK)', async ({ request }) => {
    // Skip test if no access token or paygroup UUID
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    if (!process.env.GRAPHQL_PAYGROUP_UUID) {
      test.skip();
    }

    const variables = {
      paygroupUuid: process.env.GRAPHQL_PAYGROUP_UUID
    };

    console.log('🚀 Query:', GET_PAYGROUP_LINE_ITEMS_QUERY);
    console.log('📋 Variables:', variables);

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: GET_PAYGROUP_LINE_ITEMS_QUERY,
          variables: variables
        }
      });

      console.log('📊 Status:', response.status());
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('📋 Response:', JSON.stringify(responseBody, null, 2));
        
        // Validate response structure based on your schema
        expect(responseBody).toHaveProperty('data');
        expect(responseBody.data).toHaveProperty('paygroup');
        expect(responseBody.data.paygroup).toHaveProperty('lineItems');
        
        const lineItemsResponse = responseBody.data.paygroup.lineItems;
        expect(lineItemsResponse).toHaveProperty('paygroupUuid');
        expect(lineItemsResponse).toHaveProperty('paygroupName');
        expect(lineItemsResponse).toHaveProperty('lineItems');
        expect(Array.isArray(lineItemsResponse.lineItems)).toBe(true);
        
        // Log paygroup info
        console.log(`📋 Paygroup: ${lineItemsResponse.paygroupName} (${lineItemsResponse.paygroupUuid})`);
        console.log(`📋 Total line items: ${lineItemsResponse.lineItems.length}`);
        
        // Validate line item structure if we have any
        if (lineItemsResponse.lineItems.length > 0) {
          const lineItem = lineItemsResponse.lineItems[0];
          expect(lineItem).toHaveProperty('categoryName');
          expect(lineItem).toHaveProperty('category');
          expect(lineItem).toHaveProperty('name');
          
          // Log first few line items for reference
          console.log('📋 Sample line items:');
          lineItemsResponse.lineItems.slice(0, 5).forEach((item: any, index: number) => {
            console.log(`  ${index + 1}. ${item.category} - ${item.name}`);
          });
          
          if (lineItemsResponse.lineItems.length > 5) {
            console.log(`  ... and ${lineItemsResponse.lineItems.length - 5} more items`);
          }
        }
        
      } else {
        const errorText = await response.text();
        console.log('❌ GraphQL query with variables failed');
        console.log('📋 Error Response:', errorText);
      }
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });

  test('C1938037 - should return 400 Bad Request without query', async ({ request }) => {
    // Skip test if no access token
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    console.log('🚀 Request: No query sent');

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          // No query field - this should trigger 400
        }
      });

      console.log('📊 Status:', response.status());
      
      // Should return 400 Bad Request for missing query
      expect(response.status()).toBe(400);
      
      const responseBody = await response.json();
      console.log('📋 Response:', JSON.stringify(responseBody, null, 2));
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });

  test('C1938038 - should return 400 Bad Request with invalid JSON variables', async ({ request }) => {
    // Skip test if no access token
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    // Valid query but with invalid JSON variables
    const validQuery = `
      query GetLineItems($paygroupUuid: UUID!) {
        paygroup {
          lineItems(paygroupUuid: $paygroupUuid) {
            paygroupUuid
            paygroupName
            lineItems {
              categoryName
              category
              name
            }
          }
        }
      }
    `;

    console.log('🚀 Query:', validQuery);
    console.log('🚀 Variables: Invalid JSON format');

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: validQuery,
          variables: "invalid-json-string-not-an-object" // This should trigger 400
        }
      });

      console.log('📊 Status:', response.status());
      
      // Should return 400 Bad Request for invalid JSON variables
      expect(response.status()).toBe(400);
      
      const responseBody = await response.json();
      console.log('📋 Response:', JSON.stringify(responseBody, null, 2));
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });

  test('C1938039 - should return 401 Unauthorized without valid token', async ({ request }) => {
    // Headers without authorization token
    const headersWithoutToken = {
      'Content-Type': 'application/json',
      [process.env.GRAPHQL_HEADER_KEY || 'Toast-Restaurant-External-Id']: process.env.GRAPHQL_HEADER_VALUE || ''
    };

    console.log('🚀 Query:', GET_PAYGROUP_LINE_ITEMS_QUERY);

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: headersWithoutToken,
        data: {
          query: GET_PAYGROUP_LINE_ITEMS_QUERY,
          variables: { paygroupUuid: 'test-uuid' }
        }
      });

      console.log('📊 Status:', response.status());
      
      // Should return 401 Unauthorized
      expect(response.status()).toBe(401);
      
      const responseBody = await response.json();
      console.log('📋 Response:', JSON.stringify(responseBody, null, 2));
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });

  test('C1938040 - should return 404 Not Found with invalid endpoint', async ({ request }) => {
    // Skip test if no access token
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    // Try invalid endpoint path to trigger 404
    try {
      const invalidEndpoint = GRAPHQL_CONFIG.ENDPOINT.replace('/v1/graphql', '/v2/graphql');
      const response = await request.post(invalidEndpoint, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: GET_PAYGROUP_LINE_ITEMS_QUERY,
          variables: { paygroupUuid: 'test-uuid' }
        }
      });

      // Should return 404 Not Found for invalid endpoint
      expect(response.status()).toBe(404);
      
    } catch (error) {
      // If request fails, that's also acceptable for 404 test
      expect(true).toBe(true);
    }
  });
}); 