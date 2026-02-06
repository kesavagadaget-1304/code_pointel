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

    test("@DCCM_SIT_TC_0009 @low Ensure while apply the template skills for the selected user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0009");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0009_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0009_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0009_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0009_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0009_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Skill updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                console.log('Skill updated message not visible yet.');
              } 
              await sharedPage.waitForTimeout(10000);
            } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
            }
            // If not found, wait 15 seconds before the next refresh attempt
            console.log('Job not ready yet. Waiting 15s before retry...');
            await sharedPage.waitForTimeout(15000);
          }





          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY)).toBeVisible();
          await sharedPage.reload();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          const DCCM_SIT_TC_0009_skill_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0009_skill_source_value).toBe(DCCM_SIT_TC_0009_Skill);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-skill-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0009");
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

    test("@DCCM_SIT_TC_0010 @low Ensure while apply the template skills for the selected user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0010");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0010_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0010_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0010_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0010_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0010_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Skill updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                console.log('Skill updated message not visible yet.');
              } 
              await sharedPage.waitForTimeout(10000);
            } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
            }
            // If not found, wait 15 seconds before the next refresh attempt
            console.log('Job not ready yet. Waiting 15s before retry...');
            await sharedPage.waitForTimeout(15000);
          }





          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY)).toBeVisible();
          await sharedPage.reload();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          const DCCM_SIT_TC_0010_skill_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0010_skill_source_value).toBe(DCCM_SIT_TC_0010_Skill);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-skill-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0010");
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

      test("@DCCM_SIT_TC_0013 @low Ensure while search valid skill name in skill search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0013");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0013_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0013_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0013_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0013_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0013_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0013_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          const searchedSkillName = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Searched Skill Name: " + searchedSkillName);
          await expect(DCCM_SIT_TC_0013_Skill).toBe(searchedSkillName);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-skill-searched');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0013");
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

        test("@DCCM_SIT_TC_0014 @low Ensure while search Invalid skill name in skill search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0014");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0014_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0014_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0014_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN_OPTION).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0014_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0014_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill("zzz123");
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NO_SKILL_AVAILABLE)).toBeVisible();
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1)).not.toBeVisible();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-no-skill-found');

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0013");
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