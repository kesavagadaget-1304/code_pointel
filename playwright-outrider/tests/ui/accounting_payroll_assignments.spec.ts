import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountingPage } from '../../pages/AccountingPage';
import { PayrollAssignmentsPage } from '../../pages/PayrollAssignmentsPage';
import { LOGIN_CREDENTIALS, TIMEOUTS, SCREENSHOT_PATHS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Payroll_Assignments', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: AccountingPage;
  let payrollPage: PayrollAssignmentsPage;

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
    payrollPage = new PayrollAssignmentsPage(sharedPage);
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

  test('@C1758230 @low - Navigate to Payroll Assignments', async ({ }, testInfo) => {
    try {
          await payrollPage.clickPayrollAssignments();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-loaded',
        { fullPage: true }
      );

      await payrollPage.clickCloseArrow();
      
      await payrollPage.verifyPayrollAssignmentsHeader();
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Navigation Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758231 @low - Select Paygroup from Dropdown', async ({ }, testInfo) => {
    try {
      // Click paygroup dropdown and select paygroup
      await payrollPage.clickPaygroupDropdown();
      await payrollPage.clickSelectPaygroup();
      
      // Wait for 2 seconds then take screenshot
      await sharedPage.waitForTimeout(2000);
      
      // Screenshot: First paygroup select
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-paygroup-selected',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Paygroup Selection Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758232 @low - Copy From Modal Operations', async ({ }, testInfo) => {
    try {
      // Click copy from button to open modal
      await payrollPage.clickCopyFromButton();
      
      // Wait for modal to be visible before taking screenshot
      await expect(payrollPage.copyFromPaygroupDropdown).toBeVisible({ timeout: 5000 });
      
      // Screenshot: Copy from modal pop up
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-copy-from-modal',
        { fullPage: true }
      );

      // Select paygroup from the modal
      await payrollPage.clickCopyFromPaygroupDropdown();
      await payrollPage.selectPaygroupInCopyFromModal();
      
      // Wait for 2 seconds after selecting paygroup then take screenshot
      await sharedPage.waitForTimeout(2000);
      
      // Screenshot: Selecting paygroup from modal
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-modal-paygroup-selected',
        { fullPage: true }
      );

      // Close the modal
      await payrollPage.closeCopyFromModal();
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Copy From Modal Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758233 @low - Click Locations expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickLocationsExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-locations-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Locations Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758234 @low - Click Earnings expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickEarningsExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-earnings-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Earnings Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758235 @low - Click Tips expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickTipsExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-tips-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Tips Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758236 @low - Click Deductions expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickDeductionsExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-deductions-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Deductions Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758237 @low - Click Employer Taxes expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickEmployerTaxesExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-employer-taxes-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Employer Taxes Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758238 @low - Click Fees expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickFeesExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-fees-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Fees Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758239 @low - Click Bank Withdrawals expand/collapse button', async ({ }, testInfo) => {
    try {
      await payrollPage.clickBankWithdrawalsExpandCollapse();
      
      await ScreenshotUtils.capture(
        sharedPage, 
        testInfo, 
        'payroll-assignments-bank-withdrawals-expanded',
        { fullPage: true }
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Payroll Assignments Bank Withdrawals Expand Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

}); 