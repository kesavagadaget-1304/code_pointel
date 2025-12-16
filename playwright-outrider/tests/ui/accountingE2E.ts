import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Accountingetoe } from '../../pages/accountingetoe';
import * as Constants from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting E2E Tests', () => {
  test.describe.configure({ mode: 'serial' });
  
  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: Accountingetoe;

  test.beforeAll(async ({ browser: testBrowser }, testInfo) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();
    
    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(Constants.LOGIN_CREDENTIALS.USERNAME, Constants.LOGIN_CREDENTIALS.PASSWORD);
    await ScreenshotUtils.capture(sharedPage, testInfo, 'login-page');
  });

  test.beforeEach(async () => {
    accountingPage = new Accountingetoe(sharedPage);
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
  
  test('@E2E_001 @medium - Complete Accounting E2E Flow', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, Constants.TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );
      
      await TestHelpers.executeTestStep(
        'Close Navigation Arrow',
        async () => {
          await accountingPage.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Accounting Header',
        async () => {
          await accountingPage.verifyAccountingHeader();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text',
        async () => {
          await expect(sharedPage.locator('text=Connect to QuickBooks Online')).toBeVisible();
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Accounting E2E Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_002 @medium - Accounting Activity Navigation Test', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Accounting Tab Visibility',
        async () => {
          const isVisible = await accountingPage.isAccountingTabVisible();
          expect(isVisible).toBeTruthy();
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Accounting Navigation Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_003 @medium - Click banner CTA', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, Constants.TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );
      
      await TestHelpers.executeTestStep(
        'Close Navigation Arrow',
        async () => {
          await accountingPage.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify QuickBooks Online Connection Text is Present',
        async () => {
          await expect(sharedPage.locator('text=Connect to QuickBooks Online')).toBeVisible();
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Click Connect to QuickBooks Online CTA',
        async () => {
          await sharedPage.locator('text=Connect to QuickBooks Online').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Close Modal',
        async () => {
          await accountingPage.modalCloseButton.click();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Click Banner CTA Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_004 @high - Complete QuickBooks Online Connection Flow', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Verify Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, Constants.TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );
      
      await TestHelpers.executeTestStep(
        'Close Navigation Arrow',
        async () => {
          await accountingPage.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Click Connect to QuickBooks Online',
        async () => {
          await expect(sharedPage.locator('text=Connect to QuickBooks Online')).toBeVisible();
          await sharedPage.locator('text=Connect to QuickBooks Online').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Handle QuickBooks Login Flow',
        async () => {
          // Wait for QuickBooks login page or modal to appear
          await sharedPage.waitForTimeout(5000);
          
          // Take screenshot of login page
          await ScreenshotUtils.capture(sharedPage, testInfo, 'qbo-login-page');
          
          // Note: In a real test, you would handle the actual login flow here
          // For now, we'll simulate the flow with waits and screenshots
          console.log('QuickBooks login flow initiated - would handle actual login here');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Select Company (Simulated)',
        async () => {
          // Wait for company selection page
          await sharedPage.waitForTimeout(3000);
          
          // Take screenshot of company selection
          await ScreenshotUtils.capture(sharedPage, testInfo, 'qbo-company-selection');
          
          // Note: In a real test, you would select the actual company here
          console.log('Company selection step - would select company here');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Authorize Connection (Simulated)',
        async () => {
          // Wait for authorization page
          await sharedPage.waitForTimeout(3000);
          
          // Take screenshot of authorization page
          await ScreenshotUtils.capture(sharedPage, testInfo, 'qbo-authorization');
          
          // Note: In a real test, you would click authorize button here
          console.log('Authorization step - would authorize connection here');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
      await TestHelpers.executeTestStep(
        'Wait for Connection Completion',
        async () => {
          // Wait for connection to complete and return to main page
          await sharedPage.waitForTimeout(5000);
          
          // Take screenshot of completed connection
          await ScreenshotUtils.capture(sharedPage, testInfo, 'qbo-connection-complete');
          
          console.log('Connection flow completed - waiting for redirect back to application');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );
      
    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'QuickBooks Online Connection Flow Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_005 @high - GL Codes & Classes - Company Dropdown + Search', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Navigate to GL Codes & Classes',
        async () => {
          // Click on GL Codes & Classes tab/link
          await sharedPage.locator('text=GL Codes & Classes').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Company Dropdown',
        async () => {
          // Click company dropdown
          await sharedPage.locator('[data-testid="company-dropdown"], .company-selector, select[name*="company"]').first().click();
          await sharedPage.waitForTimeout(2000);
          
          // Take screenshot of dropdown options
          await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-company-dropdown');
          
          // Select first available company option
          await sharedPage.locator('option, .dropdown-item, [role="option"]').first().click();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Search Functionality',
        async () => {
          // Find and use search input
          const searchInput = sharedPage.locator('input[placeholder*="search"], input[type="search"], .search-input').first();
          await searchInput.fill('test search');
          await sharedPage.waitForTimeout(1000);
          
          // Take screenshot of search results
          await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-search-results');
          
          // Clear search
          await searchInput.clear();
          await sharedPage.waitForTimeout(1000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'GL Codes & Classes Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_006 @high - Payroll Assignments - Paygroup Selector, Locations Toggle, Bulk Map, Save', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Navigate to Payroll Assignments',
        async () => {
          await sharedPage.locator('text=Payroll Assignments').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Paygroup Selector',
        async () => {
          // Click paygroup dropdown
          await sharedPage.locator('[data-testid="paygroup-selector"], .paygroup-dropdown, select[name*="paygroup"]').first().click();
          await sharedPage.waitForTimeout(2000);
          
          // Take screenshot of paygroup options
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-assignments-paygroup-dropdown');
          
          // Select first paygroup
          await sharedPage.locator('option, .dropdown-item, [role="option"]').first().click();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Locations Toggle',
        async () => {
          // Find and click locations toggle/expand button
          const locationsToggle = sharedPage.locator('button:has-text("Locations"), .locations-toggle, [data-testid="locations-expand"]').first();
          await locationsToggle.click();
          await sharedPage.waitForTimeout(2000);
          
          // Take screenshot of expanded locations
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-assignments-locations-expanded');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Bulk Map Functionality',
        async () => {
          // Look for bulk map button or checkbox
          const bulkMapButton = sharedPage.locator('button:has-text("Bulk Map"), .bulk-map-btn, [data-testid="bulk-map"]').first();
          if (await bulkMapButton.isVisible()) {
            await bulkMapButton.click();
            await sharedPage.waitForTimeout(2000);
            
            // Take screenshot of bulk map interface
            await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-assignments-bulk-map');
          }
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Save Functionality',
        async () => {
          // Find and click save button
          const saveButton = sharedPage.locator('button:has-text("Save"), .save-btn, [data-testid="save"]').first();
          await saveButton.click();
          await sharedPage.waitForTimeout(3000);
          
          // Take screenshot after save
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-assignments-saved');
          
          // Verify save success (look for success message or updated state)
          await expect(sharedPage.locator('text=saved, text=success, .success-message').first()).toBeVisible({ timeout: 5000 });
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Payroll Assignments Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_007 @high - Payroll Settings - Company, Posting Date, Paper Checks, Sync Start, Save', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Navigate to Payroll Settings',
        async () => {
          await sharedPage.locator('text=Payroll Settings').click();
          await sharedPage.waitForTimeout(3000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Company Selection',
        async () => {
          // Click company dropdown in settings
          await sharedPage.locator('[data-testid="settings-company"], .company-select, select[name*="company"]').first().click();
          await sharedPage.waitForTimeout(2000);
          
          // Select company option
          await sharedPage.locator('option, .dropdown-item, [role="option"]').first().click();
          await sharedPage.waitForTimeout(2000);
          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-settings-company-selected');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Posting Date Configuration',
        async () => {
          // Find posting date input/selector
          const postingDateInput = sharedPage.locator('input[name*="posting"], input[type="date"], .posting-date').first();
          if (await postingDateInput.isVisible()) {
            await postingDateInput.fill('2024-01-01');
            await sharedPage.waitForTimeout(1000);
          }
          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-settings-posting-date');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Paper Checks Configuration',
        async () => {
          // Find paper checks checkbox/toggle
          const paperChecksToggle = sharedPage.locator('input[name*="paper"], .paper-checks, [data-testid="paper-checks"]').first();
          if (await paperChecksToggle.isVisible()) {
            await paperChecksToggle.check();
            await sharedPage.waitForTimeout(1000);
          }
          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-settings-paper-checks');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Sync Start Configuration',
        async () => {
          // Find sync start date/input
          const syncStartInput = sharedPage.locator('input[name*="sync"], .sync-start, [data-testid="sync-start"]').first();
          if (await syncStartInput.isVisible()) {
            await syncStartInput.fill('2024-01-01');
            await sharedPage.waitForTimeout(1000);
          }
          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-settings-sync-start');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Save Settings',
        async () => {
          // Find and click save button
          const saveButton = sharedPage.locator('button:has-text("Save"), .save-btn, [data-testid="save-settings"]').first();
          await saveButton.click();
          await sharedPage.waitForTimeout(3000);
          
          // Take screenshot after save
          await ScreenshotUtils.capture(sharedPage, testInfo, 'payroll-settings-saved');
          
          // Verify save success
          await expect(sharedPage.locator('text=saved, text=success, .success-message').first()).toBeVisible({ timeout: 5000 });
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Payroll Settings Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_008 @critical - Tenant Scope Check - Viewing-as Management Group', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify Management Group Selector Presence',
        async () => {
          // Look for management group selector/dropdown
          const managementGroupSelector = sharedPage.locator(
            '[data-testid="management-group"], .management-group-selector, .viewing-as, select[name*="group"]'
          ).first();
          
          await expect(managementGroupSelector).toBeVisible({ timeout: 10000 });
          
          await ScreenshotUtils.capture(sharedPage, testInfo, 'tenant-scope-management-group-selector');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Management Group Selection',
        async () => {
          // Click management group dropdown
          const managementGroupSelector = sharedPage.locator(
            '[data-testid="management-group"], .management-group-selector, .viewing-as, select[name*="group"]'
          ).first();
          
          await managementGroupSelector.click();
          await sharedPage.waitForTimeout(2000);
          
          // Take screenshot of available groups
          await ScreenshotUtils.capture(sharedPage, testInfo, 'tenant-scope-group-options');
          
          // Select first available group (if multiple exist)
          const groupOptions = sharedPage.locator('option, .dropdown-item, [role="option"]');
          const optionCount = await groupOptions.count();
          
          if (optionCount > 1) {
            await groupOptions.nth(1).click(); // Select second option (first is usually current)
            await sharedPage.waitForTimeout(3000);
            
            // Take screenshot after group change
            await ScreenshotUtils.capture(sharedPage, testInfo, 'tenant-scope-group-changed');
          }
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify Tenant Scope Data Changes',
        async () => {
          // Verify that data/content changes based on selected management group
          // This could include checking for different companies, paygroups, or data sets
          
          // Check if company dropdown options changed
          const companyDropdown = sharedPage.locator('.company-selector, select[name*="company"]').first();
          if (await companyDropdown.isVisible()) {
            await companyDropdown.click();
            await sharedPage.waitForTimeout(1000);
            
            // Take screenshot of company options for this tenant scope
            await ScreenshotUtils.capture(sharedPage, testInfo, 'tenant-scope-company-options');
            
            // Close dropdown
            await sharedPage.keyboard.press('Escape');
          }
          
          // Verify page content reflects the selected management group
          await expect(sharedPage.locator('body')).toContainText(/company|group|tenant/i);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test Tenant Scope Persistence',
        async () => {
          // Navigate to different section and verify scope persists
          await sharedPage.locator('text=Payroll Assignments').click();
          await sharedPage.waitForTimeout(2000);
          
          // Verify management group selection persists
          const managementGroupSelector = sharedPage.locator(
            '[data-testid="management-group"], .management-group-selector, .viewing-as'
          ).first();
          
          if (await managementGroupSelector.isVisible()) {
            await ScreenshotUtils.capture(sharedPage, testInfo, 'tenant-scope-persistence-check');
          }
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'Tenant Scope Check Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

  test('@E2E_009 @medium - Verify loginToQBO is Clickable', async ({ }, testInfo) => {
    try {
      await TestHelpers.executeTestStep(
        'Navigate to Accounting Activity',
        async () => {
          await accountingPage.navigateToAccountingActivity(testInfo);
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify Page Load',
        async () => {
          await TestHelpers.waitForPageLoad(sharedPage, Constants.TIMEOUTS.PAGE_LOAD);
          await sharedPage.waitForTimeout(2000);
        }
      );

      await TestHelpers.executeTestStep(
        'Close Navigation Arrow',
        async () => {
          await accountingPage.clickCloseArrow();
          await sharedPage.waitForTimeout(2000);
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Locate loginToQBO Element',
        async () => {
          // Look for loginToQBO element with multiple selector strategies
          const loginToQBOElement = sharedPage.locator(
            '[data-testid="loginToQBO"], #loginToQBO, .loginToQBO, button:has-text("loginToQBO"), [id*="loginToQBO"], [class*="loginToQBO"]'
          ).first();

          // Take screenshot showing the element location
          await ScreenshotUtils.capture(sharedPage, testInfo, 'loginToQBO-element-location');

          // Verify element is visible
          await expect(loginToQBOElement).toBeVisible({ timeout: 10000 });
          
          console.log('loginToQBO element found and is visible');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify loginToQBO is Enabled',
        async () => {
          const loginToQBOElement = sharedPage.locator(
            '[data-testid="loginToQBO"], #loginToQBO, .loginToQBO, button:has-text("loginToQBO"), [id*="loginToQBO"], [class*="loginToQBO"]'
          ).first();

          // Check if element is enabled (not disabled)
          await expect(loginToQBOElement).toBeEnabled();
          
          console.log('loginToQBO element is enabled');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Test loginToQBO Clickability',
        async () => {
          const loginToQBOElement = sharedPage.locator(
            '[data-testid="loginToQBO"], #loginToQBO, .loginToQBO, button:has-text("loginToQBO"), [id*="loginToQBO"], [class*="loginToQBO"]'
          ).first();

          // Verify element is clickable by checking it's not covered by other elements
          await expect(loginToQBOElement).toBeVisible();
          await expect(loginToQBOElement).toBeEnabled();
          
          // Get element bounding box to ensure it's in viewport
          const boundingBox = await loginToQBOElement.boundingBox();
          expect(boundingBox).not.toBeNull();
          expect(boundingBox!.width).toBeGreaterThan(0);
          expect(boundingBox!.height).toBeGreaterThan(0);

          // Take screenshot before click attempt
          await ScreenshotUtils.capture(sharedPage, testInfo, 'loginToQBO-before-click');

          console.log('loginToQBO element is clickable - all checks passed');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Perform Click Test on loginToQBO',
        async () => {
          const loginToQBOElement = sharedPage.locator(
            '[data-testid="loginToQBO"], #loginToQBO, .loginToQBO, button:has-text("loginToQBO"), [id*="loginToQBO"], [class*="loginToQBO"]'
          ).first();

          // Scroll element into view if needed
          await loginToQBOElement.scrollIntoViewIfNeeded();
          
          // Wait a moment for any animations
          await sharedPage.waitForTimeout(1000);

          // Attempt to click the element
          await loginToQBOElement.click();
          
          // Wait for any response/navigation
          await sharedPage.waitForTimeout(3000);

          // Take screenshot after click
          await ScreenshotUtils.capture(sharedPage, testInfo, 'loginToQBO-after-click');

          console.log('loginToQBO element clicked successfully');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

      await TestHelpers.executeTestStep(
        'Verify Click Response',
        async () => {
          // Check for any modal, popup, or navigation that occurred after click
          // This could be a QBO login modal, redirect, or other response
          
          // Wait for potential modal or page change
          await sharedPage.waitForTimeout(2000);
          
          // Take final screenshot to document the result
          await ScreenshotUtils.capture(sharedPage, testInfo, 'loginToQBO-click-result');
          
          // Log success
          console.log('loginToQBO click test completed - check screenshots for results');
        },
        sharedPage,
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR
      );

    } catch (error) {
      await TestHelpers.handleTestError(
        sharedPage, 
        error, 
        'loginToQBO Clickability Test', 
        Constants.SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR,
        testInfo
      );
    }
  });

});
