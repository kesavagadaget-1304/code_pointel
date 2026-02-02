import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';
import { copyValueFromLocator, getTimeAfterMinutes, scrollUntilVisible } from '../../utils/scroll';
import { DownloadUtils } from '../../utils/downloadUtils';
import { faker } from '@faker-js/faker';


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
   test("@DCCM_SIT_TC_0001 @low Ensure while click on mirror agent in more option", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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

  test("@DCCM_SIT_TC_0002 @low Check the fileds and buttons present in the mirror agent page", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0003 @low Ensure while click on division drop down", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0004 @low Ensure while select any division  from drop down", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0005 @low Ensure while click on user name search text box field", async ({ }, testInfo) => {
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
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).isEditable());
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0006 @low Ensure while enter values in User name search text box filed", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).fill('Test');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0007 @low Check the boundary value conditions in search text box filed", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).fill('Testalpha');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).fill('123456789');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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


  test("@DCCM_SIT_TC_0008 @low Ensure while search valid username in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).fill('test');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
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

   test("@DCCM_SIT_TC_0009 @low Ensure while search Invalid username in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME).fill('invalid');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NO_USER).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();


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


 test("@DCCM_SIT_TC_0010 @low Ensure while select division and click on search button", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'username');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0011 @low Ensure while without select any users and click on next button", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_VALIDATE).isVisible();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
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

test("@DCCM_SIT_TC_0012 @low Ensure while click on ok button in the above alert message", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_VALIDATE).isVisible();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_OK_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
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

test("@DCCM_SIT_TC_0013 @low Ensure while click on close icon button in the above alert message", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_VALIDATE).isVisible();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
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

test("@DCCM_SIT_TC_0014 @low Ensure while click on close button in the mirror agent", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_VALIDATE).isVisible();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

  test("@DCCM_SIT_TC_0015 @low Ensure while select user name and click on next button", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGES_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PROFILE_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).isVisible());
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_WORKTEAM_LABEL).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'LAbels-Validation');
          sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

 test("@DCCM_SIT_TC_0016 @low Ensure while click on back button in the mirror agent", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).isEnabled());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'LAbels-Validation');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'LAbels-Validation');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0017 @low Enusre while click on deselect all check box in skill tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Selected-All-Skills');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'LAbels-Validation');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0018 @low Enusre while click on select all check box in skill tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Selected-All-Skills');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'LAbels-Validation');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0019 @low Ensure while click on skill name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).isEditable();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0020 @low Ensure while search valid skill name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).fill("2Skill");
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0021 @low Ensure while search Invalid skill name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).fill("junkskill");
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0022 @low Ensure while click on skill level search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_LEVEL_SEARCH_FILTER).isEditable();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0023 @low Ensure while search valid skill level in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_LEVEL_SEARCH_FILTER).fill("4");
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0024 @low Ensure while search Invalid skill level in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_LEVEL_SEARCH_FILTER).press('T');
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

test("@DCCM_SIT_TC_0027 @low Ensure while click on skill level column and enter valid value and click on apply button", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0027=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :",username0027);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0027?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0027?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).click();
          const DCCM_SIT_TC_0027 = faker.number.int({ min: 1, max: 5 }).toString();
          console.log("DCCM_SIT_TC_0027 Generated Skill Level is :",DCCM_SIT_TC_0027);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).fill(DCCM_SIT_TC_0027);
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          expect(await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY).isVisible());
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent() ?? '';
          console.log("History Current Value is :",historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0027));
          await sharedPage.waitForTimeout(2000);
          //expect(sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE)).toHaveText(DCCM_SIT_TC_0027);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

  /*
test.skip("@DCCM_SIT_TC_0028 @low Ensure while click on skill level column and enter Invalid value and click on apply button", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).click();
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT_PARENT).fill("a");
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).press('Escape');
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT)).not.toHaveText("a");
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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
*/

test("@DCCM_SIT_TC_0029 @low Ensure while click on clear all  filters in command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_GRID_MENU).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0030 @low Ensure while click on toggle filter row in the command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_GRID_MENU).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).isHidden());
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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



test("@DCCM_SIT_TC_0031 @low Ensure while click on toggle filter row after text box is hide", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_GRID_MENU).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).isHidden());
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TOGGLE_FILTER_ROW).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER).isVisible());
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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



