import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../configs/constants';
import { ScreenshotUtils } from '../utils/screenshotUtils';

export class Accountingetoe {
  readonly page: Page;
  
  // Financial Products and Accounting navigation
  readonly financialProductsTab: Locator;
  readonly accountingDropdown: Locator;
  
  // Accounting tab and navigation (legacy)
  readonly accountingTab: Locator;
  readonly accountingOpenArrow: Locator;
  readonly accountingCloseArrow: Locator;
  readonly accountingActivityHeader: Locator;
  readonly checklistCloseButton: Locator;
  
  // Calendar navigation
  readonly previousMonthButton: Locator;
  readonly nextMonthButton: Locator;
  readonly calendarPicker: Locator;
  readonly selectMonth: Locator;
  
  // Payroll status indicators
  readonly successPayroll: Locator;
  readonly failedPayroll: Locator;
  readonly inProgressPayroll: Locator;
  
  // Connections and filters
  readonly connectionsSelector: Locator;
  readonly qboCompanyOption: Locator;
  readonly paygroupFilter: Locator;
  readonly clearFilterButton: Locator;
  readonly paygroupSearchInput: Locator;
  
  // Filter options
  readonly selectAllFilter: Locator;
  readonly selectOption1: Locator;
  readonly selectOption2: Locator;
  
  // Notifications
  readonly notificationsButton: Locator;
  
  // Modal close button
  readonly modalCloseButton: Locator;
  

  
  // Notifications tab/panel
  readonly notificationsTab: Locator;
  readonly notificationsPanel: Locator;
  readonly notificationsClose: Locator;
  readonly markAllReadButton: Locator;
  
  // Notification filter buttons
  readonly notificationsAllButton: Locator;
  readonly notificationsErrorButton: Locator;
  readonly notificationsWarningButton: Locator;

  // Login to QBO button
  readonly loginToQBO: Locator;
  readonly intuitSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize Financial Products and Accounting navigation locators
    this.financialProductsTab = page.locator(SELECTORS.FINANCIAL_PRODUCTS_TAB);
    this.accountingDropdown = page.locator(SELECTORS.ACCOUNTING_DROPDOWN);
    
    // Initialize legacy locators
    this.accountingTab = page.locator(SELECTORS.ACCOUNTING_MAIN_TAB);
    this.accountingOpenArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_OPEN_ARROW);
    this.accountingCloseArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CLOSE_ARROW);
    this.accountingActivityHeader = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_HEADER);
    this.checklistCloseButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CHECKLIST_CLOSE_BUTTON);
    
    // Calendar navigation
    this.previousMonthButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PREVIOUS_MONTH_BUTTON);
    this.nextMonthButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NEXT_MONTH_BUTTON);
    this.calendarPicker = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CALENDAR_PICKER);
    this.selectMonth = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_SELECT_MONTH);
    
    // Payroll status indicators
    this.successPayroll = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_SUCCESS_PAYROLL);
    this.failedPayroll = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_FAILED_PAYROLL);
    this.inProgressPayroll = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_IN_PROGRESS_PAYROLL);
    
    // Connections and filters
    this.connectionsSelector = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CONNECTIONS_SELECTOR);
    this.qboCompanyOption = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_QBO_COMPANY_OPTION);
    this.paygroupFilter = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYGROUP_FILTER);
    this.clearFilterButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CLEAR_FILTER_BUTTON);
    this.paygroupSearchInput = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYGROUP_SEARCH_INPUT);
    
    // Filter options
    this.selectAllFilter = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_SELECT_ALL_FILTER);
    this.selectOption1 = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_SELECT_OPTION_1);
    this.selectOption2 = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_SELECT_OPTION_2);
    
    // Notifications
    this.notificationsButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_BUTTON);
    
    // Modal close button
    this.modalCloseButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_MODAL_CLOSE_BUTTON);
    

    
    // Notifications tab/panel
    this.notificationsTab = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_TAB);
    this.notificationsPanel = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_PANEL);
    this.notificationsClose = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_CLOSE);
    this.markAllReadButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_MARK_ALL_READ);
    
    // Notification filter buttons
    this.notificationsAllButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_ALL);
    this.notificationsErrorButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_ERROR);
    this.notificationsWarningButton = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_NOTIFICATIONS_WARNING);

    // Login to QBO button
    this.loginToQBO = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_LOGIN_TO_QBO);
    this.intuitSubmit = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_INTUIT_SUBMIT);


  }

  /**
   * Close checklist popup if present
   */
  async closeChecklist(): Promise<void> {
    try {
      await this.checklistCloseButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.checklistCloseButton.click();
    } catch {
      // Checklist not present, continue
    }
  }

  /**
   * Navigate to Financial Products tab
   */
  async clickFinancialProductsTab(): Promise<void> {
    try {
      await this.financialProductsTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.financialProductsTab.click();
    } catch (error) {
      throw new Error(`Failed to click Financial Products tab: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Accounting dropdown in Financial Products
   */
  async clickAccountingDropdown(): Promise<void> {
    try {
      await this.accountingDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.accountingDropdown.click();
    } catch (error) {
      throw new Error(`Failed to click Accounting dropdown: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Navigate to Accounting Activity using new navigation flow
   */
  async navigateToAccountingActivity(testInfo?: any): Promise<void> {
    try {
      // Close any checklist popup
      await this.closeChecklist();
      
      // Take screenshot of landing page after login
      if (testInfo) {
        await ScreenshotUtils.capture(this.page, testInfo, 'landing-page-after-login');
      }
      
      // Navigate through Financial Products → Arrow → Accounting → Accounting Activity
      await this.clickFinancialProductsTab();
      
      // Click the arrow to open the dropdown
      await this.page.locator(SELECTORS.ACCOUNTING_ACTIVITY_OPEN_ARROW).waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.page.locator(SELECTORS.ACCOUNTING_ACTIVITY_OPEN_ARROW).click();
      
      await this.clickAccountingDropdown();
      
      // Click on Activity link
      await this.page.locator(SELECTORS.ACCOUNTING_ACTIVITY_LINK).waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.page.locator(SELECTORS.ACCOUNTING_ACTIVITY_LINK).click();
      
    } catch (error) {
      throw new Error(`Failed to navigate to Accounting Activity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click accounting tab (legacy method - kept for backward compatibility)
   */
  async clickAccountingTab(): Promise<void> {
    try {
      // Close any checklist popup
      await this.closeChecklist();
      
      // Try new navigation flow first
      try {
        await this.navigateToAccountingActivity();
        return;
      } catch (newFlowError) {
        console.log('New navigation flow failed, trying legacy method:', newFlowError);
      }
      
      // Fallback to legacy method
      await this.accountingTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.accountingTab.click();
      
      await this.accountingOpenArrow.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.accountingOpenArrow.click();
      
    } catch (error) {
      throw new Error(`Failed to click accounting tab: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Close accounting menu arrow
   */
  async clickCloseArrow(): Promise<void> {
    try {
      await this.accountingCloseArrow.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.accountingCloseArrow.click();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify accounting header is visible
   */
  async verifyAccountingHeader(): Promise<void> {
    try {
      await expect(this.accountingActivityHeader).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw error;
    }
  }

  

  /**
   * Check if accounting tab is visible
   */
  async isAccountingTabVisible(): Promise<boolean> {
    try {
      return await this.accountingTab.isVisible();
    } catch (error) {
      return false;
    }
  }

 


} 