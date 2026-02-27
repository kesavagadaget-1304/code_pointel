import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants_skillLevelApply';
import { TestHelpers, alphaNumeric, alphaNumericSpecialchar, complexString, randomNumeric } from '../../utils/testHelpers';
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

  test("@DCCM_SIT_TC_0001 @low Ensure  while click on the skill level text box field", async ({ }, testInfo) => {
    test.setTimeout(300000);
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
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_SKILL_LEVEL_TEXTBOX).click();
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_SKILL_LEVEL_TEXTBOX)).toBeFocused();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'BulkEdit_SkillLevel_Textbox');
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_CLOSE).click();
          console.log("Completed test case DCCM_SIT_TC_0001");
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



  test("@DCCM_SIT_TC_0005 @low Ensure while enter numerics value and click on apply button ", async ({ }, testInfo) => {
    test.setTimeout(300000);
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
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_SKILL_LEVEL_TEXTBOX).fill("5");
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_SKILL_LEVEL_TEXTBOX)).toHaveValue("5");
          await ScreenshotUtils.capture(sharedPage, testInfo, 'BulkEdit_SkillLevel_Textbox');
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_CLOSE).click();
          console.log("Completed test case DCCM_SIT_TC_0005");
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

  test("@DCCM_SIT_TC_0006 @low Ensure while enter valid skill level value and click on apply button", async ({ }, testInfo) => {
    test.setTimeout(300000);
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
          const usernameDCCM_SIT_TC_0006 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0006);

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0006?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();

          const DCCM_SIT_TC_0006 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random skill level value for DCCM_SIT_TC_0006 is:", DCCM_SIT_TC_0006);
          const DCCM_SIT_TC_0006_skillName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL).textContent();
          console.log(`Skill name for DCCM_SIT_TC_0006 is: ${DCCM_SIT_TC_0006_skillName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0006.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0006_selectedSkillLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).inputValue();
          console.log(`Selected skill level for ${DCCM_SIT_TC_0006_skillName} is:`, DCCM_SIT_TC_0006_selectedSkillLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0006");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          console.log("Success message is visible for DCCM_SIT_TC_0006");
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const DCCM_SIT_TC_0006_history_current_skillLevel = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent();

          console.log(`Skill level in history for ${DCCM_SIT_TC_0006_skillName} is:`, DCCM_SIT_TC_0006_history_current_skillLevel);

          expect(Number(DCCM_SIT_TC_0006_history_current_skillLevel?.trim())).toBe(Number(DCCM_SIT_TC_0006_selectedSkillLevel));

          await ScreenshotUtils.capture(sharedPage, testInfo, 'SkillLevel_Update_History');
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          console.log("Completed test case DCCM_SIT_TC_0006");
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

  test("@DCCM_SIT_TC_0008 @low Ensure while select skill and enter value in skill level and  click on apply", async ({ }, testInfo) => {
    test.setTimeout(300000);
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
          const usernameDCCM_SIT_TC_0008 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0008);

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0008?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();

          const DCCM_SIT_TC_0008 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random skill level value for DCCM_SIT_TC_0008 is:", DCCM_SIT_TC_0008);
          const DCCM_SIT_TC_0008_skillName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL).textContent();
          console.log(`Skill name for DCCM_SIT_TC_0008 is: ${DCCM_SIT_TC_0008_skillName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0008.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0008_selectedSkillLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).inputValue();
          console.log(`Selected skill level for ${DCCM_SIT_TC_0008_skillName} is:`, DCCM_SIT_TC_0008_selectedSkillLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0008");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          console.log("Success message is visible for DCCM_SIT_TC_0008");
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const DCCM_SIT_TC_0008_history_current_skillLevel = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent();

          console.log(`Skill level in history for ${DCCM_SIT_TC_0008_skillName} is:`, DCCM_SIT_TC_0008_history_current_skillLevel);

          expect(Number(DCCM_SIT_TC_0008_history_current_skillLevel?.trim())).toBe(Number(DCCM_SIT_TC_0008_selectedSkillLevel));

          await ScreenshotUtils.capture(sharedPage, testInfo, 'SkillLevel_Update_History');
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          console.log("Completed test case DCCM_SIT_TC_0008");
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


  test("@DCCM_SIT_TC_0009 @low Ensure while enter skill level value and click on apply button ", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0009");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0009 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0009);

          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0009?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');

          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();

          const DCCM_SIT_TC_0009 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random skill level value for DCCM_SIT_TC_0009 is:", DCCM_SIT_TC_0009);
          const DCCM_SIT_TC_0009_skillName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL).textContent();
          console.log(`Skill name for DCCM_SIT_TC_0009 is: ${DCCM_SIT_TC_0009_skillName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0009.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0009_selectedSkillLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL).inputValue();
          console.log(`Selected skill level for ${DCCM_SIT_TC_0009_skillName} is:`, DCCM_SIT_TC_0009_selectedSkillLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0009");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          console.log("Success message is visible for DCCM_SIT_TC_0009");

          console.log("Completed test case DCCM_SIT_TC_0009");
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


  test("@DCCM_SIT_TC_0010 @low Ensure  while click on the language level text box field", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0010");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0010 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0010);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0010?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX)).toBeVisible();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX).click();
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX)).toBeFocused();
          await ScreenshotUtils.capture(sharedPage, testInfo, 'BulkEdit_LanguageLevel_Textbox');
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_CLOSE).click();
          console.log("Completed test case DCCM_SIT_TC_0010");
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

  test("@DCCM_SIT_TC_0011 @low Ensure while enter the values in the language level text box field", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0011");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0010 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0010);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0010?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          await expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX)).toBeVisible();
          const user = alphaNumericSpecialchar(5);
          console.log(`Generated alphanumeric with special characters value for language level: ${user}`);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX).fill(user);
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX)).toHaveValue(user);

          await ScreenshotUtils.capture(sharedPage, testInfo, 'Alphanumeric_LanguageLevel_Textbox');
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_CLOSE).click();
          console.log("Completed test case DCCM_SIT_TC_0011");
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

  test("@DCCM_SIT_TC_0014 @low Ensure while enter numerics value and click on apply button", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0014");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0014 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0014);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0014?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          const DCCM_SIT_TC_0014 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random lang level value for DCCM_SIT_TC_0014 is:", DCCM_SIT_TC_0014);
          const DCCM_SIT_TC_0014_langName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG).textContent();
          console.log(`Language name for DCCM_SIT_TC_0014 is: ${DCCM_SIT_TC_0014_langName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0014.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0014_selectedLangLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).inputValue();
          console.log(`Selected language level for ${DCCM_SIT_TC_0014_langName} is:`, DCCM_SIT_TC_0014_selectedLangLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0014");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          console.log("Success message is visible for DCCM_SIT_TC_0014");

          console.log("Completed test case DCCM_SIT_TC_0014");
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


  test("@DCCM_SIT_TC_0015 @low Ensure while enter valid language level value and click on apply button ", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0015");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0015 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0015);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0015?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          const DCCM_SIT_TC_0015 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random lang level value for DCCM_SIT_TC_0015 is:", DCCM_SIT_TC_0015);
          const DCCM_SIT_TC_0015_langName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG).textContent();
          console.log(`Language name for DCCM_SIT_TC_0015 is: ${DCCM_SIT_TC_0015_langName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0015.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0015_selectedLangLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).inputValue();
          console.log(`Selected language level for ${DCCM_SIT_TC_0015_langName} is:`, DCCM_SIT_TC_0015_selectedLangLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0015");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          console.log("Success message is visible for DCCM_SIT_TC_0015");

          console.log("Completed test case DCCM_SIT_TC_0015");
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


  test("@DCCM_SIT_TC_0017 @low Ensure while select language and enter value in language level and  click on apply", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0017");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0017 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0017);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0017?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          const DCCM_SIT_TC_0017 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random lang level value for DCCM_SIT_TC_0017 is:", DCCM_SIT_TC_0017);
          const DCCM_SIT_TC_0017_langName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG).textContent();
          console.log(`Language name for DCCM_SIT_TC_0017 is: ${DCCM_SIT_TC_0017_langName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0017.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0017_selectedLangLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).inputValue();
          console.log(`Selected language level for ${DCCM_SIT_TC_0017_langName} is:`, DCCM_SIT_TC_0017_selectedLangLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0017");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const DCCM_SIT_TC_0017_history_current_langLevel = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent();

          console.log(`Language level in history for ${DCCM_SIT_TC_0017_langName} is:`, DCCM_SIT_TC_0017_history_current_langLevel);

          expect(Number(DCCM_SIT_TC_0017_history_current_langLevel?.trim())).toBe(Number(DCCM_SIT_TC_0017_selectedLangLevel));

          await ScreenshotUtils.capture(sharedPage, testInfo, 'SkillLevel_Update_History');
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          console.log("Completed test case DCCM_SIT_TC_0017");
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

  test("@DCCM_SIT_TC_0018 @low Ensure while enter language level value and click on apply button", async ({ }, testInfo) => {
    test.setTimeout(300000);
    try {
      await TestHelpers.executeTestStep(
        'Login → Accounting Activity (first time banner)',
        async () => {
          console.log("Initiating test case DCCM_SIT_TC_0018");
          await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
          await sharedPage.waitForLoadState('networkidle');
          await sharedPage.waitForLoadState('load');
          await sharedPage.waitForLoadState('domcontentloaded');
          await sharedPage.waitForTimeout(3000);
          const usernameDCCM_SIT_TC_0018 = await sharedPage.locator(SELECTORS.AGENTS_USERNAME_COPY).textContent();
          console.log("Copied attribute name is :", usernameDCCM_SIT_TC_0018);
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).fill(usernameDCCM_SIT_TC_0018?.trim() || '');
          await sharedPage.locator(SELECTORS.AGENTS_USERNAME_SEARCH_TEXTBOX).press('Enter');
          await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT).click();
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB).click();
          await sharedPage.waitForTimeout(2000);

          const DCCM_SIT_TC_0018 = faker.number.int({ min: 2, max: 6 }).toString();

          console.log("Generated random lang level value for DCCM_SIT_TC_0018 is:", DCCM_SIT_TC_0018);
          const DCCM_SIT_TC_0018_langName = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG).textContent();
          console.log(`Language name for DCCM_SIT_TC_0018 is: ${DCCM_SIT_TC_0018_langName}`);

          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).click();
          const optionXpath = SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL_DROPDOWN_OPTION.replace('%s', DCCM_SIT_TC_0018.toString());
          await sharedPage.locator(optionXpath).click();

          await sharedPage.waitForTimeout(3000);
          const DCCM_SIT_TC_0018_selectedLangLevel = await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_1ST_LANG_LEVEL).inputValue();
          console.log(`Selected language level for ${DCCM_SIT_TC_0018_langName} is:`, DCCM_SIT_TC_0018_selectedLangLevel);
          await sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON).click();
          console.log("Clicked on Apply button for DCCM_SIT_TC_0018");
          await sharedPage.waitForLoadState('networkidle');
          expect(sharedPage.locator(SELECTORS.AGENTS_SKILLAPPLY_SUCCESS_MESSAGE)).toBeVisible();
          await sharedPage.locator(SELECTORS.AGENTS_DASHBOARD_HISTORY).click();
          const DCCM_SIT_TC_0018_history_current_langLevel = await sharedPage.locator(SELECTORS.HISTORY_CURRENT_VALUE).textContent();

          console.log(`Language level in history for ${DCCM_SIT_TC_0018_langName} is:`, DCCM_SIT_TC_0018_history_current_langLevel);

          expect(Number(DCCM_SIT_TC_0018_history_current_langLevel?.trim())).toBe(Number(DCCM_SIT_TC_0018_selectedLangLevel));

          await ScreenshotUtils.capture(sharedPage, testInfo, 'SkillLevel_Update_History');
          await sharedPage.locator(SELECTORS.HISTORY_CLOSE).click();

          console.log("Completed test case DCCM_SIT_TC_0018");
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
});