test("@DCCM_SIT_TC_0032 @low Ensure while click on export to excel", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_GRID_MENU).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_EXPORT_TO_EXCEL).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0033 @low Enusre while click on deselect all check box in Language tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL_CHECKBOX).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0034 @low Enusre while click on select all check box in Language tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL_CHECKBOX).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


test("@DCCM_SIT_TC_0035 @low Ensure while click on Language name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).isEditable();

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

  
test("@DCCM_SIT_TC_0036 @low Ensure while search valid Language name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).fill("Language");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


  
test("@DCCM_SIT_TC_0037 @low Ensure while search Invalid Language name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).fill("Invalid");
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_NO_LANGUAGE_AVAILABLE).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


  
test("@DCCM_SIT_TC_0038 @low Ensure while click on Language level search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).isEditable();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

  test("@DCCM_SIT_TC_0039 @low Ensure while search valid Language level in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).click();
          await sharedPage.waitForLoadState('networkidle');
          const valueDCCM_SIT_TC_0039 = await copyValueFromLocator(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_NUMBER_INPUT));
          console.log('Copied value:', valueDCCM_SIT_TC_0039);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).fill(valueDCCM_SIT_TC_0039);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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


  test("@DCCM_SIT_TC_0040 @low Ensure while search Invalid  Language level in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER).fill("abc");
          await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_NO_LANGUAGE_AVAILABLE).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

  
  
  test("@DCCM_SIT_TC_0043 @low Ensure while click on Language level column and enter valid value and click on apply button", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0043=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :",username0043);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0043?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0043?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0043 = faker.number.int({ min: 1, max: 5 }).toString();
          console.log("DCCM_SIT_TC_0043 Generated Language Level is :",DCCM_SIT_TC_0043);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_NUMBER_INPUT).fill(DCCM_SIT_TC_0043);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent() ?? '';
          console.log("History Current Value is :",historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0043));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();


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


  test("@DCCM_SIT_TC_0044 @low Ensure while click on Language level column and enter Invalid value and click on apply button", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0044=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :",username0044);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0044?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0044?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0044 = faker.number.int({ min: 6, max: 9 }).toString();
          console.log("DCCM_SIT_TC_0044 Generated Language Level is :",DCCM_SIT_TC_0044);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_NUMBER_INPUT).fill(DCCM_SIT_TC_0044);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent() ?? '';
          console.log("History Current Value is :",historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).not.toBe(parseFloat(DCCM_SIT_TC_0044));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();
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

  
  test("@DCCM_SIT_TC_0045 @low Ensure while click on clear all  filters in command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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


  test("@DCCM_SIT_TC_0046 @low Ensure while click on toggle filter row in the command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).isHidden();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0047 @low Ensure while click on toggle filter row after text box is hide", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).isHidden();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER).isVisible();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0048 @low Ensure while click on export to excel", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_GRID_MENU).click();
          
          // Validate download event has occurred
          const download = await DownloadUtils.confirmDownloadTriggeredWithoutSave(
            sharedPage,
            async () => {
              await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_LANGUAGE_EXPORT_TO_EXCEL).click();
            }
          );
          expect(download.suggestedFilename()).toBeTruthy();
          console.log('✓ Download event validated successfully.');
          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0049 @low Enusre while click on deselect all check box in Queues tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_SELECT_ALL_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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


  test("@DCCM_SIT_TC_0050 @low Enusre while click on select all check box in Queues tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_SELECT_ALL_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_SELECT_ALL_CHECKBOX).click();
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0051 @low Ensure while click on Queues name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX).click();
          await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX)).toBeEditable();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0052 @low Ensure while search valid Queues name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX).fill("Queue");
          await sharedPage.waitForTimeout(2000);
          await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX)).toBeEditable();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  
  test("@DCCM_SIT_TC_0053 @low Ensure while search Invalid Queues name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(5000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX).fill("Invalid");
          await sharedPage.waitForTimeout(2000);
          await expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NO_QUEUES_AVAILABLE)).toBeVisible();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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


  test("@DCCM_SIT_TC_0056 @low Ensure while click on clear all  filters in command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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

  
  test("@DCCM_SIT_TC_0057 @low Ensure while click on toggle filter row in the command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_TOGGLE_FILTER_ROW).click();
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX)).toBeHidden();
          await sharedPage.waitForTimeout(3000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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


  test("@DCCM_SIT_TC_0058 @low Ensure while click on toggle filter row after text box is hide", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX)).toBeHidden();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_GRID_MENU).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_TOGGLE_FILTER_ROW).click();
          await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX)).toBeVisible();

          await sharedPage.waitForTimeout(3000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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



  test("@DCCM_SIT_TC_0059 @low Ensure while click on export to excel", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_GRID_MENU).click();
          // Validate download event has occurred
          const download = await DownloadUtils.confirmDownloadTriggeredWithoutSave(
            sharedPage,
            async () => {
              await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_QUEUES_EXPORT_TO_EXCEL).click();
            }
          );
          expect(download.suggestedFilename()).toBeTruthy();
          console.log('✓ Download event validated successfully.');

          await sharedPage.waitForTimeout(3000);
          ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
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


