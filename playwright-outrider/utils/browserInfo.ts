import { Page, TestInfo, BrowserContext } from '@playwright/test';

/**
 * Professional Browser Information Utility
 * Captures comprehensive browser metadata for test reports and traceability
 */
export interface BrowserMetadata {
  browserName: string;
  browserVersion: string;
  chromiumVersion?: string;
  userAgent: string;
  platform: string;
  deviceName?: string;
  viewport: {
    width: number;
    height: number;
  };
  timestamp: string;
  testEnvironment: string;
  executionContext: string;
}

export interface TestExecutionContext {
  testId: string;
  testFile: string;
  testName: string;
  browser: BrowserMetadata;
  execution: {
    startTime: string;
    nodeVersion: string;
    playwrightVersion: string;
    operatingSystem: string;
  };
}

export class BrowserInfoUtils {
  /**
   * Capture comprehensive browser information
   */
  static async captureBrowserInfo(page: Page): Promise<BrowserMetadata> {
    try {
      const browser = page.context().browser();
      const browserName = browser?.browserType().name() || 'unknown';
      const browserVersion = browser?.version() || 'unknown';
      
      // Get user agent and platform info
      const userAgent = await page.evaluate(() => navigator.userAgent);
      const platform = await page.evaluate(() => navigator.platform);
      
      // Get viewport size
      const viewport = page.viewportSize() || { width: 0, height: 0 };
      
      // Determine environment
      const testEnvironment = process.env.NODE_ENV || process.env.ENVIRONMENT || 'development';
      const executionContext = process.env.CI ? 'CI/CD Pipeline' : 'Local Development';
      
      // Extract Chromium version for Chromium-based browsers
      let chromiumVersion: string | undefined;
      if (browserName === 'chromium' || browserName === 'chrome' || browserName === 'msedge') {
        const userAgentMatch = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
        chromiumVersion = userAgentMatch ? userAgentMatch[1] : undefined;
      }
      
      return {
        browserName,
        browserVersion,
        chromiumVersion,
        userAgent,
        platform,
        viewport,
        timestamp: new Date().toISOString(),
        testEnvironment,
        executionContext
      };
    } catch (error) {
      console.error('❌ Failed to capture browser info:', error);
      return this.getFallbackBrowserInfo();
    }
  }

  /**
   * Attach browser information to test report
   */
  static async attachBrowserInfoToReport(
    page: Page, 
    testInfo: TestInfo,
    customName?: string
  ): Promise<BrowserMetadata> {
    const browserInfo = await this.captureBrowserInfo(page);
    const attachmentName = customName || 'browser-information';
    
    // Create comprehensive browser report
    const browserReport = this.generateBrowserReport(browserInfo, testInfo);
    
    // Attach as JSON for programmatic access
    await testInfo.attach(`${attachmentName}-metadata.json`, {
      body: JSON.stringify(browserInfo, null, 2),
      contentType: 'application/json'
    });
    
    // Attach as HTML for human-readable report
    await testInfo.attach(`${attachmentName}-report.html`, {
      body: browserReport,
      contentType: 'text/html'
    });
    
    console.log(`📊 Browser info attached: ${browserInfo.browserName} ${browserInfo.browserVersion}`);
    return browserInfo;
  }

  /**
   * Generate comprehensive test execution context
   */
  static async captureTestExecutionContext(
    page: Page, 
    testInfo: TestInfo
  ): Promise<TestExecutionContext> {
    const browserInfo = await this.captureBrowserInfo(page);
    
    // Get Playwright version
    const playwrightVersion = process.env.npm_package_dependencies__playwright_test || 'unknown';
    
    return {
      testId: testInfo.testId,
      testFile: testInfo.file,
      testName: testInfo.title,
      browser: browserInfo,
      execution: {
        startTime: new Date().toISOString(),
        nodeVersion: process.version,
        playwrightVersion,
        operatingSystem: process.platform
      }
    };
  }

