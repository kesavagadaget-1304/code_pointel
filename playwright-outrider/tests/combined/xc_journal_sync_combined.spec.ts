import { test, expect } from '@playwright/test';
import { XCLoginPage } from '../../pages/XCLoginPage';
import { SyncMonitorPage } from '../../pages/SyncMonitorPage';
import { ScreenshotUtils } from '../../utils/screenshotUtils';
import { QBO_API_CONFIG } from '../../configs/constants';
import { getQboUtcTimestamp, getPastQboTimestamp } from '../../utils/qboTimestampUtils';

/**
 * XC Journal Sync Combined Test Suite
 * Complete flow: XC Login → Sync Monitor → Add Sales Entry → Wait for Sync → QBO Query
 */
test.describe('XC Journal Sync Combined', () => {
  let xcLoginPage: XCLoginPage;
  let syncMonitorPage: SyncMonitorPage;
  let accessToken: string;

  test.beforeAll(async ({ browser }) => {
    // Create a new page and initialize both page objects
    const page = await browser.newPage();
    xcLoginPage = new XCLoginPage(page);
    syncMonitorPage = new SyncMonitorPage(page);
  });

  test('should complete XC login and get QBO access token', async ({ request }, testInfo) => {
    try {
      // Complete the full login flow using environment variables
      await xcLoginPage.completeLoginFlow();
      
      // Check current URL to determine if we're on MFA page or landing page
      const currentUrl = xcLoginPage.page.url();
      if (currentUrl.includes('mfa-detect-browser-capabilities')) {
        // On MFA page - no further action needed
      } else {
        // Additional verification - check if we're on the landing page
        await expect(xcLoginPage.landingPageElement).toBeVisible();
        
        // Wait for page to be fully loaded before taking screenshot
        await xcLoginPage.page.waitForLoadState('domcontentloaded');
        await xcLoginPage.page.waitForTimeout(3000); // Give extra time for dynamic content
        
        // Take screenshot after landing page is fully loaded and verified
        await ScreenshotUtils.capture(xcLoginPage.page, testInfo, 'xc-login-success');
      }

      // Get QBO access token
      console.log('🔐 Getting QBO Access Token...');
      
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
      
    } catch (error) {
      console.error('❌ XC Login and QBO Token Test - FAILED:', JSON.stringify(error, null, 2));
      throw error;
    }
  });

  test('should click sync monitor and navigate to sync page', async ({ }, testInfo) => {
    try {
      // Click the sync monitor button (first action after login)
      await syncMonitorPage.clickSyncMonitor();
      
      // Wait for sync monitor page to fully load
      await syncMonitorPage.page.waitForLoadState('domcontentloaded');
      await syncMonitorPage.page.waitForTimeout(5000); // Give more time for all elements to load
      
      // Take screenshot after sync monitor page is fully loaded
      await ScreenshotUtils.capture(syncMonitorPage.page, testInfo, 'xc-sync-monitor-clicked');
      
      console.log('✅ Sync monitor page loaded successfully');
      
    } catch (error) {
      console.error('❌ Sync Monitor Navigation Test - FAILED:', JSON.stringify(error, null, 2));
      throw error;
    }
  });

  test('should create a sales journal entry', async ({ }, testInfo) => {
    try {
      console.log('📝 Creating sales journal entry...');
      
      // Complete the sales journal entry flow
      await syncMonitorPage.completeSalesJournalEntryFlow();
      
      // Wait for the entry to be saved and page to settle
      await syncMonitorPage.page.waitForLoadState('domcontentloaded');
      await syncMonitorPage.page.waitForTimeout(3000);
      
      // Take screenshot after sales journal entry is created
      await ScreenshotUtils.capture(syncMonitorPage.page, testInfo, 'xc-sales-journal-entry-created');
      
      console.log('✅ Sales journal entry created successfully');
      
    } catch (error) {
      console.error('❌ Sales Journal Entry Test - FAILED:', JSON.stringify(error, null, 2));
      throw error;
    }
  });

  test('should wait for journal sync to complete', async ({ }, testInfo) => {
    try {
      // The sync is now handled in the sales journal entry flow
      // We just need to wait a bit for any additional processing
      console.log('⏳ Waiting for additional sync processing...');
      await syncMonitorPage.page.waitForTimeout(5000); // 5 seconds for additional processing
      
      console.log('✅ Additional sync processing completed');
      
    } catch (error) {
      console.error('❌ Journal Sync Wait Test - FAILED:', JSON.stringify(error, null, 2));
      throw error;
    }
  });

  test('should query QBO for recently synced journal entries', async ({ request }, testInfo) => {
    try {
      console.log('📊 Querying recently synced journal entries...');
      
      // Check if we have a valid access token
      if (!accessToken) {
        console.log('⚠️ No access token available, getting a new one...');
        
        // Get a fresh QBO access token
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
        
        console.log('✅ Refreshed QBO Access token successfully');
        console.log('📋 Token expires in:', tokenData.expires_in, 'seconds');
      } else {
        console.log('✅ Using existing access token');
      }
      
      // Generate timestamp for query (last 20 minutes to capture the sync)
      const startTime = getPastQboTimestamp(20); // 20 minutes ago
      
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
      
      // Log the response status for debugging
      console.log('📡 QBO API Response Status:', response.status());
      
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
        
        console.log('📋 Found synced journal entries:');
        journalEntries.forEach((entry: any, index: number) => {
          console.log(`   ${index + 1}. ID: ${entry.Id}, Date: ${entry.TxnDate}, Doc: ${entry.DocNumber}`);
        });
      } else {
        console.log('📋 No journal entries found in the specified time range');
      }
      
      console.log('📋 Query Response:', JSON.stringify(responseBody, null, 2));
      
    } catch (error) {
      console.error('❌ QBO Query Test - FAILED:', JSON.stringify(error, null, 2));
      throw error;
    }
  });

  test.afterAll(async () => {
    try {
      // Wait a bit more to ensure all screenshots are captured before logout
      await xcLoginPage.page.waitForTimeout(3000);
      
      // Logout after all tests complete
      await xcLoginPage.logout();
      
      // Close the page
      await xcLoginPage.page.close();
      
    } catch (error) {
      console.error('❌ Error during cleanup:', JSON.stringify(error, null, 2));
    }
  });
}); 