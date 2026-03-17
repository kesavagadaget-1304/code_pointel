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

  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentSeconds = date.getSeconds();

  console.log(`Current time: ${currentHours}:${currentMinutes}:${currentSeconds}`);

  if (currentSeconds > 45) {
    date.setMinutes(date.getMinutes() + 1 + minutesToAdd);
    console.log(`Seconds > 45, added an extra minute. Time after adding minutes: ${date.getHours()}:${date.getMinutes()}`);
  } else {
    date.setMinutes(date.getMinutes() + minutesToAdd);
    console.log(`Time after adding minutes: ${date.getHours()}:${date.getMinutes()}`);
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`; // 24-hour format
}