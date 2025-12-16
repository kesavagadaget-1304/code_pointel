import { test, expect } from '@playwright/test';
import { QBO_API_CONFIG } from '../../../configs/constants';

test.describe('QBO Access Token Validation', () => {
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

  test('should get journal details using QBO_API_CONFIG constants', async ({ request }) => {
    console.log('📊 Getting journal details...');
    
    // Build journal URL using QBO_API_CONFIG constants
    const journalUrl = `${QBO_API_CONFIG.BASE_URL}/${QBO_API_CONFIG.COMPANY_PREFIX}/${QBO_API_CONFIG.REALM_ID}/journalentry/${QBO_API_CONFIG.JOURNAL_ID}?minorversion=${QBO_API_CONFIG.MINOR_VERSION}`;
    
    console.log('🌐 Journal URL:', journalUrl);
    
    // Make API request with access token
    const response = await request.get(journalUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    // Validate response
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    const journalEntry = responseBody.JournalEntry;
    
    // Validate journal entry data
    expect(journalEntry).toHaveProperty('Id');
    expect(journalEntry).toHaveProperty('TxnDate');
    expect(journalEntry).toHaveProperty('Line');
    
    console.log('✅ Journal details retrieved successfully');
    console.log('📋 Journal ID:', journalEntry.Id);
    console.log('📋 Transaction Date:', journalEntry.TxnDate);
    console.log('📋 Number of Lines:', journalEntry.Line?.length || 0);
    console.log('📋 Full Journal Response:', JSON.stringify(responseBody, null, 2));
  });
}); 