import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Accountingetoe } from '../../pages/accountingetoe';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Activity', () => {
  test.describe.configure({ mode: 'serial' });
  
  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingetoe: Accountingetoe;
    
  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
    
    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
    accountingetoe = new Accountingetoe(sharedPage);
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
          await accountingetoe.navigateToAccountingActivity(testInfo);
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
          await accountingetoe.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Accounting Header',
        async () => {
          await accountingetoe.verifyAccountingHeader();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text',
        async () => {
          await expect(sharedPage.locator('text=Connect to QuickBooks Online')).toBeVisible();
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

  test('@E2E_003 @medium - Click banner CTA', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingetoe.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );
      
      await TestHelpers.executeTestStep(
        'Close Navigation Arrow',
        async () => {
          await accountingetoe.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text is Present',
        async () => {
          await expect(sharedPage.locator('text=Connect to QuickBooks Online')).toBeVisible();
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Click Connect to QuickBooks Online CTA',
        async () => {
          await sharedPage.locator('text=Connect to QuickBooks Online').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text',
        async () => {
          await expect(sharedPage.locator('text=Connect your QuickBooks Online account')).toBeVisible();
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

});