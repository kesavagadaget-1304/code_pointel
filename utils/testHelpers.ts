import { Page, expect, TestInfo } from '@playwright/test';
import { TIMEOUTS } from '../configs/constants';
import { ScreenshotUtils } from './screenshotUtils';
import { BrowserInfoUtils } from './browserInfo';
import { getRunId } from './runId';

export class TestHelpers {
  
  // Wait for page to fully load
  static async waitForPageLoad(page: Page, timeout = TIMEOUTS.PAGE_LOAD): Promise<void> {
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded', { timeout: timeout * 2 }); // Double the timeout
    await page.waitForTimeout(10000); // Increase from 5 to 10 seconds
  }

  // Handle test errors with screenshot and debugging info
  static async handleTestError(page: Page, error: any, testName: string, errorScreenshotPath: string, testInfo?: TestInfo): Promise<void> {
    try {
      if (testInfo) {
        // Use ScreenshotUtils for HTML report integration
        await ScreenshotUtils.capture(page, testInfo, `error-${testName.toLowerCase().replace(/\s+/g, '-')}`);
      } else {
        // Fallback to file system screenshot if no testInfo available
      const reportsPath = errorScreenshotPath.replace('screenshots/', `reports/${getRunId()}/screenshots/`);
        await page.screenshot({ path: reportsPath });
      }
    } catch (screenshotError) {
      // Screenshot failed silently
    }
    
    throw error;
  }

  // Execute test step with logging
  static async executeTestStep<T>(
    stepName: string, 
    stepFunction: () => Promise<T>,
    page?: Page,
    errorScreenshotPath?: string
  ): Promise<T> {
    try {
      const result = await stepFunction();
      return result;
    } catch (error) {
      if (page && errorScreenshotPath) {
        await TestHelpers.handleTestError(page, error, stepName, errorScreenshotPath);
      }
      throw error;
    }
  }

  // Simple URL validation
  static async assertUrlContains(page: Page, expectedPart: string, description?: string): Promise<void> {
    const currentUrl = page.url();
    
    try {
      expect(currentUrl).toContain(expectedPart);
    } catch (error) {
      throw error;
    }
  }
} 