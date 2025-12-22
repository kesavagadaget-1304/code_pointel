import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Reusable Framework Utility to Confirm Download Event was Triggered
 * 
 * This utility provides a robust way to verify that file downloads were successfully triggered
 * and handles the download event using Playwright's download mechanism.
 */
export class DownloadUtils {
  /**
   * Waits for and confirms that a download event was triggered, then saves the file
   * 
   * @param page - The Playwright Page object
   * @param triggerAction - Async function that triggers the download (e.g., clicking export button)
   * @param expectedFileName - Optional: Expected filename pattern to validate (e.g., "*.xlsx")
   * @param downloadPath - Optional: Custom path to save the downloaded file (defaults to ./downloads)
   * @returns Promise<string> - The path to the downloaded file
   * 
   * @example
   * // Usage in tests
   * const downloadPath = await DownloadUtils.confirmDownloadTriggered(
   *   sharedPage,
   *   async () => {
   *     await sharedPage.locator(SELECTORS.EXPORT_BUTTON).click();
   *   },
   *   'agents_data.xlsx'
   * );
   * 
   * // Or with pattern matching
   * const downloadPath = await DownloadUtils.confirmDownloadTriggered(
   *   sharedPage,
   *   async () => {
   *     await sharedPage.locator(SELECTORS.EXPORT_BUTTON).click();
   *   },
   *   '*.xlsx'
   * );
   */
  static async confirmDownloadTriggered(
    page: Page,
    triggerAction: () => Promise<void>,
    expectedFileName?: string,
    downloadPath: string = './downloads'
  ): Promise<string> {
    // Ensure download directory exists
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    // Listen for the download event
    const downloadPromise = page.waitForEvent('download');

    // Trigger the download action
    await triggerAction();

    // Wait for the download to complete
    const download = await downloadPromise;

    // Get the suggested filename
    const suggestedFileName = download.suggestedFilename();

    // Validate filename if expected filename is provided
    if (expectedFileName) {
      const isMatching = DownloadUtils.matchesPattern(suggestedFileName, expectedFileName);
      if (!isMatching) {
        throw new Error(
          `Download filename mismatch. Expected: ${expectedFileName}, Got: ${suggestedFileName}`
        );
      }
    }

    // Save the downloaded file
    const filePath = path.join(downloadPath, suggestedFileName);
    await download.saveAs(filePath);

    console.log(`✓ Download confirmed: ${suggestedFileName}`);
    console.log(`✓ File saved to: ${filePath}`);

    return filePath;
  }

