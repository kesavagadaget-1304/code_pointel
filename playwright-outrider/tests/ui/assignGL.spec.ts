import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AssignGL } from '../../pages/AssignGL';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Assign GL', () => {
  test.describe.configure({ mode: 'serial' });
  
  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let assigngl: AssignGL;
    
  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
    
    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
    assigngl = new AssignGL(sharedPage);
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
  
  test("@GLM-01 @low - Verify that the 'Select GL' dropdown appears for unmapped entries on the Journal Page", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await assigngl.navigateToAccountingActivity(testInfo);
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


  test("@GLM-02 @low - Ensure that the 'Assign GL' link appears when multiple GLs are missing", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await assigngl.clickPayrollFailed();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator('//*[contains(text(),"Assign a GL to the new categories found to successfully sync to QuickBooks")]').isVisible();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'assigngl-message-visible');
          
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
 
  test("@GLM-03 @low - Verify that mapped GLs display the correct account name and hide inline mapping options", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await assigngl.viewDetails.click();
          await assigngl.assignGL.click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'assigngl-message-visible');
          //await sharedPage.locator("//button[@aria-label='Close']").click();
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


  test("@GLM-04 @low - Verify that a single GL can be mapped inline using the dropdown", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await assigngl.viewDetails.click();
          await assigngl.assignGL.click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'assigngl-message-visible');
          //await sharedPage.locator("//button[@aria-label='Close']").click();
          
          await assigngl.payrollAssignmentsGLDropdown.click();
          await sharedPage.mouse.click(0, 0);
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


  test("@GLM-07 @low - Verify that clicking the 'Assign GL' link navigates to the Payroll Assignments Page", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
            await assigngl.navigateToAccountingActivity(testInfo);
            await sharedPage.waitForTimeout(2000);
            await assigngl.clickPayrollFailed();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator('//*[contains(text(),"Assign a GL to the new categories found to successfully sync to QuickBooks")]').isVisible();
            await ScreenshotUtils.capture(sharedPage, testInfo, 'assigngl-message-visible');
            await assigngl.viewDetails.click();
            await assigngl.assignGL.click();
            await sharedPage.waitForTimeout(2000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'assigngl-message-visible');
            await assigngl.payrollAssignmentsHeaderTitle.isVisible();

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