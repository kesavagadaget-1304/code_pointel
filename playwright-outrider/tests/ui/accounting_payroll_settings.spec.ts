import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountingPage } from '../../pages/AccountingPage';
import { PayrollSettingsPage } from '../../pages/PayrollSettingsPage';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Payroll_Settings', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: AccountingPage;
  let settingsPage: PayrollSettingsPage;

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();

    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);

    accountingPage = new AccountingPage(sharedPage);
    await accountingPage.clickAccountingTab();
  });

  test.beforeEach(async () => {
    accountingPage = new AccountingPage(sharedPage);
    settingsPage = new PayrollSettingsPage(sharedPage);
  });

  test.afterAll(async () => {
    try {
      const loginPage = new LoginPage(sharedPage);
      await loginPage.logout();
    } catch (error) {
      // Logout error handled silently
    } finally {
      if (context) {
        await context.close();
      }
    }
  });

  test('@C1758232 @low - Navigate to Payroll Settings', async ({ }, testInfo) => {
    try {
      await settingsPage.navigateToSettings();

      await ScreenshotUtils.capture(
        sharedPage,
        testInfo,
        'payroll-settings-loaded',
        { fullPage: true }
      );

      await settingsPage.clickCloseArrow();
      
      await settingsPage.verifyPayrollSettingsHeader();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Settings Navigation Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758233 @low - Select Company from Dropdown', async ({ }, testInfo) => {
    try {
      // Company dropdown selection on the already-loaded payroll settings page
      await settingsPage.selectCompanyOption2();

      await ScreenshotUtils.capture(
        sharedPage,
        testInfo,
        'company-selected',
        { fullPage: true }
      );

      // Verify company dropdown is still visible after selection
      await expect(settingsPage.companyDropdown).toBeVisible();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Company Selection Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758234 @low - Select Posting Date from Dropdown', async ({ }, testInfo) => {
    try {
      // Posting date dropdown selection on the already-loaded payroll settings page
      await settingsPage.selectCheckDate();

      await ScreenshotUtils.capture(
        sharedPage,
        testInfo,
        'posting-date-selected',
        { fullPage: true }
      );

      // Verify posting date dropdown is still visible after selection
      await expect(settingsPage.postingDateDropdown).toBeVisible();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Posting Date Selection Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758235 @low - Select Paper Checks Summary from Dropdown', async ({ }, testInfo) => {
    try {
      // Paper checks dropdown selection on the already-loaded payroll settings page
      await settingsPage.selectPaperChecksSummary();

      await ScreenshotUtils.capture(
        sharedPage,
        testInfo,
        'paper-checks-summary-selected',
        { fullPage: true }
      );
      
      // Verify paper checks dropdown is still visible after selection
      await expect(settingsPage.paperChecksDropdown).toBeVisible();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Paper Checks Summary Selection Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });
}); 