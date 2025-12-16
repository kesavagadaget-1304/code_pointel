import { Page, TestInfo } from '@playwright/test';
import { BrowserInfoUtils, BrowserMetadata } from './browserInfo';

/**
 * Professional Screenshot Utility for HTML Reports
 * Ensures all screenshots appear in timestamped HTML reports
 */
export class ScreenshotUtils {
  
  /**
   * Take screenshot and attach to HTML report
   * @param page - Playwright page object
   * @param testInfo - Playwright test info (for HTML report attachment)
   * @param name - Descriptive name for the screenshot
   * @param options - Screenshot options
   */
  static async capture(
    page: Page, 
    testInfo: TestInfo, 
    name: string,
    options: { fullPage?: boolean; quality?: number; type?: 'png' | 'jpeg' } = {}
  ): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = `${name}-${timestamp}`;
      
      // Determine format and quality settings
      const useJpeg = options.quality && options.quality < 100;
      const screenshotType = options.type || (useJpeg ? 'jpeg' : 'png');
      const contentType = screenshotType === 'jpeg' ? 'image/jpeg' : 'image/png';
      
      // Build screenshot options
      const screenshotOptions: any = {
        fullPage: options.fullPage || false,
        type: screenshotType,
        ...options
      };
      
      // Only add quality for JPEG screenshots
      if (screenshotType === 'jpeg' && options.quality) {
        screenshotOptions.quality = options.quality;
      } else {
        // Remove quality for PNG screenshots
        delete screenshotOptions.quality;
      }
      
      // Take screenshot with proper options
      const screenshot = await page.screenshot(screenshotOptions);
      
      // ✅ Attach to HTML report - this ensures it appears in the report
      await testInfo.attach(screenshotName, {
        body: screenshot,
        contentType
      });
      
      // console.log(`📸 Screenshot captured: ${screenshotName} (${screenshotType.toUpperCase()})`);
      
    } catch (error) {
      console.error(`❌ Screenshot failed: ${name}`, error);
    }
  }

  /**
   * Capture full page screenshot (PNG format)
   */
  static async captureFullPage(page: Page, testInfo: TestInfo, name: string): Promise<void> {
    return this.capture(page, testInfo, name, { fullPage: true });
  }

  /**
   * Capture high quality screenshot (JPEG format for compression)
   */
  static async captureHighQuality(page: Page, testInfo: TestInfo, name: string): Promise<void> {
    return this.capture(page, testInfo, name, { 
      fullPage: true, 
      quality: 95, 
      type: 'jpeg' 
    });
  }

  /**
   * Capture compressed screenshot (JPEG format)
   */
  static async captureCompressed(page: Page, testInfo: TestInfo, name: string, quality: number = 80): Promise<void> {
    return this.capture(page, testInfo, name, { 
      fullPage: true, 
      quality, 
      type: 'jpeg' 
    });
  }

  /**
   * Capture element screenshot
   */
  static async captureElement(page: Page, testInfo: TestInfo, selector: string, name: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = `${name}-element-${timestamp}`;
      
      const element = await page.locator(selector);
      const screenshot = await element.screenshot({ type: 'png' });
      
      await testInfo.attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png'
      });
      
      console.log(`📸 Element screenshot captured: ${screenshotName} (PNG)`);
      
    } catch (error) {
      console.error(`❌ Element screenshot failed: ${name}`, error);
    }
  }

  /**
   * Capture multiple screenshots in sequence
   */
  static async captureSequence(
    page: Page, 
    testInfo: TestInfo, 
    screenshots: { name: string; options?: any }[]
  ): Promise<void> {
    for (const { name, options } of screenshots) {
      await this.capture(page, testInfo, name, options);
      // Small delay between screenshots
      await page.waitForTimeout(500);
    }
  }

  /**
   * Capture before and after screenshots
   */
  static async captureBefore(page: Page, testInfo: TestInfo, action: string): Promise<void> {
    return this.capture(page, testInfo, `before-${action}`);
  }

  static async captureAfter(page: Page, testInfo: TestInfo, action: string): Promise<void> {
    return this.capture(page, testInfo, `after-${action}`);
  }

  /**
   * Capture with step context
   */
  static async captureStep(page: Page, testInfo: TestInfo, step: string, stepNumber?: number): Promise<void> {
    const stepName = stepNumber ? `step-${stepNumber}-${step}` : `step-${step}`;
    return this.capture(page, testInfo, stepName);
  }

  /**
   * Capture screenshot with browser information attached
   */
  static async captureWithBrowserInfo(
    page: Page, 
    testInfo: TestInfo, 
    name: string,
    options: { fullPage?: boolean; quality?: number; type?: 'png' | 'jpeg' } = {}
  ): Promise<BrowserMetadata> {
    // Take the screenshot first
    await this.capture(page, testInfo, name, options);
    
    // Then capture and attach browser information
    const browserInfo = await BrowserInfoUtils.attachBrowserInfoToReport(
      page, 
      testInfo, 
      `${name}-browser-info`
    );
    
    return browserInfo;
  }

  /**
   * Capture screenshot with environment summary in console
   */
  static async captureWithEnvironmentLog(
    page: Page, 
    testInfo: TestInfo, 
    name: string,
    options: { fullPage?: boolean; quality?: number; type?: 'png' | 'jpeg' } = {}
  ): Promise<void> {
    // Take the screenshot
    await this.capture(page, testInfo, name, options);
    
    // Log environment summary
    const summary = await BrowserInfoUtils.generateEnvironmentSummary(page);
    console.log(`📊 Environment for ${name}: ${summary}`);
  }

  /**
   * Professional test step documentation with browser context
   */
  static async captureTestStep(
    page: Page, 
    testInfo: TestInfo, 
    stepName: string, 
    stepNumber: number,
    includeBrowserInfo: boolean = false
  ): Promise<void> {
    const fullStepName = `step-${stepNumber}-${stepName}`;
    
    if (includeBrowserInfo) {
      await this.captureWithBrowserInfo(page, testInfo, fullStepName);
    } else {
      await this.capture(page, testInfo, fullStepName);
    }
  }
}

