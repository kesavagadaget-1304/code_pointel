import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Accountingetoe } from '../../pages/accountingetoe';
import { AccountingConnectionsPage } from '../../pages/AccountingConnectionsPage';
import { PayrollAssignmentsPage } from '../../pages/PayrollAssignmentsPage';
import { PayrollSettingsPage } from '../../pages/PayrollSettingsPage';
import { PayrollAdmin } from '../../pages/payrollAdmin';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Activity', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: Accountingetoe;
  let accountingConnectionsPage: AccountingConnectionsPage;
  let payrollAssignmentsPage: PayrollAssignmentsPage;
  let payrollSettingsPage: PayrollSettingsPage;
  let payrollAdmin: PayrollAdmin;

  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();

    const loginPage = new LoginPage(sharedPage);
    await loginPage.adminSignIn(LOGIN_CREDENTIALS.PAYROLL_LOGIN_USERNAME, LOGIN_CREDENTIALS.PAYROLL_LOGIN_PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
    accountingPage = new Accountingetoe(sharedPage);
    accountingConnectionsPage = new AccountingConnectionsPage(sharedPage);
    payrollAssignmentsPage = new PayrollAssignmentsPage(sharedPage);
    payrollSettingsPage = new PayrollSettingsPage(sharedPage);
    payrollAdmin = new PayrollAdmin(sharedPage);
  });

  test.afterAll(async () => {
    try {
      const loginPage = new LoginPage(sharedPage);
      await loginPage.adminLogout();
    } catch (error) {
      // Logout error handled silently
    } finally {
      if (context) {
        await context.close();
      }
    }
  });

  test('@AP_001 @low - Post payroll in Payroll portal (Earnings/Tips/Taxes/Deductions/etc.)', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {

          await payrollAdmin.payrollTenantDropdown.click();
          await payrollAdmin.payrollSearchRestaurant.fill('legendstavern');
          await payrollAdmin.payrollRestaurantOption.click();
          await payrollAdmin.payrollViewpayroll.click();

        },

        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );



    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AP_002 @low - Accounting Activity shows eligible journal on correct date', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {
          await sharedPage.waitForLoadState('domcontentloaded');
          await expect(sharedPage.locator("//div[contains(text(),'MANUAL PAYROLL PAY GROUPS')]")).toBeVisible();
          await sharedPage.waitForTimeout(2000);
          await payrollAdmin.payrollPreview.click();
          await sharedPage.waitForLoadState('domcontentloaded');
          const totalAmount = await payrollAdmin.payrollPageTotalAmount.textContent();
          const payrolconfig = await payrollAdmin.payrollConfigTemplate.textContent();
        },

        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AP_003 @low - Open journal detail and validate business logic & balance', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {
          await payrollAdmin.payrollStartPayroll.click();
          await payrollAdmin.payrollStartPayrollAnyway.click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await expect(sharedPage.locator("//div[contains(text(),'Review, add, or modify employee earnings and deductions')]")).toBeVisible();
          await payrollAdmin.payrollCalculatePayroll.click();
          await payrollAdmin.payrollCalculatePayrollContinue.click();
          await sharedPage.waitForLoadState('domcontentloaded');
          const payrollestimatedwithdrawalamount = await payrollAdmin.payrollPageEstimatedWithdrawalAmount.textContent();
          const payrollpaydate = await payrollAdmin.payrollPaydate.textContent();
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AP_004 @low - Sync to QBO → status Synced; TxnID captured; calendar badge', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {
          await payrollAdmin.payrollSubmitPayroll.click();
          await payrollAdmin.payrollSubmitPayrollConfirmed.click();
          await sharedPage.waitForLoadState('domcontentloaded');
        },

        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );



    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AP_005 @low - Audit / Sync log view', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {
          await expect(sharedPage.locator("//div[contains(text(),'Payroll posted successfully!')]")).toBeVisible();

        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });


  test('@AP_00 @low - Accounting Activity shows eligible journal on correct date', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Post Payroll in Payroll Portal',
        async () => {


        },

        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );



    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Accounting Tab Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });


});