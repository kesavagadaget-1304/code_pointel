import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS, DCCM_USERS } from '../../configs/constants_template';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';
import { DownloadUtils } from '../../utils/downloadUtils';
import { copyValueFromLocator, getTimeAfterMinutes, scrollUntilVisible } from '../../utils/scroll';
import { faker } from '@faker-js/faker';

test.describe('DCCM', () => {
  test.describe.configure({ mode: 'serial', retries: 0 });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;


  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();

    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });


  test.afterAll(async () => {
    try {
      await sharedPage.locator(SELECTORS.LOGOUT_ACCOUNTICON).click();
      await sharedPage.locator(SELECTORS.LOGOUT).click();
      //await loginPage.logout();
    } catch (error) {
      // Logout error handled silently

    }
  });

  test("@DCCM_SIT_TC_0001 @low Ensure while click on Template in the dccm cloud menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0001");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ALERT_VALIDATE)).toBeVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-alert-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ALERT_OK_BUTTON).click();
          console.log("Completed test case DCCM_SIT_TC_0001");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

    test("@DCCM_SIT_TC_0002 @low The alert message should be close properly", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0002");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ALERT_VALIDATE)).toBeVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-alert-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ALERT_OK_BUTTON).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-alert-closed');
          console.log("Completed test case DCCM_SIT_TC_0002");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

      test("@DCCM_SIT_TC_0003 @low Template page should be display", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0003");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0003");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

        test("@DCCM_SIT_TC_0004 @low Ensure while click on Select template drop down menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0004");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN)).toBeVisible();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0004");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

    test("@DCCM_SIT_TC_0005 @low Ensure while select any template from drop down menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0005");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-template-selected');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0005");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

      test("@DCCM_SIT_TC_0006 @low Ensure while select None from drop down menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0006");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          expect (sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE)).not.toBeVisible();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-template-selected');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION_NONE).click();
          await sharedPage.waitForTimeout(5000);
          expect (sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE)).toBeVisible();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-none-selected');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0006");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

    test("@DCCM_SIT_TC_0007 @low Ensure while Search valid template name  in drop down menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0007");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          const DCCM_SIT_TC_0007_TemplateName = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).innerText();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_INPUT).fill(DCCM_SIT_TC_0007_TemplateName);
          console.log("Searched Template Name: " + DCCM_SIT_TC_0007_TemplateName);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCHED_INPUT)).toHaveText(DCCM_SIT_TC_0007_TemplateName);
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-template-selected');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0007");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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

  test("@DCCM_SIT_TC_0008 @low Ensure while Search Invalid template name  in drop down menu", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0008");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_INPUT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_INPUT).fill("zzz");
          await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION_NONE)).toBeVisible();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION_NONE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-template-selected');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-closed');
          console.log("Completed test case DCCM_SIT_TC_0008");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
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