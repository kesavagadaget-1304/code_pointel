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

export async function copyValueFromLocator(locator: Locator): Promise<string> {
  const value = await locator.inputValue();
  return value;
}

export function getTimeAfterMinutes(minutesToAdd: number): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutesToAdd);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`; // 24-hour format
}