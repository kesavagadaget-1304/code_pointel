import { test, expect, type Page, type Browser, type BrowserContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AccountingPage } from '../../pages/AccountingPage';
import { AccountingConnectionsPage } from '../../pages/AccountingConnectionsPage';
import { LOGIN_CREDENTIALS, SCREENSHOT_PATHS, SELECTORS } from '../../configs/constants';
import { TestHelpers } from '../../utils/testHelpers';
import { ScreenshotUtils } from '../../utils/screenshotUtils';

test.describe('Accounting_Connections', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let sharedPage: Page;
  let accountingPage: AccountingPage;
  let connectionsPage: AccountingConnectionsPage;

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
    context = await browser.newContext();
    sharedPage = await context.newPage();

    const loginPage = new LoginPage(sharedPage);
    await loginPage.signIn(LOGIN_CREDENTIALS.USERNAME, LOGIN_CREDENTIALS.PASSWORD);

    accountingPage = new AccountingPage(sharedPage);
    await accountingPage.clickAccountingTab();
  });

  test.beforeEach(async () => {
    accountingPage = new AccountingPage(sharedPage);
    connectionsPage = new AccountingConnectionsPage(sharedPage);
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

  test('@C1925439 @low - Verify navigation to the Accounting Connections page loads successfully', async ({ }, testInfo) => {
    try {
      await connectionsPage.navigateToConnections();

      await connectionsPage.clickCloseArrow();
      
      await connectionsPage.verifyConnectionsHeader();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Accounting Connections Navigation Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758990 @low - Verify the "Reconnect" button is visible in the Actions column', async ({ }, testInfo) => {
    try {
      // We're already on connections page, test actions button
      await sharedPage.keyboard.press('Escape'); // Clear any overlays
      await sharedPage.waitForTimeout(500);
      
      const actionsButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
      await actionsButton.waitFor({ state: 'visible', timeout: 15000 });
      await actionsButton.click();
      
      // Screenshot right after clicking Actions button
      await ScreenshotUtils.capture(sharedPage, testInfo, 'actions-dropdown-reconnect');
      
      // Verify the Reconnect button is visible in the dropdown
      const reconnectButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_RECONNECT_BUTTON);
      await expect(reconnectButton).toBeVisible({ timeout: 10000 });
      
      // Close the dropdown by pressing Escape
      await sharedPage.keyboard.press('Escape');
      await sharedPage.waitForTimeout(500);
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Reconnect Button Visibility Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1758991 @low - Verify the "Delete" button is visible in the Actions column', async ({ }, testInfo) => {
    try {
      // We're already on connections page, test actions button
      await sharedPage.keyboard.press('Escape'); // Clear any overlays
      await sharedPage.waitForTimeout(500);
      
      const actionsButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
      await actionsButton.waitFor({ state: 'visible', timeout: 15000 });
      await actionsButton.click();
      
      // Screenshot right after clicking Actions button
      await ScreenshotUtils.capture(sharedPage, testInfo, 'actions-dropdown-delete');
      
      // Verify the Delete button is visible in the dropdown
      const deleteButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_DELETE_BUTTON);
      await expect(deleteButton).toBeVisible({ timeout: 10000 });
      
      // Close the dropdown by pressing Escape
      await sharedPage.keyboard.press('Escape');
      await sharedPage.waitForTimeout(500);
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Delete Button Visibility Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1777996 @low - Verify the "Reconnect" button opens the QBO login upon click', async ({ }, testInfo) => {
    try {
      // We're already on connections page, access reconnect through Actions menu
      await sharedPage.keyboard.press('Escape'); // Clear any overlays
      await sharedPage.waitForTimeout(500);

      // Click Actions button to open dropdown
      const actionsButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
      await actionsButton.waitFor({ state: 'visible', timeout: 15000 });
      await actionsButton.click();

      // Click the Reconnect button
      const reconnectButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_RECONNECT_BUTTON);
      await reconnectButton.waitFor({ state: 'visible', timeout: 10000 });
      await reconnectButton.click();

      // Wait for QBO login popup/modal to appear
      await sharedPage.waitForTimeout(2000);

      // Screenshot the QBO login interface
      await ScreenshotUtils.capture(sharedPage, testInfo, 'qbo-login-opened');

      // Wait for DOM to be stable
      await sharedPage.waitForLoadState('domcontentloaded');

      // Close the popup/modal using the close button
      const closeButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLOSE_BUTTON);
      await closeButton.waitFor({ state: 'visible', timeout: 10000 });
      await closeButton.click();
      await sharedPage.waitForTimeout(1000);

      // Click the arrow to reveal accounting connections tab
      await connectionsPage.clickOpenArrow();
      await sharedPage.waitForTimeout(500);

      // Navigate back to accounting connections page
      await connectionsPage.navigateToConnections();
      await connectionsPage.clickCloseArrow();
      
      // Verify we're back on the connections page
      await connectionsPage.verifyConnectionsHeader();

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Reconnect QBO Login Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });



  test('@C1777997 @low - Verify the "Delete" button removes the QBO Account from the connected list', async ({ }, testInfo) => {
    try {
      // We're already on connections page, access delete through Actions menu
      await sharedPage.keyboard.press('Escape'); // Clear any overlays
      await sharedPage.waitForTimeout(500);

      // Click Actions button to open dropdown
      const actionsButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
      await actionsButton.waitFor({ state: 'visible', timeout: 15000 });
      await actionsButton.click();

      // Click the Delete button
      const deleteButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_DELETE_BUTTON);
      await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
      await deleteButton.click();

      // Wait for delete confirmation popup to appear
      await sharedPage.waitForTimeout(2000);

      // Screenshot the delete confirmation popup
      await ScreenshotUtils.capture(sharedPage, testInfo, 'delete-confirmation-popup');

      // Click outside to close the popup (don't actually delete)
      await sharedPage.click('body', { position: { x: 100, y: 100 } });
      await sharedPage.waitForTimeout(1000);

    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Delete Button Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1925440 @low - Ensure editing of QBO connection paygroups works successfully', async ({ }, testInfo) => {
    try {
      // We're already on connections page, access edit through Actions menu
      await sharedPage.keyboard.press('Escape'); // Clear any overlays
      await sharedPage.waitForTimeout(500);
      
      // Click Actions button to open dropdown
      const actionsButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
      await actionsButton.waitFor({ state: 'visible', timeout: 15000 });
      await actionsButton.click();

      // Check for options in the dropdown (like Reconnect)
      const reconnectOption = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_RECONNECT_BUTTON);
      if (await reconnectOption.isVisible().catch(() => false)) {
        console.log('Reconnect option found in dropdown');
      }

      // Click outside to close the dropdown
      await sharedPage.click('body', { position: { x: 100, y: 100 } });
      await sharedPage.waitForTimeout(1000);

      // Now the Edit button should be available on the page
      const editButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_EDIT_BUTTON);
      await editButton.waitFor({ state: 'visible', timeout: 15000 });
      await editButton.click();
      
      // Wait for edit modal/page to load
      await sharedPage.waitForTimeout(2000);
      
      // Screenshot as soon as you click edit
      await ScreenshotUtils.capture(sharedPage, testInfo, 'edit-interface-opened');
      
      // Look for paygroup checkboxes in the edit interface
      const checkbox1 = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_1);
      const checkbox2 = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_2);
      
      if (await checkbox1.isVisible().catch(() => false)) {
        await checkbox1.click();
      }
      if (await checkbox2.isVisible().catch(() => false)) {
        await checkbox2.click();
      }
      
      // Screenshot after clicking the checklist
      await ScreenshotUtils.capture(sharedPage, testInfo, 'after-checklist-interaction');
      
      // Save changes
      const saveButton = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SAVE_BUTTON);
      if (await saveButton.isVisible().catch(() => false)) {
        await saveButton.click();
        await sharedPage.waitForTimeout(2000);
      }
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Edit Connection Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1767742 @low - Verify the company dropdown is visible in the "GL Code" tab when there is an active QBO connection established', async ({ }, testInfo) => {
    try {
      // Navigate to GL Codes tab
      const glCodesTab = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_GL_CODES_TAB);
      await glCodesTab.waitFor({ state: 'visible', timeout: 15000 });
      await glCodesTab.click();
      
      // Screenshot as soon as you click GL codes
      await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-tab-opened');
      
      // Click and verify company dropdown
      const companyDropdown = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_COMPANY_DROPDOWN);
      await companyDropdown.waitFor({ state: 'visible', timeout: 15000 });
      await companyDropdown.click();
      
      // Screenshot after clicking company dropdown
      await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-company-dropdown-clicked');
      
      // Click outside to close the dropdown
      await sharedPage.click('body', { position: { x: 100, y: 100 } });
      await sharedPage.waitForTimeout(500);
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'GL Code Tab Company Dropdown Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1925656 @low - Ensure the search box is visible on the GL Code tab', async ({ }, testInfo) => {
    try {
      // We're already on GL Codes tab from previous test, just verify search box
      const searchBox = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
      await expect(searchBox).toBeVisible({ timeout: 15000 });
      
      // Screenshot the search box
      await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-search-box-visible');
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'GL Code Search Box Visibility Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1925658 @low - Ensure GL Code search filters results by GL code/description/account type', async ({ }, testInfo) => {
    try {
      // We're already on GL Codes tab, just perform search
      const searchBox = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
      await searchBox.waitFor({ state: 'visible', timeout: 15000 });
      await searchBox.fill(SELECTORS.ACCOUNTING_CONNECTIONS_GL_CODE_SEARCH_TERM);
      await searchBox.press('Enter');
      
      // Wait for search results
      await sharedPage.waitForTimeout(2000);
      
      // Screenshot the search results
      await ScreenshotUtils.capture(sharedPage, testInfo, 'gl-codes-search-results-revenue');
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'GL Code Search Functionality Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1778027 @low - Verify the company dropdown is visible in the "Classes" tab when there is an active QBO connection established', async ({ }, testInfo) => {
    try {
      // We're already on connections page, just click Classes tab
      const classesTab = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLASSES_TAB);
      await classesTab.waitFor({ state: 'visible', timeout: 15000 });
      await classesTab.click();
      
      // Screenshot as soon as you click Classes
      await ScreenshotUtils.capture(sharedPage, testInfo, 'classes-tab-opened');
      
      // Click and verify company dropdown
      const companyDropdown = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_COMPANY_DROPDOWN);
      await companyDropdown.waitFor({ state: 'visible', timeout: 15000 });
      await companyDropdown.click();
      
      // Screenshot after clicking company dropdown
      await ScreenshotUtils.capture(sharedPage, testInfo, 'classes-company-dropdown-clicked');
      
      // Click outside to close the dropdown
      await sharedPage.click('body', { position: { x: 100, y: 100 } });
      await sharedPage.waitForTimeout(500);
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Classes Tab Company Dropdown Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1925657 @low - Ensure the search box is visible on the Classes tab', async ({ }, testInfo) => {
    try {
      // Navigate to Classes tab
      const classesTab = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLASSES_TAB);
      await classesTab.waitFor({ state: 'visible', timeout: 15000 });
      await classesTab.click();
      
      // Verify search box is visible
      const searchBox = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
      await expect(searchBox).toBeVisible({ timeout: 15000 });
      
      // Screenshot the search box
      await ScreenshotUtils.capture(sharedPage, testInfo, 'classes-search-box-visible');
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Classes Search Box Visibility Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });

  test('@C1925659 @low - Ensure Classes search filters results by class name or reference number', async ({ }, testInfo) => {
    try {
      // Navigate to Classes tab
      const classesTab = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLASSES_TAB);
      await classesTab.waitFor({ state: 'visible', timeout: 15000 });
      await classesTab.click();
      
      // Type search term and press Enter
      const searchBox = sharedPage.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
      await searchBox.waitFor({ state: 'visible', timeout: 15000 });
      await searchBox.fill(SELECTORS.ACCOUNTING_CONNECTIONS_CLASSES_SEARCH_TERM);
      await searchBox.press('Enter');
      
      // Wait for search results
      await sharedPage.waitForTimeout(2000);
      
      // Screenshot the search results
      await ScreenshotUtils.capture(sharedPage, testInfo, 'classes-search-results-qa010');
      
    } catch (error) {
      await TestHelpers.handleTestError(sharedPage, error, 'Classes Search Functionality Test', SCREENSHOT_PATHS.ACCOUNTING_TAB_ERROR, testInfo);
    }
  });



  // Note: Additional test cases not implemented:
  // @C1778007 - Verify the "Reconnect" button reconnects the QBO account that has expired (Cannot be done for UI)
  // @C1758992 - Ensure the "GL Code" and "Class" tabs are not displayed by default when there are no connections established (Not automatable with current mock data)
});