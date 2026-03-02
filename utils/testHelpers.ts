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

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()';

const randomChar = (charSet: string): string =>
  charSet.charAt(Math.floor(Math.random() * charSet.length));

export function randomNumeric(length: number = 5): string {

  return Array.from({ length }, () =>
    NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length))
  ).join('');
}

/**
 * Generate random string with alphabets, numbers and special characters
 */
export function complexString(length: number = 10): string {
  return Array.from({ length }, () =>
    CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  ).join('');
}

/**
 * Generate strictly alphanumeric string
 */
export function alphaNumeric(length: number = 10): string {
  const chars = UPPER + LOWER + NUMBERS;
  return Array.from({ length }, () => randomChar(chars)).join('');
}

/**
 * Generate password with at least:
 * 1 uppercase, 1 number, 1 special character
 */
export function alphaNumericSpecialchar(length: number = 10): string {
  if (length < 3) {
    throw new Error('Password length must be at least 3');
  }

  const mandatory =
    randomChar(UPPER) +
    randomChar(NUMBERS) +
    randomChar(SPECIAL);

  const allChars = UPPER + LOWER + NUMBERS + SPECIAL;

  const remaining = Array.from({ length: length - 3 }, () =>
    randomChar(allChars)
  ).join('');

  return (mandatory + remaining)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}