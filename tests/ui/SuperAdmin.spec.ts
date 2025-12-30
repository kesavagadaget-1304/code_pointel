import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, TIMEOUTS, SELECTORS } from '../../configs/constants';
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

    test("@DCCM_SIT_TC_001 @low Ensure while click on divisions drop down in filters page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_DIVISIONS).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_DIVISIONS)).toBeVisible();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_DIVISIONS)).toBeEnabled();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_DIVISIONS).press('Tab');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
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

    test("@DCCM_SIT_TC_002 @low Ensure while click on Group drop down in filters page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_GROUPS).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_GROUPS)).toBeVisible();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_GROUPS)).toBeEnabled();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_GROUPS).press('Tab');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
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

    test("@DCCM_SIT_TC_003 @low Ensure while click on Work team drop down in filters page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_WORKTEAM).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_WORKTEAM)).toBeVisible();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_WORKTEAM)).toBeEnabled();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_WORKTEAM).press('Tab');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
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

    test("@DCCM_SIT_TC_004 @low Ensure while click on Queue drop down in filters page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_QUEUE).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_QUEUE)).toBeVisible();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_QUEUE)).toBeEnabled();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_QUEUE).press('Tab');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
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


    test("@DCCM_SIT_TC_005 @low Ensure while click on Skill drop down in filters page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.AGENTS_CHECKBOX1).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SKILL).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SKILL)).toBeVisible();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SKILL)).toBeEnabled();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SKILL).press('Tab');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
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


    test("@DCCM_SIT_TC_006 @low Ensure while click on add queue button in edit agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_QUEUES_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_007 @low Ensure while click on add skill button in edit agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_SKILLS_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_008 @low Ensure while click on add language button in edit agent ", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_LANGUAGE_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_LANGUAGE).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_LANGUAGE_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_LANGUAGE_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_009 @low Ensure while click on add groups button in edit agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_GROUPS_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_GROUPS).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_GROUPS_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_GROUPS_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_010 @low Ensure while click on add Roles and Division button in edit agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_SCROLL_NEXT).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ROLES_DIVISION_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_011 @low Ensure while click on add queue button in create agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_SCROLL_NEXT).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_QUEUES_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_QUEUE_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    test("@DCCM_SIT_TC_012 @low Ensure while click on add skill button in create agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_SKILLS_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_SKILL_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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

    // not executed from here
    test("@DCCM_SIT_TC_013 @low Ensure while click on add Roles and Division button in create agent", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_AGENTS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASBOARD_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_FILTER_CLOSE).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_SCROLL_NEXT).click();

                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ROLES_DIVISION_TAB).click();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION).click();
                    await expect(sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION_TITLE)).toBeVisible();
                    await sharedPage.locator(SELECTORS.SUPERADMIN_DASHBOARD_USEREDIT_ADD_ROLES_DIVISION_CLOSE).click();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.goto("https://cms.cloudstamp.net/dccm/cms/dashboard");
                    await sharedPage.waitForTimeout(1000);
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


    test("@DCCM_SIT_TC_014 @low Ensure while select the general group type and click on search button in filters", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_GROUPS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE_GENERAL).click();

                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(5000);
                    expect(sharedPage.locator(SELECTORS.GROUPS_TYPE_VALIDATE_GENERAL)).toBeVisible();
                    expect(sharedPage.locator(SELECTORS.GROUPS_ROLE_VALIDATE_SUPER_ADMIN)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');

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

    test("@DCCM_SIT_TC_015 @low Ensure while select the Skill expression group type and click on search button in filters", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_GROUPS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE_SKILL).click();

                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(5000);
                    expect(sharedPage.locator(SELECTORS.GROUPS_TYPE_VALIDATE_SKILL_EXPRESSION)).toBeVisible();
                    expect(sharedPage.locator(SELECTORS.GROUPS_ROLE_VALIDATE_SUPER_ADMIN)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
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

    test("@DCCM_SIT_TC_016 @low Ensure while click on divisions drop down in add user page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_GROUPS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE_GENERAL).click();

                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(5000);
                    //expect(sharedPage.locator(SELECTORS.GROUPS_TYPE_VALIDATE_SKILL_EXPRESSION)).toBeVisible();
                    expect(sharedPage.locator(SELECTORS.GROUPS_ROLE_VALIDATE_SUPER_ADMIN)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.locator(SELECTORS.GROUPS_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_ADD_USER).click();
                    await sharedPage.waitForTimeout(5000);
                    expect(sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_ADD_USER_VALIDATE)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_ADD_USER_CLOSE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_GROUP_EDIT_CLOSE_BUTTON).click();
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

    test("@DCCM_SIT_TC_017 @low Ensure while click on divisions drop down in add user page", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_GROUPS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE_GENERAL).click();

                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(6000);
                    await sharedPage.locator(SELECTORS.GROUPS_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_ADD_USER).click();
                    await sharedPage.waitForTimeout(5000);
                    expect(sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_ADD_USER_VALIDATE)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_ADD_USER_CLOSE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_GENERAL_TYPE_EDIT_GROUP_EDIT_CLOSE_BUTTON).click();
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

    test("@DCCM_SIT_TC_018 @low Ensure while click on add divisions button in skill group", async ({ }, testInfo) => {
        try {
            await TestHelpers.executeTestStep(
                'Login → Accounting Activity (first time banner)',
                async () => {
                    await sharedPage.locator(SELECTORS.DASHBOARD_GROUPS).click();
                    await sharedPage.waitForLoadState('networkidle');
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ICON).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_ROLE_SUPER_ADMIN).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_MEMBER_TYPE_SKILL).click();

                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_SEARCH).click();
                    await sharedPage.waitForTimeout(3000);
                    await sharedPage.locator(SELECTORS.GROUPS_FILTER_CLOSE).click();
                    await sharedPage.waitForTimeout(6000);
                    await sharedPage.locator(SELECTORS.GROUPS_DASHBOARD_USER_EDIT_1).click();
                    await sharedPage.waitForTimeout(10000);
                    await sharedPage.locator(SELECTORS.GROUPS_SKILLEX_TYPE_EDIT_GROUP_EDIT_DIVISIONS_TAB).click();
                    await sharedPage.waitForTimeout(5000);
                    await sharedPage.locator(SELECTORS.GROUPS_SKILLEX_TYPE_EDIT_GROUP_EDIT_ADD_USER).click();
                    await sharedPage.waitForTimeout(5000);
                    expect(sharedPage.locator(SELECTORS.GROUPS_SKILLEX_TYPE_EDIT_ADD_DIVISIONS_VALIDATE)).toBeVisible();
                    await ScreenshotUtils.capture(sharedPage, testInfo, 'SuperAdmin-divisions-dropdown');
                    await sharedPage.locator(SELECTORS.GROUPS_SKILLEX_TYPE_EDIT_ADD_USER_CLOSE).click();
                    await sharedPage.locator(SELECTORS.GROUPS_SKILLEX_TYPE_EDIT_GROUP_EDIT_CLOSE_BUTTON).click();
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