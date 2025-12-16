import { test, expect } from '@playwright/test';

// GraphQL API configuration using your environment variables
const GRAPHQL_CONFIG = {
  ENDPOINT: process.env.GRAPHQL_ENDPOINT || '',
  TOKEN: process.env.GRAPHQL_TOKEN || '',
  HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.GRAPHQL_TOKEN || ''}`,
    [process.env.GRAPHQL_HEADER_KEY || 'X-Access-Token']: process.env.GRAPHQL_HEADER_VALUE || process.env.GRAPHQL_TOKEN || ''
  }
};

// GraphQL queries based on your actual schema
const GRAPHQL_QUERIES = {
  // Get all paygroups
  GET_ALL_PAYGROUPS: `
    query GetAllPayGroups {
      paygroup {
        allPayGroups {
          payGroupUuid
          name
        }
      }
    }
  `,
  
  // Get line items for a specific paygroup
  GET_PAYGROUP_LINE_ITEMS: `
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
  `
};

test.describe('GraphQL API Tests - Paygroup Schema', () => {
  
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

  test('should get all paygroups', async ({ request }) => {
    // Skip test if no access token
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    console.log('🚀 Making GraphQL query to:', GRAPHQL_CONFIG.ENDPOINT);
    console.log('🔑 Using token:', GRAPHQL_CONFIG.TOKEN.substring(0, 20) + '...');

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: GRAPHQL_QUERIES.GET_ALL_PAYGROUPS
        }
      });

      console.log('📊 Response Status:', response.status());
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('✅ GraphQL query successful!');
        console.log('📋 Response:', JSON.stringify(responseBody, null, 2));
        
        // Validate response structure based on your schema
        expect(responseBody).toHaveProperty('data');
        expect(responseBody.data).toHaveProperty('paygroup');
        expect(responseBody.data.paygroup).toHaveProperty('allPayGroups');
        expect(Array.isArray(responseBody.data.paygroup.allPayGroups)).toBe(true);
        
        // If we have paygroups, validate their structure
        if (responseBody.data.paygroup.allPayGroups.length > 0) {
          const paygroup = responseBody.data.paygroup.allPayGroups[0];
          expect(paygroup).toHaveProperty('payGroupUuid');
          expect(paygroup).toHaveProperty('name');
        }
        
      } else {
        const errorText = await response.text();
        console.log('❌ GraphQL query failed');
        console.log('📋 Error Response:', errorText);
        
        // Still log the error for debugging
        expect(response.status()).toBe(200);
      }
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });

  test('should get paygroup line items with UUID', async ({ request }) => {
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

    console.log('🚀 Making GraphQL query with variables:', variables);

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: GRAPHQL_QUERIES.GET_PAYGROUP_LINE_ITEMS,
          variables: variables
        }
      });

      console.log('📊 Response Status:', response.status());
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('✅ GraphQL query with variables successful!');
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
        
        // Validate line item structure if we have any
        if (lineItemsResponse.lineItems.length > 0) {
          const lineItem = lineItemsResponse.lineItems[0];
          expect(lineItem).toHaveProperty('categoryName');
          expect(lineItem).toHaveProperty('category');
          expect(lineItem).toHaveProperty('name');
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

  test('should handle GraphQL errors gracefully', async ({ request }) => {
    // Skip test if no access token
    if (!GRAPHQL_CONFIG.TOKEN) {
      test.skip();
    }

    // Invalid query to test error handling
    const invalidQuery = `
      query InvalidQuery {
        nonExistentField {
          id
        }
      }
    `;

    console.log('🚀 Making invalid GraphQL query to test error handling');

    try {
      const response = await request.post(GRAPHQL_CONFIG.ENDPOINT, {
        headers: GRAPHQL_CONFIG.HEADERS,
        data: {
          query: invalidQuery
        }
      });

      console.log('📊 Response Status:', response.status());
      
      if (response.ok()) {
        const responseBody = await response.json();
        console.log('📋 Error Response:', JSON.stringify(responseBody, null, 2));
        
        // Should have errors in response
        expect(responseBody).toHaveProperty('errors');
        expect(responseBody.errors).toBeDefined();
        expect(responseBody.errors.length).toBeGreaterThan(0);
        
      } else {
        const errorText = await response.text();
        console.log('❌ Request failed:', errorText);
      }
      
    } catch (error) {
      console.log('❌ GraphQL request error:', error);
      throw error;
    }
  });
}); 