/*
🎯 PROFESSIONAL USAGE EXAMPLES:

// Basic screenshot (PNG format)
await ScreenshotUtils.capture(page, testInfo, 'login-page');

// Full page screenshot (PNG format)
await ScreenshotUtils.captureFullPage(page, testInfo, 'dashboard');

// High quality screenshot (JPEG format with 95% quality)
await ScreenshotUtils.captureHighQuality(page, testInfo, 'final-result');

// Compressed screenshot (JPEG format with custom quality)
await ScreenshotUtils.captureCompressed(page, testInfo, 'large-page', 80);

// Element screenshot (PNG format)
await ScreenshotUtils.captureElement(page, testInfo, '#login-form', 'login-form');

// Custom format and quality
await ScreenshotUtils.capture(page, testInfo, 'custom', { 
  fullPage: true, 
  quality: 90, 
  type: 'jpeg' 
});

// Before/After pattern
await ScreenshotUtils.captureBefore(page, testInfo, 'form-submit');
await page.click('#submit');
await ScreenshotUtils.captureAfter(page, testInfo, 'form-submit');

// Step-by-step screenshots
await ScreenshotUtils.captureStep(page, testInfo, 'login-start', 1);
await ScreenshotUtils.captureStep(page, testInfo, 'form-filled', 2);

// 🌐 NEW: Screenshots with browser information
await ScreenshotUtils.captureWithBrowserInfo(page, testInfo, 'critical-test');

// 🌐 Screenshot with environment logging
await ScreenshotUtils.captureWithEnvironmentLog(page, testInfo, 'debug-screen');

// 🌐 Professional test step with optional browser info
await ScreenshotUtils.captureTestStep(page, testInfo, 'user-login', 1, true);  // with browser info
await ScreenshotUtils.captureTestStep(page, testInfo, 'form-validation', 2);   // without browser info

// Multiple screenshots sequence with different formats
await ScreenshotUtils.captureSequence(page, testInfo, [
  { name: 'initial-state' },                              // PNG
  { name: 'form-filled', options: { fullPage: true } },   // PNG full page
  { name: 'final-state', options: { quality: 85, type: 'jpeg' } }  // JPEG compressed
]);

✅ ALL screenshots will appear in your timestamped HTML report!
✅ PNG for high quality, JPEG for compression with quality control
✅ No more quality option errors!
✅ 🌐 Browser version information available in reports!
*/ 