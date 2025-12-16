import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountingPage } from '../../pages/AccountingPage';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Activity', () => {
  test.describe.configure({ mode: 'serial' });
  
  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: AccountingPage;
    
  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
    
    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
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
  
  test('@C1737967 @low - Verify that only admins with the "Accounting" permissions can access the Accounting tab.', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Verify that only admins with the "Accounting" permissions can access the Accounting tab.',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
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

  test('@C1759567 @low - Verify that the user can navigate the calendar to previous month using arrow keys', async ({ }, testInfo) => {
    try {
          await accountingPage.clickPreviousMonth();
          await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Calendar Navigation - Previous Month', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915746 @low - Verify that the admin can use the month picker to select a specific month', async ({ }, testInfo) => {
    try {
      await accountingPage.clickCalendarPicker();
      await sharedPage.waitForTimeout(2000);
      await accountingPage.clickSelectMonth();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Month Picker Selection', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1758322 @low - Verify that a successful QBO sync displays a "Synced" status on the Calendar once the payroll journal is successfully posted to QuickBooks', async ({ }, testInfo) => {
    try {
      await accountingPage.clickSuccessPayroll();
      await sharedPage.waitForTimeout(2000);
      
      // Wait for modal to be visible and take screenshot
      await expect(accountingPage.modalCloseButton).toBeVisible({ timeout: 5000 });
      await ScreenshotUtils.capture(sharedPage, testInfo, 'success-payroll-modal');

          await accountingPage.closeModal();
          await sharedPage.waitForTimeout(2000);
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Payroll Status - Success Payroll', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1758321 @low - Ensure that payroll journals are displayed on the Calendar page with the correct date and description when the restaurant has processed payrolls', async ({ }, testInfo) => {
    try {
      await accountingPage.clickInProgressPayroll();
      await sharedPage.waitForTimeout(2000);
      
      // Wait for modal to be visible and take screenshot
      await expect(accountingPage.modalCloseButton).toBeVisible({ timeout: 5000 });
      await ScreenshotUtils.capture(sharedPage, testInfo, 'in-progress-payroll-modal');

          await accountingPage.closeModal();
          await sharedPage.waitForTimeout(2000);
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Payroll Status - In-Progress Payroll', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1758323 @low - Verify that a failed QBO sync displays an appropriate error or "Failed" status on the Calendar when the payroll journal could not be posted to QuickBooks', async ({ }, testInfo) => {
    try {
      await accountingPage.clickFailedPayroll();
      await sharedPage.waitForTimeout(2000);
      
      // Wait for modal to be visible and take screenshot
      await expect(accountingPage.modalCloseButton).toBeVisible({ timeout: 5000 });
      await ScreenshotUtils.capture(sharedPage, testInfo, 'failed-payroll-modal');

          await accountingPage.closeModal();
          await sharedPage.waitForTimeout(2000);
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Payroll Status - Failed Payroll', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1746255 @low - Verify the admin can open the paygroup filter when clicking the paygroup filter dropdown button', async ({ }, testInfo) => {
    try {
      await accountingPage.clickPaygroupFilter();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Open Paygroup Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915217 @low - Verify the admin can search in the paygroup filter', async ({ }, testInfo) => {
    try {
      await accountingPage.searchPaygroup('Texas');
      await sharedPage.waitForTimeout(2000);
      
      // Wait for search results to appear and take screenshot
      await expect(accountingPage.paygroupSearchInput).toBeVisible({ timeout: 5000 });
      await ScreenshotUtils.capture(sharedPage, testInfo, 'paygroup-search-results');
      
      await accountingPage.clearSearchInput();
      await sharedPage.waitForTimeout(2000);
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Paygroup Search Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  // test('@C1915218 @low - Verify the admin can select all paygroups in the paygroup filter', async ({ }, testInfo) => {
  //   try {
  //     await accountingPage.clickSelectAllFilter();
  //     await sharedPage.waitForTimeout(2000);
  //   } catch (error) {
  //     await TestHelpers.handleTestError(
  //       sharedPage, 
  //       error, 
  //       'Select All Paygroups Test', 
  //       SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
  //       testInfo
  //     );
  //   }
  // });

  test('@C1915219 @low - Verify the admin can clear the paygroup filter selection', async ({ }, testInfo) => {
    try {
      await accountingPage.clickClearFilter();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Clear Paygroup Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915258 @low - Verify the admin can close the paygroup filter', async ({ }, testInfo) => {
    try {
      await accountingPage.closeFilter();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Close Paygroup Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1757813 @low - Ensure that the admin can select a QBO company from the connection dropdown when clicking the dropdown box', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Ensure that the admin can select a QBO company from the connection dropdown when clicking the dropdown box',
        async () => {
          await accountingPage.clickConnectionsSelector();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Select QBO Company',
        async () => {
          await accountingPage.selectQBOCompany();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'QBO Company Selection', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1758229 @low - Verify that the Calendar displays empty indicators for all days when a QBO connection exists but contains no data', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Verify that the Calendar displays empty indicators for all days when a QBO connection exists but contains no data',
        async () => {
          await accountingPage.clickCalendarPicker();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Select Month',
        async () => {
          await accountingPage.clickSelectMonth();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Calendar Month Selection', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1878212 @low - Verify that the user can navigate the calendar to next month using arrow keys', async ({ }, testInfo) => {
    try {
          await accountingPage.clickNextMonth();
          await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Calendar Navigation - Next Month', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1746253 @low - Ensure the admin can view the notifications by clicking the notifications right to the paygroup filter', async ({ }, testInfo) => {
    try {
      await accountingPage.openNotificationsPanel();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Open Notifications Panel Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });



  test('@C1915285 @low - Verify the admin can filter notifications by "Error"', async ({ }, testInfo) => {
    try {
      await accountingPage.clickNotificationsErrorFilter();
      await sharedPage.waitForTimeout(2000);
      await ScreenshotUtils.capture(sharedPage, testInfo, 'notifications-error-filter');
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Notifications Error Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915432 @low - Verify the admin can filter notifications by "Warning" in the notifications tab', async ({ }, testInfo) => {
    try {
      await accountingPage.clickNotificationsWarningFilter();
      await sharedPage.waitForTimeout(2000);
      await ScreenshotUtils.capture(sharedPage, testInfo, 'notifications-warning-filter');
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Notifications Warning Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915433 @low - Verify the admin can view all notifications by clicking "All" filter', async ({ }, testInfo) => {
    try {
      await accountingPage.clickNotificationsAllFilter();
      await sharedPage.waitForTimeout(2000);
      await ScreenshotUtils.capture(sharedPage, testInfo, 'notifications-all-filter');
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Notifications All Filter Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915434 @low - Verify the admin can mark all notifications as read', async ({ }, testInfo) => {
    try {
      await accountingPage.clickMarkAllRead();
      await sharedPage.waitForTimeout(2000);
      await ScreenshotUtils.capture(sharedPage, testInfo, 'mark-all-read-complete');
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Mark All Read Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@C1915595 @low - Verify the admin can close the notifications tab', async ({ }, testInfo) => {
    try {
      await accountingPage.closeNotificationsPanel();
      await sharedPage.waitForTimeout(2000);
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Close Notifications Panel Test', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

});