  /**
   * Generate HTML browser information report
   */
  private static generateBrowserReport(browserInfo: BrowserMetadata, testInfo: TestInfo): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Browser Information Report</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; margin: -25px -25px 25px -25px; border-radius: 8px 8px 0 0; }
        .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px; }
        .info-grid { display: grid; grid-template-columns: 200px 1fr; gap: 10px; align-items: center; }
        .label { font-weight: bold; color: #495057; }
        .value { color: #212529; font-family: monospace; background: #e9ecef; padding: 4px 8px; border-radius: 3px; }
        .timestamp { font-size: 0.9em; color: #6c757d; }
        .badge { display: inline-block; padding: 4px 12px; background: #28a745; color: white; border-radius: 20px; font-size: 0.8em; font-weight: bold; }
        .ci-badge { background: #dc3545; }
        .local-badge { background: #ffc107; color: #212529; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌐 Browser Information Report</h1>
            <p>Test Execution Metadata & Environment Details</p>
        </div>
        
        <div class="section">
            <h3>🔍 Test Information</h3>
            <div class="info-grid">
                <span class="label">Test Name:</span>
                <span class="value">${testInfo.title}</span>
                <span class="label">Test File:</span>
                <span class="value">${testInfo.file}</span>
                <span class="label">Test ID:</span>
                <span class="value">${testInfo.testId}</span>
            </div>
        </div>
        
        <div class="section">
            <h3>🌐 Browser Details</h3>
            <div class="info-grid">
                <span class="label">Browser:</span>
                <span class="value">${browserInfo.browserName.toUpperCase()}</span>
                <span class="label">Version:</span>
                <span class="value">${browserInfo.browserVersion}</span>
                ${browserInfo.chromiumVersion ? `
                <span class="label">Chromium Version:</span>
                <span class="value">${browserInfo.chromiumVersion}</span>
                ` : ''}
                <span class="label">Platform:</span>
                <span class="value">${browserInfo.platform}</span>
                <span class="label">Viewport:</span>
                <span class="value">${browserInfo.viewport.width} × ${browserInfo.viewport.height}</span>
            </div>
        </div>
        
        <div class="section">
            <h3>⚙️ Technical Information</h3>
            <div class="info-grid">
                <span class="label">User Agent:</span>
                <span class="value" style="font-size: 0.8em; word-break: break-all;">${browserInfo.userAgent}</span>
            </div>
        </div>
        
        <div class="section">
            <h3>🎯 Execution Context</h3>
            <div class="info-grid">
                <span class="label">Environment:</span>
                <span class="badge ${browserInfo.testEnvironment === 'production' ? '' : 'local-badge'}">${browserInfo.testEnvironment.toUpperCase()}</span>
                <span class="label">Execution Context:</span>
                <span class="badge ${browserInfo.executionContext.includes('CI') ? 'ci-badge' : 'local-badge'}">${browserInfo.executionContext}</span>
                <span class="label">Timestamp:</span>
                <span class="value timestamp">${new Date(browserInfo.timestamp).toLocaleString()}</span>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Get fallback browser information when capture fails
   */
  private static getFallbackBrowserInfo(): BrowserMetadata {
    return {
      browserName: 'unknown',
      browserVersion: 'unknown',
      userAgent: 'unknown',
      platform: process.platform,
      viewport: { width: 0, height: 0 },
      timestamp: new Date().toISOString(),
      testEnvironment: process.env.NODE_ENV || 'development',
      executionContext: process.env.CI ? 'CI/CD Pipeline' : 'Local Development'
    };
  }

  /**
   * Create browser version summary for console output
   */
  static async logBrowserInfo(page: Page, testName?: string): Promise<void> {
    const browserInfo = await this.captureBrowserInfo(page);
    
    console.log('\n🌐 ===== BROWSER INFORMATION =====');
    console.log(`📍 Test: ${testName || 'Unknown'}`);
    console.log(`🌐 Browser: ${browserInfo.browserName.toUpperCase()} ${browserInfo.browserVersion}`);
    if (browserInfo.chromiumVersion) {
      console.log(`⚙️  Chromium: ${browserInfo.chromiumVersion}`);
    }
    console.log(`💻 Platform: ${browserInfo.platform}`);
    console.log(`📱 Viewport: ${browserInfo.viewport.width}×${browserInfo.viewport.height}`);
    console.log(`🎯 Environment: ${browserInfo.testEnvironment}`);
    console.log(`⚡ Context: ${browserInfo.executionContext}`);
    console.log('===============================\n');
  }

  /**
   * Generate environment summary for CI/CD
   */
  static async generateEnvironmentSummary(page: Page): Promise<string> {
    const browserInfo = await this.captureBrowserInfo(page);
    
    return `Browser: ${browserInfo.browserName} ${browserInfo.browserVersion} | Platform: ${browserInfo.platform} | Environment: ${browserInfo.testEnvironment} | Context: ${browserInfo.executionContext}`;
  }
}

/*
🎯 PROFESSIONAL USAGE EXAMPLES:

// Basic browser info attachment
await BrowserInfoUtils.attachBrowserInfoToReport(page, testInfo);

// Custom named browser info
await BrowserInfoUtils.attachBrowserInfoToReport(page, testInfo, 'login-test-browser-info');

// Console logging
await BrowserInfoUtils.logBrowserInfo(page, 'Login Test');

// Get browser metadata programmatically
const browserInfo = await BrowserInfoUtils.captureBrowserInfo(page);
console.log(`Testing on ${browserInfo.browserName} ${browserInfo.browserVersion}`);

// Generate environment summary for CI/CD
const summary = await BrowserInfoUtils.generateEnvironmentSummary(page);
console.log(summary);

// Full execution context
const context = await BrowserInfoUtils.captureTestExecutionContext(page, testInfo);
*/ 