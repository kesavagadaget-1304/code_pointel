import { test, expect } from '@playwright/test';
import { QBO_API_CONFIG } from '../../../configs/constants';
import { getQboUtcTimestamp, getPastQboTimestamp } from '../../../utils/qboTimestampUtils';

test.describe('QBO Journal Query API', () => {
  let accessToken: string;
  
  test('should get access token using refresh token', async ({ request }) => {
    console.log('🔐 Validating QBO Refresh Token...');
    
    // Get values directly from environment variables
    const tokenUrl = process.env.QBO_API_TOKEN_URL;
    const refreshToken = process.env.QBO_API_REFRESH_TOKEN?.trim();
    const basicAuth = process.env.QBO_API_BASIC_AUTH;
    const contentType = process.env.QBO_API_CONTENT_TYPE;
    const acceptType = process.env.QBO_API_ACCEPT;
    
    // Validate environment variables are available
    if (!refreshToken) {
      throw new Error('QBO_API_REFRESH_TOKEN environment variable is required');
    }
    
    if (!tokenUrl) {
      throw new Error('QBO_API_TOKEN_URL environment variable is required');
    }
    
    if (!basicAuth) {
      throw new Error('QBO_API_BASIC_AUTH environment variable is required');
    }
    
    if (!contentType) {
      throw new Error('QBO_API_CONTENT_TYPE environment variable is required');
    }
    
    if (!acceptType) {
      throw new Error('QBO_API_ACCEPT environment variable is required');
    }
    
    // Exchange refresh token for access token
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    
    const tokenResponse = await request.post(tokenUrl, {
      data: formData.toString(),
      headers: {
        'Content-Type': contentType,
        'Accept': acceptType,
        'Authorization': basicAuth
      }
    });
    
    // Validate response
    expect(tokenResponse.status()).toBe(200);
    
    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access_token;
    
    // Validate token data
    expect(accessToken).toBeTruthy();
    expect(tokenData.expires_in).toBeTruthy();
    
    console.log('✅ QBO Access token obtained successfully');
    console.log('📋 Token expires in:', tokenData.expires_in, 'seconds');
  });

  test('should query recently synced journal entries using timestamp range', async ({ request }) => {
    console.log('📊 Querying recently synced journal entries...');
    
    // Generate timestamp for query (last 10 minutes)
    const startTime = getPastQboTimestamp(10); // 10 minutes ago
    
    console.log('🕐 Query time range:');
    console.log('   Start time:', startTime);
    
    // Build query URL using the correct QBO query endpoint format
    const query = `SELECT * FROM JournalEntry WHERE MetaData.CreateTime >= '${startTime}'`;
    const queryUrl = `${QBO_API_CONFIG.BASE_URL}/${QBO_API_CONFIG.COMPANY_PREFIX}/${QBO_API_CONFIG.REALM_ID}/query?query=${encodeURIComponent(query)}&minorversion=${QBO_API_CONFIG.MINOR_VERSION}`;
    
    console.log('🌐 Query URL:', queryUrl);
    
    // Make API request with access token
    const response = await request.get(queryUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    // Validate response
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    const journalEntries = responseBody.QueryResponse?.JournalEntry || [];
    
    console.log('✅ Journal entries query successful');
    console.log('📋 Total journal entries found:', journalEntries.length);
    
    // Validate response structure
    expect(responseBody.QueryResponse).toBeTruthy();
    expect(Array.isArray(journalEntries)).toBe(true);
    
    // If we found journal entries, validate their structure
    if (journalEntries.length > 0) {
      const firstEntry = journalEntries[0];
      expect(firstEntry).toHaveProperty('Id');
      expect(firstEntry).toHaveProperty('TxnDate');
      expect(firstEntry).toHaveProperty('Line');
    }
    
    console.log('📋 Query Response:', JSON.stringify(responseBody, null, 2));
  });

  test('should query journal entries with specific date filter', async ({ request }) => {
    console.log('📊 Querying journal entries with date filter...');
    
    // Generate timestamp for today's entries
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const startTime = getQboUtcTimestamp(0, startOfDay);
    
    console.log('🕐 Today\'s date range:');
    console.log('   Start of day:', startTime);
    
    // Build query URL using the correct QBO query endpoint format
    const query = `SELECT * FROM JournalEntry WHERE MetaData.CreateTime >= '${startTime}'`;
    const queryUrl = `${QBO_API_CONFIG.BASE_URL}/${QBO_API_CONFIG.COMPANY_PREFIX}/${QBO_API_CONFIG.REALM_ID}/query?query=${encodeURIComponent(query)}&minorversion=${QBO_API_CONFIG.MINOR_VERSION}`;
    
    console.log('🌐 Query URL:', queryUrl);
    
    // Make API request with access token
    const response = await request.get(queryUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    // Validate response
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    const journalEntries = responseBody.QueryResponse?.JournalEntry || [];
    
    console.log('✅ Today\'s journal entries query successful');
    console.log('📋 Journal entries found today:', journalEntries.length);
    
    // Validate response structure
    expect(responseBody.QueryResponse).toBeTruthy();
    expect(Array.isArray(journalEntries)).toBe(true);
    
    console.log('📋 Query Response:', JSON.stringify(responseBody, null, 2));
  });
}); 