test("@DCCM_SIT_TC_0060,DCCM_SIT_TC_0061 @low Ensure while click on deselect all check box in Utilization tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_DESELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Deselect');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_SELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Select');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

test("@DCCM_SIT_TC_0062,DCCM_SIT_TC_0063 @low Ensure while click on Groups name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).pressSequentially("Call", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

test("@DCCM_SIT_TC_0064 @low Ensure while click on Groups name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH).pressSequentially("Test", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

test("@DCCM_SIT_TC_0065,DCCM_SIT_TC_0066 @low Ensure while click on capacity search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).pressSequentially("1", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

test("@DCCM_SIT_TC_0067 @low Ensure while search  Invalid capacity in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).pressSequentially("24", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  //71 need to do 


test("@DCCM_SIT_TC_0070 @low Ensure while click on capacity  level column and enter valid value and click on apply button", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0070=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :",username0070);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0070?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0070?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(4000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT).click();
          const DCCM_SIT_TC_0070 = faker.number.int({ min: 1, max: 5 }).toString();
          console.log("DCCM_SIT_TC_0070 Generated Utilization Capacity is :",DCCM_SIT_TC_0070);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT).fill(DCCM_SIT_TC_0070);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT).press('Tab');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT).press('Escape');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_APPLY_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(8000);
          expect(await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.waitForLoadState('networkidle');

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent() ?? '';
          console.log("History Current Value is :",historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0070));
          await sharedPage.waitForTimeout(2000);
          //expect(sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE)).toHaveText(DCCM_SIT_TC_0027);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  test("@DCCM_SIT_TC_0072 @low Ensure while click on clear all  filters in command menu ", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH).pressSequentially("24", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Utilization_Search_Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_GRID).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Clear_All_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  test("@DCCM_SIT_TC_0073,DCCM_SIT_TC_0074  @low Ensure while click on toggle filter row in the command menu ", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_GRID).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_UTILIZATION_GRID).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  //75

test("@DCCM_SIT_TC_0076,DCCM_SIT_TC_0077 @low Ensure while click on deselect all check box in Groups tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DESELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Group_Deselect');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Group_Select');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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


test("@DCCM_SIT_TC_0078,DCCM_SIT_TC_0079 @low Ensure while click on Groups name search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Group_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).pressSequentially("Group", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Group_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);

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


test("@DCCM_SIT_TC_0080 @low Ensure while search Invalid Groups name in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).pressSequentially("Kesav", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Group_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          

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
  
test("@DCCM_SIT_TC_0081 @low Ensure while click on clear all  filters in command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_SEARCH).pressSequentially("Kesav", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_GRID).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Clear_All_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);

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
  

  
test("@DCCM_SIT_TC_0082,DCCM_SIT_TC_0083 @low Ensure while click on toggle filter row in the command menu", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_GRID).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_GRID).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);

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


test("@DCCM_SIT_TC_0085 @low Ensure while click on deselect all check box in Role & Division tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_DESELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Deselect');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
          
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

  test("@DCCM_SIT_TC_0086 @low Ensure while click on select all check box in Role & Division tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_DESELECT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SELECT).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Deselect');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
          
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


test("@DCCM_SIT_TC_0087,DCCM_SIT_TC_0088 @low Ensure while click on select all check box in Role & Division tab", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).pressSequentially("Role", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
          
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


test("@DCCM_SIT_TC_0089 @low Ensure while search Invalid Role in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLE_SEARCH).pressSequentially("test123", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          //expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NO_ROLE_AVAILABLE).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  test("@DCCM_SIT_TC_0090,DCCM_SIT_TC_0091 @low Ensure while click on Division search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Division_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).pressSequentially("Demo", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Division_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
          
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

test("@DCCM_SIT_TC_0092 @low Ensure while search Invalid division in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Division_Search_Box_Focus');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).pressSequentially("Test1", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Division_Search_Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
          
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

test("@DCCM_SIT_TC_0095 @low Ensure while click on clear all  filters in command menu ", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_SEARCH).pressSequentially("Demo", { delay: 100 });
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Division_Search_Box');
          await sharedPage.locator(SELECTORS.AGENT_MIRRORAGENT_ROLE_GRID).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLEAR_ALL_FILTERS).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Clear_All_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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


test("@DCCM_SIT_TC_0096,DCCM_SIT_TC_0097 @low Ensure while click on toggle filter row in the command menu ", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role_Search_Box');
          await sharedPage.locator(SELECTORS.AGENT_MIRRORAGENT_ROLE_GRID).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.locator(SELECTORS.AGENT_MIRRORAGENT_ROLE_GRID).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_TOGGLE_FILTERS).click();
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Toggle_Filters_Command_Menu');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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


test("@DCCM_SIT_TC_0099 @low Ensure while apply the profile attributes details for bulk user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0099=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :",username0099);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0099?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0099?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_BULK_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).click();
          const DCCM_SIT_TC_0099 = faker.number.int({ min: 1, max: 5 }).toString();
          console.log("DCCM_SIT_TC_0099 Generated Skill Level is :",DCCM_SIT_TC_0099);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).fill(DCCM_SIT_TC_0099);
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Confirmation');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Apply_Confirmation');
          expect(await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY).isVisible());
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent() ?? '';
          console.log("History Current Value is :",historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0099));
          await sharedPage.waitForTimeout(2000);
          //expect(sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE)).toHaveText(DCCM_SIT_TC_0027);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
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

  test("@DCCM_SIT_TC_0100 @low Ensure while select Profile attributes and click on next button", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_BULK_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PROFILE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Profile_Attributes_Selected');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
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

test("@DCCM_SIT_TC_0101 @low Ensure while apply the profile attributes deatils for the user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_BULK_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PROFILE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Profile_Apply');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Apply_Confirmation');
          expect (await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY).isVisible());
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);


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


  test("@DCCM_SIT_TC_0102 @low Ensure while schedule the profile attributes details for the user", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_105 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_105);
          console.log('Job Name for DCCM_SIT_TC_105:', jobNameDCCM_SIT_TC_105);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_105);

          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          

          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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

//changed file
  
    test("@DCCM_SIT_TC_0106 @low Ensure while schedule the profile attributes deatils for bulk user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_SELECT_ALL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_105 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_105);
          console.log('Job Name for DCCM_SIT_TC_105:', jobNameDCCM_SIT_TC_105);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(100000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_105);


          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);


          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();
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



test("@DCCM_SIT_TC_0107 @low Ensure while click on Groups drop down", async ({ }, testInfo) => {
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
          await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).isEnabled());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Dropdown_enabled');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
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


test("@DCCM_SIT_TC_0108 @low Ensure while select any groups from drop down", async ({ }, testInfo) => {
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
          await sharedPage.waitForTimeout(2000);
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_MEMBER));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_MEMBER).click({ timeout: 5000 });
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Member_selection');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
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




  test("@DCCM_SIT_TC_0109 @low Ensure while select none from group drop down", async ({ }, testInfo) => {
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
          await sharedPage.waitForTimeout(2000);
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_NONE));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_NONE).click({ timeout: 5000 });
          await ScreenshotUtils.capture(sharedPage, testInfo, 'None_selection');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Apply_Confirmation');
          expect (await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_NONE).isVisible());
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CONFIRM_OK).click({ timeout: 2000 });
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForTimeout(1000);
          
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
  

  test("@DCCM_SIT_TC_0110 @low Ensure while select user and click on next button and click on apply button in mirror agent", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Confirmation');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click({ timeout: 5000 });
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Apply_Confirmation');
          expect (await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY).isVisible());
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

    test("@DCCM_SIT_TC_0129 @low Ensure while select none from group drop down", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_NONE));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_NONE).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.waitForLoadState('networkidle');
          expect (await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_SELECTGROUP).isVisible());
          
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ALERT_OK_BUTTON).click({ timeout: 2000 });
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CLOSE).click();
          await sharedPage.waitForLoadState('networkidle');
          await ScreenshotUtils.capture(sharedPage, testInfo, 'alert_handled');
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


  test("@DCCM_SIT_TC_0130 @low Ensure while apply the groups mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0130=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0130);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0130?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0130?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          const DCCM_SIT_TC_0130 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0130));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

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

    test("@DCCM_SIT_TC_0131 @low Ensure while apply the groups mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0131_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0131_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0131_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0131_1);
          console.log("Copied attribute name is :",username0131_2);
          console.log("Copied attribute name is :",username0131_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          const DCCM_SIT_TC_0131 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_SELECET_DESELECT_ALL).click();

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0131_1?.trim() || '');          
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue1 = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue1);
          expect(parseFloat(historyCurrentVAlue1)).toBe(parseFloat(DCCM_SIT_TC_0131));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0131_2?.trim() || '');          
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue2 = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue2);
          expect(parseFloat(historyCurrentVAlue2)).toBe(parseFloat(DCCM_SIT_TC_0131));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0131_3?.trim() || '');          
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue3 = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue3);
          expect(parseFloat(historyCurrentVAlue3)).toBe(parseFloat(DCCM_SIT_TC_0131));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();
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

    test("@DCCM_SIT_TC_0132 @low Ensure while schedule the groups mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0132=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0132);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0132?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0132?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          const DCCM_SIT_TC_0132 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0132 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0132);
          console.log('Job Name for DCCM_SIT_TC_0132:', jobNameDCCM_SIT_TC_0132);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0132);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0132?.trim() || '');          
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0132));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();
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

      test("@DCCM_SIT_TC_0133 @low Ensure while schedule the groups mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0132_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0132_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0132_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0132_1);
          console.log("Copied attribute name is :",username0132_2);
          console.log("Copied attribute name is :",username0132_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).click();
          const DCCM_SIT_TC_0133 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUPS_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0133 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0133);
          console.log('Job Name for DCCM_SIT_TC_0133:', jobNameDCCM_SIT_TC_0133);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0133);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);


          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0132_1?.trim() || '');          
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          expect(parseFloat(historyCurrentVAlue)).toBe(parseFloat(DCCM_SIT_TC_0133));
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

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

    test("@DCCM_SIT_TC_0134 @low Ensure while apply the phone mirror to the single agent", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0134=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0134);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0134?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0134?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).click();
          const DCCM_SIT_TC_0134 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0134);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          const jobNameDCCM_SIT_TC_0134 = faker.person.jobDescriptor();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_NAME).fill(jobNameDCCM_SIT_TC_0134);
          console.log('Phone Name for DCCM_SIT_TC_0134:', jobNameDCCM_SIT_TC_0134);
          await sharedPage.waitForTimeout(2000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
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

      test("@DCCM_SIT_TC_0135 @low Ensure while apply the phone mirror to the mutiple agents", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0135_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0135_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0135_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0135_1);
          console.log("Copied attribute name is :",username0135_2);
          console.log("Copied attribute name is :",username0135_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).click();
          const DCCM_SIT_TC_0135 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0135);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const jobNameDCCM_SIT_TC_0135 = faker.person.jobDescriptor();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_NAME).fill(jobNameDCCM_SIT_TC_0135);
          console.log('Phone Name for DCCM_SIT_TC_0135:', jobNameDCCM_SIT_TC_0135);
          await sharedPage.waitForTimeout(2000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          expect(historyCurrentVAlue).toContain(DCCM_SIT_TC_0135.trim());
          await sharedPage.waitForTimeout(2000);
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

    test("@DCCM_SIT_TC_0136 @low Ensure while schedule the phone mirror to the single agent", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0136=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0136);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0136?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0136?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).click();
          const DCCM_SIT_TC_0136 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0136);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const jobNameDCCM_SIT_TC_0136 = faker.person.jobDescriptor();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_NAME).fill(jobNameDCCM_SIT_TC_0136);
          console.log('Phone Name for DCCM_SIT_TC_0136:', jobNameDCCM_SIT_TC_0136);
          await sharedPage.waitForTimeout(2000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0133 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0133);
          console.log('Job Name for DCCM_SIT_TC_0133:', SCH_NameDCCM_SIT_TC_0133);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0133);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          
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


    test("@DCCM_SIT_TC_0137 @low Ensure while schedule the phone mirror to the mutiple agent", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0137_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0137_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0137_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0137_1);
          console.log("Copied attribute name is :",username0137_2);
          console.log("Copied attribute name is :",username0137_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).click();
          const DCCM_SIT_TC_0136 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0136);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const jobNameDCCM_SIT_TC_0137 = faker.person.jobDescriptor();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_NAME).fill(jobNameDCCM_SIT_TC_0137);
          console.log('Phone Name for DCCM_SIT_TC_0137:', jobNameDCCM_SIT_TC_0137);
          await sharedPage.waitForTimeout(2000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0137 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0137);
          console.log('Job Name for DCCM_SIT_TC_0137:', SCH_NameDCCM_SIT_TC_0137);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0137);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          
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

