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
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0009_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0009_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          


          const maxAttempt = 15;
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_SKILL_TAB).click();
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
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0010_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0010_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_SKILL_TAB).click();
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

      test("@DCCM_SIT_TC_0011 @low Ensure while apply the template skills for the multiple user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0011");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0011_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0011_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0011_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0011_1);
          console.log("Copied attribute name is :", username0011_2);
          console.log("Copied attribute name is :", username0011_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0011_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0011_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
          
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_SKILL_TAB).click();
          const DCCM_SIT_TC_0011_skill_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0011_skill_source_value).toBe(DCCM_SIT_TC_0011_Skill);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-skill-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0011");
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

      test("@DCCM_SIT_TC_0012 @low Ensure while apply the template skills for the selected user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0012");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0012_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0012_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0012_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0012_1);
          console.log("Copied attribute name is :", username0012_2);
          console.log("Copied attribute name is :", username0012_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0012_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0012_Skill);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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

          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_SKILL_TAB).click();
          const DCCM_SIT_TC_0012_skill_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0012_skill_source_value).toBe(DCCM_SIT_TC_0012_Skill);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-skill-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0012");
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
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
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
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
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
          console.log("Completed test case DCCM_SIT_TC_0014");
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

      test("@DCCM_SIT_TC_0015 @low Ensure while schedule the template skills for the selected user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
        try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0015");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0015_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0015_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0015_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0015_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0015_Skill);
          
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0015 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0015);
          console.log('Job Name for DCCM_SIT_TC_0015:', jobNameDCCM_SIT_TC_0015);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(90000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
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
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0015);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0015");
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


        test("@DCCM_SIT_TC_0016 @low Ensure while schedule the template skills for the selected user with use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
          try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0016");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0016_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0016_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0016_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0016_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0016_Skill);
          
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0016 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0016);
          console.log('Job Name for DCCM_SIT_TC_0016:', jobNameDCCM_SIT_TC_0016);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0016, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0016)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0016, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0016)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0016);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0016");
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


          test("@DCCM_SIT_TC_0017 @low Ensure while schedule the template skills for the multiple user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
            try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0017");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0017_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0017_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0017_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0017_1);
          console.log("Copied attribute name is :", username0017_2);
          console.log("Copied attribute name is :", username0017_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();


          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0017_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0017_Skill);
          
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0017 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0017);
          console.log('Job Name for DCCM_SIT_TC_0017:', jobNameDCCM_SIT_TC_0017);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0017, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0017)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0017, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0017)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0017);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0017");
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


        test("@DCCM_SIT_TC_0018 @low Ensure while schedule the template skills for the multiple user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
          try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0018");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0018_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0018_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0018_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0018_1);
          console.log("Copied attribute name is :", username0018_2);
          console.log("Copied attribute name is :", username0018_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_SKILL_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0018_Skill= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1).innerText();
          console.log("Skill available in template: " + DCCM_SIT_TC_0018_Skill);
          
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0018 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0018);
          console.log('Job Name for DCCM_SIT_TC_0018:', jobNameDCCM_SIT_TC_0018);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0018, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0018)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0018, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0018)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0018);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0018");
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

    test("@DCCM_SIT_TC_0019 @low Ensure while apply the template languages for the selected user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0019");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0019_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0019_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0019_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0019_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0019_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
              else {                
                console.log('Skill updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0019_lang_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITLANGUAGE_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0019_lang_source_value).toBe(DCCM_SIT_TC_0019_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-applied');
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0019");
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


      test("@DCCM_SIT_TC_0020 @low Ensure while apply the template languages for the selected user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0020");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0020_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0020_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0020_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0020_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0020_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
              else {                
                console.log('Skill updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0020_lang_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITLANGUAGE_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0020_lang_source_value).toBe(DCCM_SIT_TC_0020_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0020");
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

    test("@DCCM_SIT_TC_0021 @low Ensure while apply the template languages for the multiple user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0021");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0021_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0021_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0021_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0021_1);
          console.log("Copied attribute name is :", username0021_2);
          console.log("Copied attribute name is :", username0021_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0021_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0021_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
              else {                
                console.log('Skill updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0021_lang_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITLANGUAGE_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0021_lang_source_value).toBe(DCCM_SIT_TC_0021_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0021");
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

      test("@DCCM_SIT_TC_0022 @low Ensure while apply the template languages for the multiple user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0022");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0022_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0022_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0022_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0022_1);
          console.log("Copied attribute name is :", username0022_2);
          console.log("Copied attribute name is :", username0022_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0022_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0022_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


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
              else {                
                console.log('Skill updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0022_lang_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITLANGUAGE_TAB_GRID_FIRST_CELL).innerText();
          await expect(DCCM_SIT_TC_0022_lang_source_value).toBe(DCCM_SIT_TC_0022_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0022");
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

test("@DCCM_SIT_TC_0023 @low Ensure while search valid languages name in languages search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0023");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0023_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0023_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0023_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0023_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0023_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0023_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          const searchedLangName = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Searched Language Name: " + searchedLangName);
          await expect(DCCM_SIT_TC_0023_Lang).toBe(searchedLangName);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0023");
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

  test("@DCCM_SIT_TC_0024 @low Ensure while search Invalid languages name in languages search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0024");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0024_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0024_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0024_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0024_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0024_Lang);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill("InvalidLanguageName");
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NO_LANGUAGE_AVAILABLE)).toBeVisible();
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1)).not.toBeVisible();

          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0024");
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


      test("@DCCM_SIT_TC_0025 @low Ensure while schedule the template languages for the selected user without use override option", async ({ }, testInfo) => {
    test.setTimeout(300000);
        try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0025");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0025_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0025_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0025_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0025_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0025_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0025 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0025);
          console.log('Job Name for DCCM_SIT_TC_0025:', jobNameDCCM_SIT_TC_0025);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0025, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0025)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0025, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0025)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0025);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0025");
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


        test("@DCCM_SIT_TC_0026 @low Ensure while schedule the template languages for the selected user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
          try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0026");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0026_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0026_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0026_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0026_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0026_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0026 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0026);
          console.log('Job Name for DCCM_SIT_TC_0026:', jobNameDCCM_SIT_TC_0026);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0026, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0026)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0026, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0026)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0026);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0026");
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


  test("@DCCM_SIT_TC_0027 @low Ensure while schedule the template languages for the multiple user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0027");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0027_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0027_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0027_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0027_1);
          console.log("Copied attribute name is :", username0027_2);
          console.log("Copied attribute name is :", username0027_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0027_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0027_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0027 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0027);
          console.log('Job Name for DCCM_SIT_TC_0027:', jobNameDCCM_SIT_TC_0027);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0027, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0027)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0027, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0027)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0027);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0027");
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



      test("@DCCM_SIT_TC_0028 @low Ensure while schedule  the template languages for the multiple user with use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
        try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0028");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0028_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0028_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0028_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0028_1);
          console.log("Copied attribute name is :", username0028_2);
          console.log("Copied attribute name is :", username0028_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0028_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1).innerText();
          console.log("Language available in template: " + DCCM_SIT_TC_0028_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-language-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0028 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0028);
          console.log('Job Name for DCCM_SIT_TC_0028:', jobNameDCCM_SIT_TC_0028);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0028, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0028)) {
                      console.log('Success! Job found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0028, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0028)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0028);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0028");
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


    test("@DCCM_SIT_TC_0029 @low Ensure while apply the template Queues for the selected user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0029");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0029_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0029_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0029_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0029_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0029_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0029_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0029_queue_source_value);
          await expect(DCCM_SIT_TC_0029_queue_source_value).toBe(DCCM_SIT_TC_0029_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0029");
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



      test("@DCCM_SIT_TC_0030 @low Ensure while apply the template Queues for the selected user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0030");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0030_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0030_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0030_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0030_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0030_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is checked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0030_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0030_queue_source_value);
          await expect(DCCM_SIT_TC_0030_queue_source_value).toBe(DCCM_SIT_TC_0030_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0030");
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



    test("@DCCM_SIT_TC_0031 @low Ensure while apply the template Queues for the multiple user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0031");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0031_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0031_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0031_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0031_1);
          console.log("Copied attribute name is :", username0031_2);
          console.log("Copied attribute name is :", username0031_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0031_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0031_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0031_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0031_queue_source_value);
          await expect(DCCM_SIT_TC_0031_queue_source_value).toBe(DCCM_SIT_TC_0031_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0031");
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


      test("@DCCM_SIT_TC_0032 @low Ensure while apply the template Queues for the multiple user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0032");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0032_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0032_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0032_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0032_1);
          console.log("Copied attribute name is :", username0032_2);
          console.log("Copied attribute name is :", username0032_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0032_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0032_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0032_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0032_queue_source_value);
          await expect(DCCM_SIT_TC_0032_queue_source_value).toBe(DCCM_SIT_TC_0032_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0032");
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


test("@DCCM_SIT_TC_0033 @low Ensure while search valid Queues name in Queues search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0033");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0033_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0033_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0033_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0033_Queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0033_Queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0033_Queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          const searchedQueueName = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Searched Queue Name: " + searchedQueueName);
          await expect(DCCM_SIT_TC_0033_Queue).toBe(searchedQueueName);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-searched');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0033");
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

  test("@DCCM_SIT_TC_0034 @low Ensure while search Invalid Queues  name in languages search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0034");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0034_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0034_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0034_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0034_Queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0034_Queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).fill("InvalidQueueName");
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_NO_QUEUES_AVAILABLE)).toBeVisible();
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1)).not.toBeVisible();

          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-searched');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_CLOSE).click();
          await sharedPage.waitForTimeout(5000);

          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0034");
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
         

      test("@DCCM_SIT_TC_0035 @low Ensure while schedule the template Queues for the selected user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
        try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0035");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0035_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0035_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0035_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0035_Queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0035_Queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0035 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0035);
          console.log('Job Name for DCCM_SIT_TC_0035:', jobNameDCCM_SIT_TC_0035);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0035, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0035)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0035, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0035)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0035);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Queue-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0035");
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


        test("@DCCM_SIT_TC_0036 @low Ensure while apply the template Queues for the selected user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0036");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0036_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0036_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0036_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0036_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0036_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if (!(await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is checked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0036_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0036_queue_source_value);
          await expect(DCCM_SIT_TC_0036_queue_source_value).toBe(DCCM_SIT_TC_0036_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0036");
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


test("@DCCM_SIT_TC_0037 @low Ensure while schedule the template Queues for the multiple user without use override option", async ({ }, testInfo) => {
   test.setTimeout(300000); 
  try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0037");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0037_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0037_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0037_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0037_1);
          console.log("Copied attribute name is :", username0037_2);
          console.log("Copied attribute name is :", username0037_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          const DCCM_SIT_TC_0037_Lang= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0037_Lang);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-searched');



          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
          await sharedPage.waitForTimeout(2000);


          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX).click();
          console.log("Checking if the Checkbox is unchecked");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Override-Option-Checked');
          }

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
          const jobNameDCCM_SIT_TC_0037 = faker.person.jobTitle();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0037);
          console.log('Job Name for DCCM_SIT_TC_0037:', jobNameDCCM_SIT_TC_0037);
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
          const time = getTimeAfterMinutes(1);
          await sharedPage.waitForTimeout(1000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'AGENT');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
          console.log('Scheduled job successfully. Wait for its completion...');
          await sharedPage.waitForTimeout(10000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_ICON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);

          
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();

          const maxAttempt = 5;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(10000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0037, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isHidden()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0037)) {
                      console.log('Success! Job not found in Current status:', text);
                      jobnotFound = false;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(1000);

          const maxAttempts = 12;
          let jobFound = false;

          for (let i = 0; i < maxAttempts; i++) {
              console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
              try {
              // Wait a moment for the grid to refresh
              await sharedPage.waitForTimeout(5000);
              
              // Apply the Job Name filter again if the grid cleared it
              const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER);
              await jobNameFilter.fill(jobNameDCCM_SIT_TC_0037, { timeout: 10000 });
              await sharedPage.keyboard.press('Enter');
              await sharedPage.waitForTimeout(3000);

              // Check if the job is now visible in the grid
              const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATE);
              if (await validatedJob.isVisible()) {
                  const text = (await validatedJob.innerText()).trim();
                  if (text.includes(jobNameDCCM_SIT_TC_0037)) {
                      console.log('Success! Job found in Completed status:', text);
                      jobFound = true;
                      break; // Exit the loop early if found
                  }
              }
              await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTER).clear({ timeout: 5000 });
              } catch (e) {
            console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
        }
              // If not found, wait 15 seconds before the next refresh attempt
              console.log('Job not ready yet. Waiting 15s before retry...');
              await sharedPage.waitForTimeout(15000);
          }

          const text = await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE).innerText();
          console.log('Completed Scheduled Job:', text);
          expect(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_VALIDATE)).toHaveText(jobNameDCCM_SIT_TC_0037);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
                    
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0037");
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


      test("@DCCM_SIT_TC_0038 @low Ensure while apply the template Queues for the multiple user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0038");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0038_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0038_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0038_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0038_1);
          console.log("Copied attribute name is :", username0038_2);
          console.log("Copied attribute name is :", username0038_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_QUEUE_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0038_queue= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_AVAILABLE_IN_ROW_1).innerText();
          console.log("Queue available in template: " + DCCM_SIT_TC_0038_queue);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_QUEUE_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0038_queue_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITQUEUE_TAB_GRID_FIRST_CELL).innerText();
          console.log("Queue available in user edit page: " + DCCM_SIT_TC_0038_queue_source_value);
          await expect(DCCM_SIT_TC_0038_queue_source_value).toBe(DCCM_SIT_TC_0038_queue);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-queue-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0038");
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

    test("@DCCM_SIT_TC_0039 @low Ensure while apply the template Utilization values for the selected user", async ({ }, testInfo) => {
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0039");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const username0055=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0055);
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0055?.trim() || '');
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Utilization template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN8);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("message", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIATYPE).click();
          const utilInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIA_INPUT);
          await utilInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0039_Util = (await utilInput.innerText()).trim();
          console.log("Utilization available in template: " + DCCM_SIT_TC_0039_Util);
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          const applyOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await applyOverlay.waitFor({ state: 'visible' });
          await applyOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(3000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Utilization updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Utilization updated message not visible yet.');
              } 
              await sharedPage.waitForTimeout(10000);
            } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
            }
            // If not found, wait 15 seconds before the next refresh attempt
            console.log('Agent Update not ready yet. Waiting 15s before retry...');
            await sharedPage.waitForTimeout(15000);
          }
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const propFilter = sharedPage.locator(SELECTORS.AGENT_HISTORY_PROPNAME);
          await propFilter.click({ force: true });
          await propFilter.waitFor({ state: 'visible', timeout: 30000 });
          await propFilter.fill(DCCM_SIT_TC_0039_Util);
          await sharedPage.keyboard.press('Enter');
          await sharedPage.waitForTimeout(2000); 
          const action_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_HISTORY_USER_NOTES).first().innerText();
            console.log(`Detected Status: ${action_value.trim()}`);
            try{
            if (action_value?.includes('Changes Applied by Template')) {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'History_Div_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Changes Applied by Template' but found: '${action_value}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(action_value).toContain('Changes Applied by Template');
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

  test("@DCCM_SIT_TC_0040 @low Ensure while Schedule the template Utilization values for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0040");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const username0056=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0056);
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0056?.trim() || '');
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Utilization template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN8);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("email", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIATYPE).click();
          const utilInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIA_INPUT);
          await utilInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0040_Util = (await utilInput.innerText()).trim();
          console.log("Utilization available in template: " + DCCM_SIT_TC_0040_Util);await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0040 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0040);
            console.log('Job Name for DCCM_SIT_TC_0040:', jobNameDCCM_SIT_TC_0040);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0040, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0040)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0040, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0040)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const propFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOB_PROPNAME);
            await propFilter.click({ force: true });
            await propFilter.waitFor({ state: 'visible', timeout: 30000 });
            await propFilter.fill(DCCM_SIT_TC_0040_Util);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Success') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Success' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Success', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

 test("@DCCM_SIT_TC_0041 @low Ensure while apply the template Utilization values for the multiple users", async ({ }, testInfo) => {
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0041");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.waitForLoadState('load');
                    await sharedPage.waitForLoadState('domcontentloaded');
                    await sharedPage.waitForTimeout(2000);
                    const username0041_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0041_1);
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    const username0041_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
                    console.log("Copied attribute name is :",username0041_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Utilization template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN8);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("call", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIATYPE).click();
          const utilInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIA_INPUT);
          await utilInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0040_Util = (await utilInput.innerText()).trim();
          console.log("Utilization available in template: " + DCCM_SIT_TC_0040_Util);
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          const applyOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await applyOverlay.waitFor({ state: 'visible' });
          await applyOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.waitForTimeout(5000);
          await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const objFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOB_PROPNAME);
            await objFilter.click({ force: true });
            await objFilter.waitFor({ state: 'visible', timeout: 30000 });
            await objFilter.fill(DCCM_SIT_TC_0040_Util);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const propTab = sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB).first();
            const propText = await propTab.innerText();
            console.log(`Detected Status: ${propText}`);
            const userNote = sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_USER_NOTES).first();
            const actualText = await userNote.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Changes Applied by Template - Utilization template') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Changes Applied by Template - Utilization template' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(userNote).toHaveText('Changes Applied by Template - Utilization template', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

  test("@DCCM_SIT_TC_0042 @low Ensure while schedule the template divisions for the multiple user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0042");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.waitForLoadState('load');
                    await sharedPage.waitForLoadState('domcontentloaded');
                    await sharedPage.waitForTimeout(2000);
                    const username0057_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0057_1);
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    const username0057_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
                    console.log("Copied attribute name is :",username0057_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Utilization template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN8);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("email", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIATYPE).click();
          const utilInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTIL_MEDIA_INPUT);
          await utilInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0041_Util = (await utilInput.innerText()).trim();
          console.log("Utilization available in template: " + DCCM_SIT_TC_0041_Util);
          await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0041 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0041);
            console.log('Job Name for DCCM_SIT_TC_0041:', jobNameDCCM_SIT_TC_0041);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0041, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0041)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0041, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0041)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const propFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOB_PROPNAME);
            await propFilter.click({ force: true });
            await propFilter.waitFor({ state: 'visible', timeout: 30000 });
            await propFilter.fill(DCCM_SIT_TC_0041_Util);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Success') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Success' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Success', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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



   test("@DCCM_SIT_TC_0043 @low Ensure while search valid Media type name in media type search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0043");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("chat", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'No_Data_Util');
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForLoadState('networkidle');
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

  
   test("@DCCM_SIT_TC_0044 @low Ensure while search Invalid Media type name in media type search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0044");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("test123", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'No_Data_Util');
          await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
          await sharedPage.waitForLoadState('networkidle');
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

    test("@DCCM_SIT_TC_0045 @low Ensure while apply the template Groups for the selected user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0045");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0045_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0045_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0045_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0045_groups= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_AVAILABLE_IN_ROW_1).innerText();
          console.log("Group available in template: " + DCCM_SIT_TC_0045_groups);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0045_group_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITGROUPS_TAB_GRID_FIRST_CELL).innerText();
          console.log("Group available in user edit page: " + DCCM_SIT_TC_0045_group_source_value);
          await expect(DCCM_SIT_TC_0045_group_source_value).toBe(DCCM_SIT_TC_0045_groups);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-group-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0045");
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
  

      test("@DCCM_SIT_TC_0046 @low Ensure while apply the template Groups  for the selected user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0046");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0046_username = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Username is :", DCCM_SIT_TC_0046_username);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(DCCM_SIT_TC_0046_username?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();

          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0046_groups= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_AVAILABLE_IN_ROW_1).innerText();
          console.log("Group available in template: " + DCCM_SIT_TC_0046_groups);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0046_group_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITGROUPS_TAB_GRID_FIRST_CELL).innerText();
          console.log("Group available in user edit page: " + DCCM_SIT_TC_0046_group_source_value);
          await expect(DCCM_SIT_TC_0046_group_source_value).toBe(DCCM_SIT_TC_0046_groups);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-group-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0046");
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


    test("@DCCM_SIT_TC_0047 @low Ensure while apply the template Groups for the multiple user without use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0047");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0047_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0047_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0047_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0047_1);
          console.log("Copied attribute name is :", username0047_2);
          console.log("Copied attribute name is :", username0047_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0047_groups= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_AVAILABLE_IN_ROW_1).innerText();
          console.log("Groups available in template: " + DCCM_SIT_TC_0047_groups);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(1000);

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0047_1?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0047_groups_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITGROUPS_TAB_GRID_FIRST_CELL).innerText();
          console.log("Groups available in user edit page: " + DCCM_SIT_TC_0047_groups_source_value);
          await expect(DCCM_SIT_TC_0047_groups_source_value).toBe(DCCM_SIT_TC_0047_groups);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-groups-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0047");

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


      test("@DCCM_SIT_TC_0048 @low Ensure while apply the template Groups  for the multiple user with use override option", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'DCCM - Template',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0048");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();          
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const username0048_1 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          const username0048_2 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
          const username0048_3 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME3_COPY).textContent();
          console.log("Copied attribute name is :", username0048_1);
          console.log("Copied attribute name is :", username0048_2);
          console.log("Copied attribute name is :", username0048_3);

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX3).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();

          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-visible');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(5000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0048_groups= await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_AVAILABLE_IN_ROW_1).innerText();
          console.log("Groups available in template: " + DCCM_SIT_TC_0048_groups);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          
          console.log("Checking if the Checkbox is visible and checked or not");
          await expect(sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX), `${SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX} should be visible`).toBeVisible();
          if ((await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).isChecked())) {
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_CHECKBOX).click();
          await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'checkbox-validate');
          console.log("Checkbox is unchecked");
          }
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(1000);


          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(5000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Queue updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Queue updated message not visible yet.');
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
          await sharedPage.waitForTimeout(1000);

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0048_1?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).click();
          await sharedPage.locator(SELECTORS.AGENTS_USEREDIT_GROUPS_TAB).click();
          await sharedPage.waitForTimeout(2000);
          const DCCM_SIT_TC_0048_groups_source_value = await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_EDITGROUPS_TAB_GRID_FIRST_CELL).innerText();
          console.log("Groups available in user edit page: " + DCCM_SIT_TC_0048_groups_source_value);
          await expect(DCCM_SIT_TC_0048_groups_source_value).toBe(DCCM_SIT_TC_0048_groups);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'dashboard-template-page-groups-applied');
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_CLOSE_BUTTON).click();
          await sharedPage.waitForTimeout(5000);
          
          await sharedPage.locator(SELECTORS.DCCM_DASHBOARD).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          console.log("Completed test case DCCM_SIT_TC_0048");

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


      test("@DCCM_SIT_TC_0049 @low Ensure while search valid groups name in groups search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0049");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();          
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('Group Template');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("cms_kavin_sit_0002", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Template_Valid_Group');
          await sharedPage.waitForLoadState('networkidle');
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


    test("@DCCM_SIT_TC_0050 @low Ensure while search invalid groups name in groups search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0050");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('Group Template');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("test123", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Template_inValid_Group');
          await sharedPage.waitForLoadState('networkidle');
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

 test("@DCCM_SIT_TC_0051 @low Ensure while schedule the template groups for the selected user without use override option", async ({ }, testInfo) => {
   test.setTimeout(300000);  
  try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0051");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Group Template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("cms_kavin_sit_0001", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUP_NAME_CHECKBOX).click();
          await sharedPage.waitForTimeout(3000);
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0051 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0051);
            console.log('Job Name for DCCM_SIT_TC_0051:', jobNameDCCM_SIT_TC_0051);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            //await sharedPage.waitForTimeout(7000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0051, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0051)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0051, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0051)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'updated succesfully') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'updated succesfully' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('updated succesfully', { timeout: 1000 });
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

 test("@DCCM_SIT_TC_0052 @low Ensure while schedule the template groups for the selected user with use override option", async ({ }, testInfo) => {
   test.setTimeout(300000);  
  try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0052");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Group Template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("cms_kavin_sit_0002", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUP_NAME_CHECKBOX).click();
          await sharedPage.waitForTimeout(3000);
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_OVERRIDE).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0052 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0052);
            console.log('Job Name for DCCM_SIT_TC_0052:', jobNameDCCM_SIT_TC_0052);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.waitForTimeout(5000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0052, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0052)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0052, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0052)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'updated succesfully') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'updated succesfully' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('updated succesfully', { timeout: 1000 });
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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


   test("@DCCM_SIT_TC_0053 @low Ensure while schedule the template groups for the multiple user without use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0053");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
                    await expect(userNameFilter).toBeVisible({ timeout: 50000 });
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser@gmail.com", { delay: 100 });
                    await sharedPage.waitForTimeout(5000);
                    const username0053_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Copied attribute name is :",username0053_1);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).clear();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser2@gmail.com", { delay: 100 });
                    await sharedPage.waitForTimeout(3000);
                    const username0053_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Copied attribute name is :",username0053_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).clear();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser", { delay: 100 });
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Group Template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("cms_kavin_sit_0002", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUP_NAME_CHECKBOX).click();
          await sharedPage.waitForTimeout(3000);
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0053 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0053);
            console.log('Job Name for DCCM_SIT_TC_0053:', jobNameDCCM_SIT_TC_0053);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.waitForTimeout(5000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0053, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0053)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0053, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0053)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'updated succesfully') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'updated succesfully' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('updated succesfully', { timeout: 1000 });
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

   test("@DCCM_SIT_TC_0054 @low Ensure while schedule the template groups for the multiple user with use override option", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0054");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
                    await expect(userNameFilter).toBeVisible({ timeout: 50000 });
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser@gmail.com", { delay: 100 });
                    await sharedPage.waitForTimeout(5000);
                    const username0053_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Copied attribute name is :",username0053_1);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).clear();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser2@gmail.com", { delay: 100 });
                    await sharedPage.waitForTimeout(3000);
                    const username0053_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Copied attribute name is :",username0053_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).clear();
                    await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser", { delay: 100 });
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_GROUPS_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Group Template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER).pressSequentially("cms_kavin_sit_0002", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUP_NAME_CHECKBOX).click();
          await sharedPage.waitForTimeout(3000);
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_OVERRIDE).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click(); 
            const jobNameDCCM_SIT_TC_0053 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0053);
            console.log('Job Name for DCCM_SIT_TC_0053:', jobNameDCCM_SIT_TC_0053);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.waitForTimeout(5000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0053, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0053)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0053, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0053)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'updated succesfully') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'updated succesfully' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('updated succesfully', { timeout: 1000 });
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

  test("@DCCM_SIT_TC_0055 @low Ensure while apply the template divisions for the selected user", async ({ }, testInfo) => {
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0055");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const username0055=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0055);
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0055?.trim() || '');
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Division template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN7);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const divisionInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_INPUT);
          await divisionInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0055_Div = (await divisionInput.innerText()).trim();
          console.log("Division available in template: " + DCCM_SIT_TC_0055_Div);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          const applyOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await applyOverlay.waitFor({ state: 'visible' });
          await applyOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          const maxAttempt = 10;
          let jobnotFound = true;
          for (let i = 0; i < maxAttempt; i++) {
            console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
            await sharedPage.waitForTimeout(3000);
            try {
              // Check if the message is now visible
              
              if (await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY).isVisible({ timeout: 10000 })) {
                console.log('Success! Division updated message is visible');
                jobnotFound = false;
                break; // Exit the loop early if found
              }
              else {                
                console.log('Division updated message not visible yet.');
              } 
              await sharedPage.waitForTimeout(10000);
            } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
            }
            // If not found, wait 15 seconds before the next refresh attempt
            console.log('Agent Update not ready yet. Waiting 15s before retry...');
            await sharedPage.waitForTimeout(15000);
          }
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const propFilter = sharedPage.locator(SELECTORS.AGENT_HISTORY_PROPNAME);
          await propFilter.click({ force: true });
          await propFilter.waitFor({ state: 'visible', timeout: 30000 });
          await propFilter.fill(DCCM_SIT_TC_0055_Div);
          await sharedPage.keyboard.press('Enter');
          await sharedPage.waitForTimeout(2000); 
          const action_value = await sharedPage.locator(SELECTORS.AGENT_HISTORY_ACTION_TYPE).first().innerText();
            console.log(`Detected Status: ${action_value.trim()}`);
            try{
            if (action_value === 'Added') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'History_Div_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Added' but found: '${action_value}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(action_value).toBe('Added');
            }}
            finally {
            
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

  test("@DCCM_SIT_TC_0056 @low Ensure while schedule the template divisions for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0056");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(2000);
                    const username0056=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0056);
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(username0056?.trim() || '');
                    await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.waitForTimeout(2000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Division template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN7);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const divisionInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_INPUT);
          await divisionInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0056_Div = (await divisionInput.innerText()).trim();
          console.log("Division available in template: " + DCCM_SIT_TC_0056_Div);
          await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0056 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0056);
            console.log('Job Name for DCCM_SIT_TC_0064:', jobNameDCCM_SIT_TC_0056);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0056, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0056)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0056, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0056)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const propFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOB_PROPNAME);
            await propFilter.click({ force: true });
            await propFilter.waitFor({ state: 'visible', timeout: 30000 });
            await propFilter.fill(DCCM_SIT_TC_0056_Div);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Success') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Success' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Success', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

    test("@DCCM_SIT_TC_0057 @low Ensure while apply the template divisions for the multiple user", async ({ }, testInfo) => {
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0057");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.waitForLoadState('load');
                    await sharedPage.waitForLoadState('domcontentloaded');
                    await sharedPage.waitForTimeout(2000);
                    const username0057_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0057_1);
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    const username0057_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
                    console.log("Copied attribute name is :",username0057_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Division template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN7);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const divisionInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_INPUT);
          await divisionInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0057_Div = (await divisionInput.innerText()).trim();
          console.log("Division available in template: " + DCCM_SIT_TC_0057_Div);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_APPLY_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON).click();
          const applyOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await applyOverlay.waitFor({ state: 'visible' });
          await applyOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.waitForTimeout(5000);
          await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_AUDIT).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Skill-Search-Box');
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForTimeout(5000);
          const objFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_OBJ_NAME_SEARCH);
            await objFilter.click({ force: true });
            await objFilter.waitFor({ state: 'visible', timeout: 30000 });
            await objFilter.fill(DCCM_SIT_TC_0057_Div);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const propTab = sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_PROP_TAB).first();
            const propText = await propTab.innerText();
            console.log(`Detected Status: ${propText}`);
            const userNote = sharedPage.locator(SELECTORS.AGENTS_REPORT_AUDIT_USER_NOTES).first();
            const actualText = await userNote.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Changes Applied by Template - Division template') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Changes Applied by Template - Division template' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(userNote).toHaveText('Changes Applied by Template - Division template', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

  test("@DCCM_SIT_TC_0058 @low Ensure while schedule the template divisions for the multiple user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
        await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0058");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
         await sharedPage.waitForLoadState('networkidle');
                    const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
                    await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("CM Div", { delay: 100 });
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CMdiv_CHECKBOX).click();
                    await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
                    await sharedPage.waitForTimeout(2000);
                    await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.waitForLoadState('load');
                    await sharedPage.waitForLoadState('domcontentloaded');
                    await sharedPage.waitForTimeout(2000);
                    const username0057_1=await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
                    console.log("Username is :",username0057_1);
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    const username0057_2=await sharedPage.locator(SELECTORS.AGENTS_USERNAME2_COPY).textContent();
                    console.log("Copied attribute name is :",username0057_2);
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX2).click();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'User-Select-Box-Click');
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Division template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN7);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const divisionInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_INPUT);
          await divisionInput.waitFor({ state: 'visible', timeout: 15000 });
          const DCCM_SIT_TC_0058_Div = (await divisionInput.innerText()).trim();
          console.log("Division available in template: " + DCCM_SIT_TC_0058_Div);
          await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0058 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0058);
            console.log('Job Name for DCCM_SIT_TC_0058:', jobNameDCCM_SIT_TC_0058);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0058, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0058)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0058, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0058)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const propFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOB_PROPNAME);
            await propFilter.click({ force: true });
            await propFilter.waitFor({ state: 'visible', timeout: 30000 });
            await propFilter.fill(DCCM_SIT_TC_0058_Div);
            await sharedPage.keyboard.press('Enter');
            await sharedPage.waitForTimeout(2000); 
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Success') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Success' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Success', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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

   test("@DCCM_SIT_TC_0059 @low Ensure while search Valid divisions name in divisions search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0059");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const objectNameFilter = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SEARCH_INPUT);
          await objectNameFilter.waitFor({ state: 'visible', timeout: 30000 });
          await objectNameFilter.focus();
          await objectNameFilter.click({timeout:5000});
          await objectNameFilter.pressSequentially("cms_report", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Template_Valid_Division');
          await sharedPage.waitForLoadState('networkidle');
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


   test("@DCCM_SIT_TC_0060 @low Ensure while search Invalid divisions name in divisions search text box field", async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0060");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          const objectNameFilter = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SEARCH_INPUT);
          await objectNameFilter.waitFor({ state: 'visible', timeout: 30000 });
          await objectNameFilter.focus();
          await objectNameFilter.click({timeout:5000});
          await objectNameFilter.pressSequentially("test123", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await ScreenshotUtils.capture(sharedPage, testInfo, 'Template_Valid_Division');
          await sharedPage.waitForLoadState('networkidle');
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


   test("@DCCM_SIT_TC_0061 @low Ensure while schedule the template skill level value for the selected user having same skill level", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0061");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).pressSequentially("2kskill", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_NAME_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).waitFor({ state: 'visible', timeout: 30000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0061 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0061);
            console.log('Job Name for DCCM_SIT_TC_0061:', jobNameDCCM_SIT_TC_0061);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0061, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0061)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0061, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0061)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toContainText('Failed to update same skill level might already available', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');
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


  test("@DCCM_SIT_TC_0062 @low Ensure while schedule the template language level value for the selected user having same language level", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0062");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).waitFor({ state: 'visible', timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILL_SEARCH_FILTER).pressSequentially("006_Language", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0062 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0062);
            console.log('Job Name for DCCM_SIT_TC_0062:', jobNameDCCM_SIT_TC_0062);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0062, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0062)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0062, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0062)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toHaveText('Failed to update same language level might already available', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');

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


  test("@DCCM_SIT_TC_0063 @low Ensure while schedule the template utilization level value for the selected user having same utilization level", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0063");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).waitFor({ state: 'visible', timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH).pressSequentially("chat", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_MEDIA_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0063 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0063);
            console.log('Job Name for DCCM_SIT_TC_0063:', jobNameDCCM_SIT_TC_0063);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0063, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0063)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0063, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0063)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toHaveText('Failed, same value already available.', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');

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

  test("@DCCM_SIT_TC_0064 @low Ensure while schedule the template division value for the selected user having same division", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0064");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.fill('CMS_UT_TEMPLATE');
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).waitFor({ state: 'visible', timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_LANGUAGE_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_QUEUES_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_UTILIZATION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_GROUPS_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_ARROW_AFTER).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SELECT).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SKILLS_CHECKBOX).click({ timeout: 3000 });
          const objectNameFilter = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_SEARCH_INPUT);
          await objectNameFilter.waitFor({ state: 'visible', timeout: 30000 });
          await objectNameFilter.focus();
          await objectNameFilter.click({timeout:5000});
          await objectNameFilter.pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DIVISION_CHECKBOX).click();
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0064 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0064);
            console.log('Job Name for DCCM_SIT_TC_0064:', jobNameDCCM_SIT_TC_0064);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0064, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0064)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0064, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0064)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Failed, Apply and current values are same') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Failed, Apply and current values are same' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Failed, Apply and current values are same', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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


  test("@DCCM_SIT_TC_0065 @low Ensure while schedule the Invalid template skill level value for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0065");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("skill delete template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN2);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0065 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0065);
            console.log('Job Name for DCCM_SIT_TC_0065:', jobNameDCCM_SIT_TC_0065);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            //await sharedPage.waitForTimeout(7000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0065, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0065)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0065, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0065)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toHaveText('Failed, skill not available', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');

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


  test("@DCCM_SIT_TC_0066 @low Ensure while schedule the Invalid template language level value for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0066");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("language delete template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN3);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0066 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0066);
            console.log('Job Name for DCCM_SIT_TC_0066:', jobNameDCCM_SIT_TC_0066);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            //await sharedPage.waitForTimeout(7000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0066, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0066)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0066, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0066)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toHaveText('Failed language not available', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');

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


  test("@DCCM_SIT_TC_0067 @low Ensure while schedule the Invalid template Queue for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0067");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("Queue delete template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN4);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0067 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0067);
            console.log('Job Name for DCCM_SIT_TC_0067:', jobNameDCCM_SIT_TC_0067);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            //await sharedPage.waitForTimeout(7000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0067, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0067)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0067, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0067)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            await expect(statusCell).toHaveText('Failed to Add, person already  available or queue not available', { timeout: 30000 });
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.waitForTimeout(5000);
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForTimeout(1000);
            await sharedPage.waitForLoadState('networkidle');

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


    test("@DCCM_SIT_TC_0068 @low Ensure while schedule the Invalid template group for the selected user", async ({ }, testInfo) => {
     test.setTimeout(300000);
      try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0068");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          const DashboardFilter = sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK);
          await expect(DashboardFilter).toBeVisible({ timeout: 40000 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_FILTER_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_CLICK).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).focus();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_INPUT).pressSequentially("DCCM", { delay: 100 });
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_ALL_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_BACKDROP_CLICK).click({ force: true });
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click();
          await sharedPage.waitForTimeout(2000);
          await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE).click();
          await sharedPage.waitForTimeout(2000);
          const userNameFilter = sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH);
          await expect(userNameFilter).toBeVisible({ timeout: 50000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).click();
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).focus();
          await sharedPage.locator(SELECTORS.AGENTS_MIRRORAGENT_USERNAME_SEARCH).pressSequentially("cmstestuser4@gmail.com", { delay: 100 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_MORE_ICON).click();
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE).click({ timeout: 10000 });
          await sharedPage.waitForTimeout(3000);
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_PAGE_TITLE).isVisible(); 
          await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_DROPDOWN).click();
          await sharedPage.waitForTimeout(2000);
          const searchInput = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION);
          await searchInput.waitFor({ state: 'visible', timeout: 30000 });
          await searchInput.pressSequentially("group delete template", { delay: 100 });
          await sharedPage.waitForTimeout(2000);
          const option = sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN5);
          await option.waitFor({ state: 'visible', timeout: 30000 });
          await option.click();
          const progressOverlay = sharedPage.locator('text=Please wait while we are applying changes');
          await progressOverlay.waitFor({ state: 'visible' });
          await progressOverlay.waitFor({ state: 'hidden', timeout: 60000 });
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.waitForTimeout(8000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_BUTTON).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE).click();
            const jobNameDCCM_SIT_TC_0068 = faker.person.jobTitle();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_JOB_NAME).fill(jobNameDCCM_SIT_TC_0068);
            console.log('Job Name for DCCM_SIT_TC_0068:', jobNameDCCM_SIT_TC_0068);
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE).click();
            await sharedPage.waitForTimeout(2000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT).click();
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).click();
            const time = getTimeAfterMinutes(1);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_START_TIME).fill(time);
            await sharedPage.waitForTimeout(4000);
            await sharedPage.locator(SELECTORS.AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON).click();
            //await sharedPage.waitForTimeout(7000);
            await sharedPage.locator('text=Job scheduled successfully').waitFor({ state: 'visible', timeout: 60000 });
            const activeCloseButton = sharedPage
            .locator(SELECTORS.REPORT_JOB_CLOSE)
            .last();
            await activeCloseButton.waitFor({ state: 'visible', timeout: 30000 });
            await activeCloseButton.click();
            await sharedPage.waitForTimeout(2000);
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT));
            await sharedPage.waitForLoadState('networkidle');
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT).click();
            await scrollUntilVisible(sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER));
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER).click();
            await sharedPage.waitForTimeout(8000);
            const maxAttempt = 5;
            let jobnotFound = true;
            for (let i = 0; i < maxAttempt; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempt})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0068, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isHidden()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0068)) {
                        console.log('Success! Job not found in Current status:', text);
                        jobnotFound = false;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT).click();
            const jobDropdown = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN);
            await jobDropdown.waitFor({ state: 'visible', timeout: 60000 });
            await jobDropdown.click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED).click();
            await sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON).click({ timeout: 10000 });
            const closeFilter = sharedPage.locator(SELECTORS.DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE);
            await closeFilter.waitFor({ state: 'visible', timeout: 30000 });
            await closeFilter.click();
  
            const maxAttempts = 12;
            let jobFound = false;
  
            for (let i = 0; i < maxAttempts; i++) {
                console.log(`Checking for completed job (Attempt ${i + 1}/${maxAttempts})...`);
                try {
                // Wait a moment for the grid to refresh
                await sharedPage.waitForTimeout(5000);
                
                // Apply the Job Name filter again if the grid cleared it
                const jobNameFilter = sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS);
                await jobNameFilter.fill(jobNameDCCM_SIT_TC_0068, { timeout: 10000 });
                await sharedPage.keyboard.press('Enter');
                await sharedPage.waitForTimeout(3000);
  
                // Check if the job is now visible in the grid
                const validatedJob = sharedPage.locator(SELECTORS.REPORT_JOBNAME_VALIDATES);
                if (await validatedJob.isVisible()) {
                    const text = (await validatedJob.innerText()).trim();
                    if (text.includes(jobNameDCCM_SIT_TC_0068)) {
                        console.log('Success! Job found in Completed status:', text);
                        jobFound = true;
                        break; // Exit the loop early if found
                    }
                }
                await sharedPage.locator(SELECTORS.AGENTS_REPORT_JOBNAME_FILTERS).clear({ timeout: 5000 });
                } catch (e) {
              console.log(`Minor error during attempt ${i + 1}, continuing loop...`);
          }
                // If not found, wait 15 seconds before the next refresh attempt
                console.log('Job not ready yet. Waiting 15s before retry...');
                await sharedPage.waitForTimeout(15000);
            }
            expect(jobFound).toBe(true);
            await sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY).click();
            const statusCell = sharedPage.locator(SELECTORS.REPORT_JOB_HISTORY_STATUS).first();
            const actualText = await statusCell.innerText();
            console.log(`Detected Status: ${actualText}`);
            try{
            if (actualText === 'Failed group not available') {
            console.log('--- TEST RESULT: PASS ---');
            await sharedPage.waitForTimeout(3000);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Confirmation');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
             } else {
            console.log('--- TEST RESULT: FAIL ---');
            console.log(`Expected: 'Failed group not available' but found: '${actualText}'`);
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Report_Job_Failure');
            await expect(statusCell).toHaveText('Failed group not available', { timeout: 1000 });
            }}
            finally {
            console.log('Navigating to Dashboard for next test case...');
            await ScreenshotUtils.capture(sharedPage, testInfo, 'Final_Status_Check');
            await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
            await sharedPage.waitForLoadState('networkidle');
             }
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


});