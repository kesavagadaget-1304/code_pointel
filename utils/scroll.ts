import { Page, TestInfo, Locator, expect } from '@playwright/test';
import { BrowserInfoUtils, BrowserMetadata } from './browserInfo';

/**
 * Scrolls the page until a specific element is visible
 * @param locator - The Playwright locator of the element to scroll to
 */
export async function scrollUntilVisible(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();
}