  /**
   * Confirms download was triggered and returns download object without saving
   * Useful when you need to inspect download details before saving
   * 
   * @param page - The Playwright Page object
   * @param triggerAction - Async function that triggers the download
   * @returns Promise<Download> - Playwright Download object
   * 
   * @example
   * const download = await DownloadUtils.confirmDownloadTriggeredWithoutSave(
   *   sharedPage,
   *   async () => {
   *     await sharedPage.locator(SELECTORS.EXPORT_BUTTON).click();
   *   }
   * );
   * 
   * console.log('Downloaded file:', download.suggestedFilename());
   * await download.saveAs('./downloads/' + download.suggestedFilename());
   */
  static async confirmDownloadTriggeredWithoutSave(
    sharedPage: Page,
    triggerAction: () => Promise<void>
  ): Promise<any> {
    // Listen for the download event
    const downloadPromise = sharedPage.waitForEvent('download');
    // Trigger the download action
    await triggerAction();

    // Wait for the download to complete
    const download = await downloadPromise;

    console.log(`✓ Download event triggered: ${download.suggestedFilename()}`);

    return download;
  }


  
  /**
   * Advanced: Confirms download with multiple validations
   * 
   * @param page - The Playwright Page object
   * @param triggerAction - Async function that triggers the download
   * @param options - Configuration options for download validation
   * @returns Promise<DownloadResult> - Result object with download details and validation status
   * 
   * @example
   * const result = await DownloadUtils.confirmDownloadWithValidation(
   *   sharedPage,
   *   async () => {
   *     await sharedPage.locator(SELECTORS.EXPORT_BUTTON).click();
   *   },
   *   {
   *     expectedFileName: 'agents_data.xlsx',
   *     validateFileSize: true,
   *     minFileSizeKB: 5,
   *     maxFileSizeKB: 1000,
   *     downloadPath: './downloads'
   *   }
   * );
   * 
   * console.log(result.isValid); // true/false
   * console.log(result.filePath); // Path to saved file
   */
  static async confirmDownloadWithValidation(
    page: Page,
    triggerAction: () => Promise<void>,
    options: {
      expectedFileName?: string;
      validateFileSize?: boolean;
      minFileSizeKB?: number;
      maxFileSizeKB?: number;
      downloadPath?: string;
      timeout?: number;
    } = {}
  ): Promise<DownloadResult> {
    const {
      expectedFileName,
      validateFileSize = false,
      minFileSizeKB = 0,
      maxFileSizeKB = 100 * 1024, // 100MB default max
      downloadPath = './downloads',
      timeout = 30000
    } = options;

    // Ensure download directory exists
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    const result: DownloadResult = {
      isValid: false,
      fileName: '',
      filePath: '',
      fileSize: 0,
      errors: []
    };

    try {
      // Listen for the download event with timeout
      const downloadPromise = page.waitForEvent('download', { timeout });

      // Trigger the download action
      await triggerAction();

      // Wait for the download to complete
      const download = await downloadPromise;

      const suggestedFileName = download.suggestedFilename();
      result.fileName = suggestedFileName;

      // Validate filename if expected filename is provided
      if (expectedFileName) {
        const isMatching = DownloadUtils.matchesPattern(suggestedFileName, expectedFileName);
        if (!isMatching) {
          result.errors.push(
            `Filename mismatch. Expected: ${expectedFileName}, Got: ${suggestedFileName}`
          );
        }
      }

      // Save the file
      const filePath = path.join(downloadPath, suggestedFileName);
      await download.saveAs(filePath);
      result.filePath = filePath;

      // Validate file size if enabled
      if (validateFileSize && fs.existsSync(filePath)) {
        const fileStats = fs.statSync(filePath);
        const fileSizeKB = fileStats.size / 1024;
        result.fileSize = fileStats.size;

        if (fileSizeKB < minFileSizeKB) {
          result.errors.push(
            `File size too small: ${fileSizeKB.toFixed(2)}KB (minimum: ${minFileSizeKB}KB)`
          );
        }

        if (fileSizeKB > maxFileSizeKB) {
          result.errors.push(
            `File size too large: ${fileSizeKB.toFixed(2)}KB (maximum: ${maxFileSizeKB}KB)`
          );
        }
      }

      // Set isValid to true if no errors
      result.isValid = result.errors.length === 0;

      console.log(`✓ Download confirmed: ${suggestedFileName}`);
      console.log(`✓ File saved to: ${filePath}`);
      if (result.fileSize > 0) {
        console.log(`✓ File size: ${(result.fileSize / 1024).toFixed(2)}KB`);
      }

      return result;
    } catch (error: any) {
      result.errors.push(`Download failed: ${error.message}`);
      console.error(`✗ Download confirmation failed:`, error.message);
      return result;
    }
  }

  /**
   * Helper: Matches filename against pattern
   * Supports wildcards (* for any characters, ? for single character)
   */
  private static matchesPattern(fileName: string, pattern: string): boolean {
    // Convert pattern to regex
    const regexPattern = pattern
      .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape regex special characters
      .replace(/\*/g, '.*') // * matches any characters
      .replace(/\?/g, '.'); // ? matches single character

    const regex = new RegExp(`^${regexPattern}$`, 'i'); // Case-insensitive
    return regex.test(fileName);
  }

  /**
   * Utility: Clean up downloaded files
   * 
   * @param downloadPath - Path to clean
   * @param filePattern - Optional: Only delete files matching pattern
   */
  static async cleanupDownloads(downloadPath: string = './downloads', filePattern?: string): Promise<void> {
    if (!fs.existsSync(downloadPath)) {
      return;
    }

    const files = fs.readdirSync(downloadPath);
    for (const file of files) {
      if (filePattern && !DownloadUtils.matchesPattern(file, filePattern)) {
        continue;
      }

      const filePath = path.join(downloadPath, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`✓ Deleted: ${file}`);
      } catch (error: any) {
        console.error(`✗ Failed to delete ${file}: ${error.message}`);
      }
    }
  }
}

/**
 * Interface for Download Validation Result
 */
export interface DownloadResult {
  isValid: boolean;
  fileName: string;
  filePath: string;
  fileSize: number;
  errors: string[];
}
