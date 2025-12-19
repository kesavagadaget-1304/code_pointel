import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';
import { scrollUntilVisible } from '../../utils/scroll';

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


  test("@DCCM_SIT_TC_004 @low Ensure while select any division  from drop down", async ({ }, testInfo) => {
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


  test("@DCCM_SIT_TC_005 @low Ensure while click on user name search text box field", async ({ }, testInfo) => {
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


  test("@DCCM_SIT_TC_006 @low Ensure while enter values in User name search text box filed", async ({ }, testInfo) => {
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


  test("@DCCM_SIT_TC_007 @low Check the boundary value conditions in search text box filed", async ({ }, testInfo) => {
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


  test("@DCCM_SIT_TC_008 @low Ensure while search valid username in search text box field", async ({ }, testInfo) => {
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

   test("@DCCM_SIT_TC_009 @low Ensure while search Invalid username in search text box field", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT).fill("3");          
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click();
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(5000);
          expect (await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY).isVisible());
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


test("@DCCM_SIT_TC_0096,DCCM_SIT_TC_0097 @low Ensure while click on clear all  filters in command menu ", async ({ }, testInfo) => {
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY).click();
          await sharedPage.waitForTimeout(5000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Confirmation');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click();
          await sharedPage.waitForTimeout(7000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skills-Updated-Successfully');
          
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
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'ProfileConfirmation');

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


/*test("@DCCM_SIT_TC_0106 @low Ensure while schedule the profile attributes deatils for  bulk user", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.waitForTimeout(1000);
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
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULER_BUTTON).click();
          //await sharedPage.waitForTimeout(2000);
          expect(sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULER_JOB_TITLE).isEnabled());
          console.log("Scheduler is enabled");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Scheduler_enabled');
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SCHEDULER_JOB_TITLE).click(); //click not working
          await sharedPage.waitForTimeout(5000);
          //await ScreenshotUtils.capture(sharedPage, testInfo, 'Confirmation');
          //await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON).click({ timeout: 5000 });
          
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
          await sharedPage.waitForTimeout(2000);
          
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
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Confirmation_popup');
          //await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_CONFIRM_OK).click({ timeout: 2000 });
          
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


