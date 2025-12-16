import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('DCCM', () => {
  test.describe.configure({ mode: 'serial' });
  
  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  
    
  test.beforeEach(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
    
    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  
  /*test.afterEach(async () => {
    try {
      await sharedPage.locator(SELECTORS.LOGOUT_ACCOUNTICON).click();
      await sharedPage.locator(SELECTORS.LOGOUT).click();
      //await loginPage.logout();
    } catch (error) {
      // Logout error handled silently
    
    }
  });
  */
  test("@DCCM_SIT_TC_001 @low Ensure while click on mirror agent in more option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          //await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_VALIDATE)).toBeVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-agents');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await context.close();
          
        },
      
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'error', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

    test("@DCCM_SIT_TC_002 @low Check the fileds and buttons present in the mirror agent page", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP)).toBeVisible(); 
          await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP)).toBeVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-agents');
          await context.close();
        },
      
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'error', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });


      test("@DCCM_SIT_TC_003 @low Ensure while click on division drop down", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.mouse.click(0, 0); 
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-agents');
          await context.close();
        },
      
        sharedPage,
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'error', 
        SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });




});


