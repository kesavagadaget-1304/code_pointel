import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../configs/constants';
import { TestHelpers } from '../utils/testHelpers';

export class AccountingConnectionsPage {
  readonly page: Page;
  readonly connectionsLink: Locator;
  readonly closeArrow: Locator;
  readonly openArrow: Locator;
  readonly connectionsHeader: Locator;
  
  // Connection Actions
  readonly actionsButton: Locator;
  readonly reconnectButton: Locator;
  readonly deleteButton: Locator;
  
  // Edit Functionality
  readonly editButton: Locator;
  readonly paygroupCheckbox1: Locator;
  readonly paygroupCheckbox2: Locator;
  readonly saveButton: Locator;
  
  // Modal and Navigation
  readonly closeButton: Locator;
  
  // Tabs
  readonly glCodesTab: Locator;
  readonly classesTab: Locator;
  
  // Search
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectionsLink = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CONNECTIONS_LINK);
    this.closeArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CLOSE_ARROW);
    this.openArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_OPEN_ARROW);
    this.connectionsHeader = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_HEADER);
    
    // Connection Actions
    this.actionsButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON);
    this.reconnectButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_RECONNECT_BUTTON);
    this.deleteButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_DELETE_BUTTON);
    
    // Edit Functionality
    this.editButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_EDIT_BUTTON);
    this.paygroupCheckbox1 = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_1);
    this.paygroupCheckbox2 = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_2);
    this.saveButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SAVE_BUTTON);
    
    // Modal and Navigation
    this.closeButton = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLOSE_BUTTON);
    
    // Tabs
    this.glCodesTab = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_GL_CODES_TAB);
    this.classesTab = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_CLASSES_TAB);
    
    // Search
    this.searchInput = page.locator(SELECTORS.ACCOUNTING_CONNECTIONS_SEARCH_INPUT);
  }

  /**
   * Navigate to the Accounting Connections page using new navigation flow
   */
  async navigateToConnections(): Promise<void> {
    try {
      // Simple escape to close any open dropdowns
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      
      // Try new navigation flow first: Financial Products → Accounting → Accounting Connections
      try {
        const financialProductsTab = this.page.locator(SELECTORS.FINANCIAL_PRODUCTS_TAB);
        const accountingDropdown = this.page.locator(SELECTORS.ACCOUNTING_DROPDOWN);
        
        await financialProductsTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await financialProductsTab.click();
        
        await accountingDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await accountingDropdown.click();
        
        // Click on Accounting Connections link
        await this.connectionsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await this.connectionsLink.click();
        await TestHelpers.waitForPageLoad(this.page);
        return;
      } catch (newFlowError) {
        console.log('New navigation flow failed, trying legacy method:', newFlowError);
      }
      
      // Fallback to legacy method
      await this.connectionsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.connectionsLink.click();
      await TestHelpers.waitForPageLoad(this.page);
    } catch (error) {
      throw new Error(`Failed to navigate to connections: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verify accounting connections header is visible
   */
  async verifyConnectionsHeader(): Promise<void> {
    try {
      await expect(this.connectionsHeader).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify connections header: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click close arrow to return to main accounting view
   */
  async clickCloseArrow(): Promise<void> {
    try {
      await this.closeArrow.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.closeArrow.click();
    } catch (error) {
      throw new Error(`Failed to click close arrow: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click open arrow to reveal accounting connections tab
   */
  async clickOpenArrow(): Promise<void> {
    try {
      await this.openArrow.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.openArrow.click();
    } catch (error) {
      throw new Error(`Failed to click open arrow: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Connection Actions Methods
  async verifyReconnectButtonVisible(): Promise<void> {
    try {
      await this.actionsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.actionsButton.click();
      await expect(this.reconnectButton).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify reconnect button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async clickReconnectButton(): Promise<void> {
    try {
      await this.actionsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.actionsButton.click();
      await this.reconnectButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.reconnectButton.click();
    } catch (error) {
      throw new Error(`Failed to click reconnect button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyReconnectionSuccess(): Promise<void> {
    try {
      // Wait for panel to appear after reconnect button click
      await this.page.waitForTimeout(2000);
      
      // Close the panel that opens after reconnect
      await this.closeButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.closeButton.click();
      
      // Wait for redirect to payroll settings
      await this.page.waitForTimeout(2000);
      
      // Navigate back to accounting connections tab
      await this.navigateToConnections();
      
      // Verify we're back on the connections page
      await expect(this.connectionsHeader).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
      
      // Verify actual reconnection success - check for connected status indicators
      // Look for success indicators like "Connected", "Active", or absence of "Reconnect" button
      const connectedStatus = this.page.locator('//div[contains(text(), "Connected") or contains(text(), "Active") or contains(text(), "Synced")]');
      const reconnectButtonStillVisible = this.page.locator('//div[contains(text(), "Reconnect")]');
      
      // Verify connection is now active (either success status is visible OR reconnect button is NOT visible)
      try {
        await expect(connectedStatus).toBeVisible({ timeout: 5000 });
      } catch (error) {
        // If success status not found, verify reconnect button is no longer visible
        await expect(reconnectButtonStillVisible).not.toBeVisible({ timeout: 5000 });
      }
      
    } catch (error) {
      throw new Error(`Failed to verify reconnection success: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyDeleteButtonVisible(): Promise<void> {
    try {
      await this.actionsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.actionsButton.click();
      await expect(this.deleteButton).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify delete button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async clickDeleteButton(): Promise<void> {
    try {
      await this.actionsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.actionsButton.click();
      await this.deleteButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.deleteButton.click();
    } catch (error) {
      throw new Error(`Failed to click delete button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async confirmDelete(): Promise<void> {
    try {
      // This might need adjustment based on actual confirmation dialog
      await this.page.keyboard.press('Enter');
    } catch (error) {
      throw new Error(`Failed to confirm delete: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyConnectionRemoved(): Promise<void> {
    try {
      // Wait for connection to be removed - this might need adjustment based on actual UI behavior
      await this.page.waitForTimeout(2000);
      // Verify the connection is no longer visible
      await expect(this.actionsButton).not.toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify connection removed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyQBOLoginOpened(): Promise<void> {
    try {
      // Wait for QBO login modal to appear - this might need adjustment based on actual UI behavior
      await this.page.waitForTimeout(2000);
      // Look for QBO login elements
      const qboLoginElement = this.page.locator('//div[contains(text(), "QuickBooks") or contains(text(), "QBO")]');
      await expect(qboLoginElement).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify QBO login opened: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Tab Methods
  async clickGLCodeTab(): Promise<void> {
    try {
      await this.glCodesTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.glCodesTab.click();
    } catch (error) {
      throw new Error(`Failed to click GL Code tab: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async clickClassesTab(): Promise<void> {
    try {
      await this.classesTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.classesTab.click();
    } catch (error) {
      throw new Error(`Failed to click Classes tab: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyCompanyDropdownVisible(): Promise<void> {
    try {
      // This might need adjustment based on actual company dropdown selector
      const companyDropdown = this.page.locator('//select[contains(@aria-label, "Company") or contains(@class, "company")]');
      await expect(companyDropdown).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify company dropdown: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async verifyTabsNotVisible(): Promise<void> {
    try {
      await expect(this.glCodesTab).not.toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
      await expect(this.classesTab).not.toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify tabs not visible: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 