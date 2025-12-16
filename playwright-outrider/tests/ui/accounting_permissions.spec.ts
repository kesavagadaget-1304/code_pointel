import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountingPage } from '../../pages/AccountingPage';
import { NON_ADMIN_CREDENTIALS, TIMEOUTS, SCREENSHOT_PATHS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Permissions', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let loginPage: LoginPage;
  let accountingPage: AccountingPage;

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
  });

  test.beforeEach(async () => {
    loginPage = new LoginPage(sharedPage);
    accountingPage = new AccountingPage(sharedPage);
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

  test('@C1758224 @low - Ensure that the Accounting tab is not visible to users who do not have the necessary permissions', async ({ }, testInfo) => {
    try {
        await loginPage.signIn(NON_ADMIN_CREDENTIALS.USERNAME, NON_ADMIN_CREDENTIALS.PASSWORD);
      
      // Close any setup checklist that might appear after login
      await accountingPage.closeChecklist();
      
        await accountingPage.verifyAccountingTabNotVisible();
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Accounting Permissions Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
      }
  });
}); 