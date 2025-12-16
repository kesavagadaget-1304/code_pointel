import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Accountingetoe } from '../../pages/accountingetoe';
import { AccountingConnectionsPage } from '../../pages/AccountingConnectionsPage';
import { PayrollAssignmentsPage } from '../../pages/PayrollAssignmentsPage';
import { PayrollSettingsPage } from '../../pages/PayrollSettingsPage';
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

  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();

    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
    accountingPage = new Accountingetoe(sharedPage);
    accountingConnectionsPage = new AccountingConnectionsPage(sharedPage);
    payrollAssignmentsPage = new PayrollAssignmentsPage(sharedPage);
    payrollSettingsPage = new PayrollSettingsPage(sharedPage);
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

  test('@AA_001 @low - Login → Accounting Activity (first time banner)', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },

        //sharedPage,
        //SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );

      await TestHelpers.executeTestStep(
        'Close Arrow',
        async () => {
          await accountingPage.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Accounting Header',
        async () => {
          await accountingPage.verifyAccountingHeader();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text',
        async () => {
          await expect(sharedPage.locator('text=Connect them now')).toBeVisible();
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

  /*
  test('@AA_002 @medium - Click banner CTA', async ({ }, testInfo) => {
    try {

      await TestHelpers.executeTestStep(
        'Click Connect to QuickBooks Online CTA',
        async () => {
          await sharedPage.locator('text=Connect them now').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text',
        async () => {
          await expect(sharedPage.locator('text= Connect them now')).toBeVisible();
          await sharedPage.waitForTimeout(3000);
          await accountingPage.loginToQBO.isEnabled();
          await sharedPage.waitForTimeout(3000);
          await accountingPage.modalCloseButton.click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR

      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Click Banner CTA Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AA_004 @medium - Open GL Codes → use dropdown & search; Open Classes → use dropdown & search', async ({ }, testInfo) => {
    try {

      await TestHelpers.executeTestStep(
        'Open GL Codes',
        async () => {
          await accountingConnectionsPage.connectionsLink.click();
          await sharedPage.waitForTimeout(3000);
          await accountingConnectionsPage.glCodesTab.click();
          await sharedPage.waitForTimeout(3000);

          // Click and verify company dropdown
          const companyDropdown = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_COMPANY_DROPDOWN);
          await companyDropdown.waitFor({ state: 'visible', timeout: 15000 });
          await sharedPage.waitForTimeout(3000);

          // Verify search box is visible
          const searchBox = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
          await expect(searchBox).toBeVisible({ timeout: 15000 });

        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );


    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Click Banner CTA Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AA_005 @medium - Assignments persist; paygroup Complete/eligible', async ({ }, testInfo) => {
    try {

      await TestHelpers.executeTestStep(
        'Open Assignments',
        async () => {
          await payrollAssignmentsPage.payrollAssignmentsHeader.click();
          await sharedPage.waitForTimeout(3000);
          await expect(sharedPage.locator(SELECTORS.PAYROLL_ASSIGNMENTS_H1)).toBeVisible();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.locations.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.earnings.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.tips.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.deductions.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.payrollTaxes.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.otherExpenses.click();
          await sharedPage.waitForTimeout(3000);
          await payrollAssignmentsPage.bankWithdrawals.click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );


    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Click Banner CTA Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });


  test('@AA_006 @medium - Open Settings → set fields → observe Save state → Save', async ({ }, testInfo) => {
    try {

      await TestHelpers.executeTestStep(
        'Click Payroll Settings',
        async () => {
          await expect(sharedPage.locator(SELECTORS.ACCOUNTING_PAYROLL_SETTINGS_HEADER)).toBeVisible();
          await sharedPage.waitForTimeout(3000);
          await payrollSettingsPage.nav1.click();
          await sharedPage.waitForTimeout(3000);
          await payrollSettingsPage.nav2.click();
          await sharedPage.waitForTimeout(3000);
          await payrollSettingsPage.nav3.click();
          await sharedPage.waitForTimeout(3000);
          await payrollSettingsPage.connectedAccount.click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.keyboard.press('Escape');
          await payrollSettingsPage.postingDate.click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.keyboard.press('Escape');
          await payrollSettingsPage.paperChecks.click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.keyboard.press('Escape');
          await payrollSettingsPage.glAssignments.isEnabled();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );


    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Click Banner CTA Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@AA_010 @medium - Make unsaved edits on Paygroup A → switch to B', async ({ }, testInfo) => {
    try {

      await TestHelpers.executeTestStep(
        'Click Payroll Settings',
        async () => {
          if (await payrollSettingsPage.individual.isVisible()) {
            await payrollSettingsPage.paperChecks.click();
            await payrollSettingsPage.summary.click();
          }
          else {
            if (await payrollSettingsPage.summary.isVisible()) {
              await payrollSettingsPage.paperChecks.click();
              await payrollSettingsPage.individual.click();
            }
          }

          await sharedPage.waitForTimeout(3000);
        },

        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage,
        error,
        'Click Banner CTA Test',
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });
*/
});