//DCCM as division in the mirror agent screen
  test("@DCCM_SIT_TC_0138 @low Ensure while apply the phone mirror with phone disable creation option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0136= DCCM_USERS.USER_1;
          console.log("Copied attribute name is :", username0136);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0136?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROP).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).click();
          const DCCM_SIT_TC_0136 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0136);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const jobNameDCCM_SIT_TC_0136 = faker.person.jobDescriptor();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_DISABLE_CREATION).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_PHONE_NAME).fill(jobNameDCCM_SIT_TC_0136);
          console.log('Phone Name for DCCM_SIT_TC_0136:', jobNameDCCM_SIT_TC_0136);
          await sharedPage.waitForTimeout(2000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0133 = faker.person.jobTitle();
           
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0133);
          console.log('Job Name for DCCM_SIT_TC_0133:', SCH_NameDCCM_SIT_TC_0133);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0133);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForTimeout(5000);
          
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

  test("@DCCM_SIT_TC_0139 @low Ensure while apply the roles mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0139=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0139);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0139?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0139?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          const DCCM_SIT_TC_0139 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_HISTORY_USER).click();
          await sharedPage.waitForTimeout(5000);

          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.HISTORY_PROP_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          expect(sharedPage.locator(historyCurrentVAlue)).toHaveText(DCCM_SIT_TC_0139);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

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

    test("@DCCM_SIT_TC_0140 @low Ensure while apply the roles mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0140_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0140_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0140_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0140_1);
          console.log("Copied attribute name is :",username0140_2);
          console.log("Copied attribute name is :",username0140_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          const DCCM_SIT_TC_0140 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).textContent() ?? '';
          console.log("Label is :",DCCM_SIT_TC_0140);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB).innerText() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB)).toContainText("Role");
          
          await sharedPage.waitForTimeout(2000);
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


    test("@DCCM_SIT_TC_0141 @low Ensure while schedule the roles mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0141=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0141);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0141?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          const DCCM_SIT_TC_0141 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0141);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);


          

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0141 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0141);
          console.log('Job Name for DCCM_SIT_TC_0141:', SCH_NameDCCM_SIT_TC_0141);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0141);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role-Scheduled-Job');
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          /* Report audit assert 
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB)).toContainText(DCCM_USERS.USER_1);
          
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
*/
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


      test("@DCCM_SIT_TC_0142 @low Ensure while schedule the roles mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0142_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0142_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0142_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0142_1);
          console.log("Copied attribute name is :",username0142_2);
          console.log("Copied attribute name is :",username0142_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).click();
          const DCCM_SIT_TC_0141 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_ROLES_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0141);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);          

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0141 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0141);
          console.log('Job Name for DCCM_SIT_TC_0141:', SCH_NameDCCM_SIT_TC_0141);
          await sharedPage.waitForTimeout(4000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(4000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(4000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0141);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Role-Scheduled-Job');
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          /* Report audit assert 
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB)).toContainText(DCCM_USERS.USER_1);
          
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
*/
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


     test("@DCCM_SIT_TC_0143 @low Ensure while apply the division mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0143=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0143);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0143?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).click();
          const DCCM_SIT_TC_0143 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0143);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          
          const DCCM_SIT_TC_0143_divName=await sharedPage.locator(SELECTORS.AGENT_MIRROR_AGENT_DIVISION_NAME).inputValue();
          console.log("Division Name: ",DCCM_SIT_TC_0143_divName);


          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          /*
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_MODIFIED)).toContainText(DCCM_SIT_TC_0143_divName);
          console.log("Division name is verified in audit report :",DCCM_SIT_TC_0143_divName);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_NAME)).toContainText(username0143?.trim() || '');
          console.log("Username is verified in audit report :",username0143);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB)).toContainText(DCCM_SIT_TC_0143);
          console.log("Property tab is verified in audit report :",DCCM_SIT_TC_0143);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_ACTION_TYPE_ROW_1)).toContainText("Deleted");
          console.log("Action type is verified in audit report : Deleted");
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_ACTION_TYPE_ROW_2)).toContainText("Added");
          console.log("Action type is verified in audit report : Added");
          */
          await sharedPage.waitForTimeout(2000);
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

     test("@DCCM_SIT_TC_0144 @low Ensure while apply the division mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0144_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0144_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0144_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0144_1);
          console.log("Copied attribute name is :",username0144_2);
          console.log("Copied attribute name is :",username0144_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).click();
          const DCCM_SIT_TC_0145 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0145);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          
          const DCCM_SIT_TC_0145_divName=await sharedPage.locator(SELECTORS.AGENT_MIRROR_AGENT_DIVISION_NAME).inputValue();
          console.log("Division Name: ",DCCM_SIT_TC_0145_divName);


          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_GROUP_UPDATED_SUCCESSFULLY).isVisible());
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          /*
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_MODIFIED)).toContainText(DCCM_SIT_TC_0143_divName);
          console.log("Division name is verified in audit report :",DCCM_SIT_TC_0143_divName);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_NAME)).toContainText(username0143?.trim() || '');
          console.log("Username is verified in audit report :",username0143);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB)).toContainText(DCCM_SIT_TC_0143);
          console.log("Property tab is verified in audit report :",DCCM_SIT_TC_0143);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_ACTION_TYPE_ROW_1)).toContainText("Deleted");
          console.log("Action type is verified in audit report : Deleted");
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_ACTION_TYPE_ROW_2)).toContainText("Added");
          console.log("Action type is verified in audit report : Added");
          */
          await sharedPage.waitForTimeout(2000);
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

    test("@DCCM_SIT_TC_0145 @low Ensure while schedule the division mirror for the single user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0145=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :",username0145);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0145?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("Using DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).click();
          const DCCM_SIT_TC_0145 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0145);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0145 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0145);
          console.log('Job Name for DCCM_SIT_TC_0145:', SCH_NameDCCM_SIT_TC_0145);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0145);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Div-Scheduled-Job');
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          /* Report audit assert 
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB)).toContainText(DCCM_USERS.USER_1);
          
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
*/
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


      test("@DCCM_SIT_TC_0146 @low Ensure while schedule the division mirror for the multiple user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0146_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0146_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0146_3=await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :",username0146_1);
          console.log("Copied attribute name is :",username0146_2);
          console.log("Copied attribute name is :",username0146_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRROR_AGENT).click({ timeout: 5000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_DROP).click({ timeout: 5000 });
          await scrollUntilVisible(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM));
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIV_OPTION_DCCM).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SEARCH).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          console.log("Using DCCM_USERS.USER_1 is :",DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).fill(DCCM_USERS.USER_1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH_INPUT).press('Enter');

          await sharedPage.waitForTimeout(5000);
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_LABEL1).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_NEXT_BUTTON).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILLS_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).click();
          const DCCM_SIT_TC_0146 = await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_DIVISION_LABEL).textContent() ?? '';
          await sharedPage.waitForTimeout(2000);
          console.log("Label is :",DCCM_SIT_TC_0146);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);

          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE).click();
          const SCH_NameDCCM_SIT_TC_0146 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME).fill(SCH_NameDCCM_SIT_TC_0146);
          console.log('Job Name for DCCM_SIT_TC_0146:', SCH_NameDCCM_SIT_TC_0146);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(60000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(5000);
          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(SCH_NameDCCM_SIT_TC_0146);
          

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Div-Scheduled-Job');
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          /* Report audit assert 
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const historyCurrentVAlue = await sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB).textContent() ?? '';
          console.log("History Current Value is :", historyCurrentVAlue);
          await expect(sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJECT_NAME_TAB)).toContainText(DCCM_USERS.USER_1);
          
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
*/
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


