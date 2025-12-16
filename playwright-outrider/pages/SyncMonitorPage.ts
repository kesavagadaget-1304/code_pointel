import { Page, Locator, expect } from '@playwright/test';
import { XC_SELECTORS, XC_TIMEOUTS, XC_SALES_ENTRY_VALUES } from '../configs/xc_constants';

/**
 * Sync Monitor Page Object Model
 * Handles sync monitor page interactions and sales journal entry creation
 */
export class SyncMonitorPage {
  readonly page: Page;
  readonly syncMonitorButton: Locator;
  readonly xcActionsButton: Locator;
  readonly xcAddSalesEntryButton: Locator;
  readonly xcAddButton: Locator;
  readonly xcAddSalesCategoryButton: Locator;
  readonly xcSelectHeadsDropdownBox: Locator;
  readonly xcSelectFirstOption: Locator;
  readonly xcCreditField: Locator;
  readonly xcAddPaymentButton: Locator;
  readonly xcDebitField: Locator;
  readonly xcSaveJournalButton: Locator;
  readonly xcSalesJournalActionsButton: Locator;
  readonly xcSyncToQboButton: Locator;
  readonly xcSalesJournalCloseButton: Locator;
  readonly xcSyncSuccessLabel: Locator;
  readonly xcViewEditToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.syncMonitorButton = page.locator(XC_SELECTORS.SYNC_MONITOR_BUTTON);
    this.xcActionsButton = page.locator(XC_SELECTORS.XC_ACTIONS_BUTTON);
    this.xcAddSalesEntryButton = page.locator(XC_SELECTORS.XC_ADD_SALES_ENTRY_BUTTON);
    this.xcAddButton = page.locator(XC_SELECTORS.XC_ADD_BUTTON);
    this.xcAddSalesCategoryButton = page.locator(XC_SELECTORS.XC_ADD_SALES_CATEGORY_BUTTON);
    this.xcSelectHeadsDropdownBox = page.locator(XC_SELECTORS.XC_SELECT_HEADS_DROPDOWN_BOX);
    this.xcSelectFirstOption = page.locator(XC_SELECTORS.XC_SELECT_FIRST_OPTION);
    this.xcCreditField = page.locator(XC_SELECTORS.XC_CREDIT_FIELD);
    this.xcAddPaymentButton = page.locator(XC_SELECTORS.XC_ADD_PAYMENT_BUTTON);
    this.xcDebitField = page.locator(XC_SELECTORS.XC_DEBIT_FIELD);
    this.xcSaveJournalButton = page.locator(XC_SELECTORS.XC_SAVE_JOURNAL_BUTTON);
    this.xcSalesJournalActionsButton = page.locator(XC_SELECTORS.XC_SALES_JOURNAL_ACTIONS_BUTTON);
    this.xcSyncToQboButton = page.locator(XC_SELECTORS.XC_SYNC_TO_QBO_BUTTON);
    this.xcSalesJournalCloseButton = page.locator(XC_SELECTORS.XC_SALES_JOURNAL_CLOSE_BUTTON);
    this.xcSyncSuccessLabel = page.locator(XC_SELECTORS.XC_SYNC_SUCCESS_LABEL);
    this.xcViewEditToggle = page.locator(XC_SELECTORS.XC_VIEW_EDIT_TOGGLE);
  }

  /**
   * Click the sync monitor button
   */
  async clickSyncMonitor(): Promise<void> {
    try {
      await this.syncMonitorButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.syncMonitorButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click sync monitor button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Add a sales journal entry (assumes we're already on the sales journal page)
   */
  async addSalesJournalEntry(): Promise<void> {
    try {
      console.log('📝 Creating new sales journal entry...');

      // Step 1: Add Sales Category
      await this.xcAddSalesCategoryButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcAddSalesCategoryButton.click();
      console.log('✅ Clicked Add Sales Category button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 2: Select heads dropdown
      await this.xcSelectHeadsDropdownBox.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSelectHeadsDropdownBox.click();
      console.log('✅ Clicked Select heads dropdown');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 3: Select first option
      await this.xcSelectFirstOption.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSelectFirstOption.click();
      console.log('✅ Selected first option');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 4: Fill credit field with correct value
      await this.xcCreditField.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcCreditField.dblclick(); // Double-click to select all text
      await this.page.keyboard.type(XC_SALES_ENTRY_VALUES.CREDIT_VALUE);
      console.log(`✅ Typed credit field with ${XC_SALES_ENTRY_VALUES.CREDIT_VALUE}`);
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 5: Add Payment
      await this.xcAddPaymentButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcAddPaymentButton.click();
      console.log('✅ Clicked Add Payment button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 6: Select heads dropdown for payment
      await this.xcSelectHeadsDropdownBox.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSelectHeadsDropdownBox.click();
      console.log('✅ Clicked Select heads dropdown for payment');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 7: Select first option for payment
      await this.xcSelectFirstOption.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSelectFirstOption.click();
      console.log('✅ Selected first option for payment');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 8: Fill debit field with correct value
      await this.xcDebitField.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcDebitField.dblclick(); // Double-click to select all text
      await this.page.keyboard.type(XC_SALES_ENTRY_VALUES.DEBIT_VALUE);
      console.log(`✅ Typed debit field with ${XC_SALES_ENTRY_VALUES.DEBIT_VALUE}`);
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 9: Save journal entry
      await this.xcSaveJournalButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSaveJournalButton.click();
      console.log('✅ Clicked Save journal button');

      // Wait for save to complete
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000); // Give time for save to complete
      console.log('✅ Sales journal entry saved successfully');

    } catch (error) {
      throw new Error(`Failed to add sales journal entry: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Sync the sales journal entry to QBO
   */
  async syncSalesJournalToQBO(): Promise<void> {
    try {
      console.log('🔄 Starting sales journal sync to QBO...');

      // Step 1: Click sales journal actions button
      await this.xcSalesJournalActionsButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSalesJournalActionsButton.click();
      console.log('✅ Clicked sales journal actions button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 2: Click Sync to QuickBooks
      await this.xcSyncToQboButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSyncToQboButton.click();
      console.log('✅ Clicked Sync to QuickBooks');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 3: Close the sales journal page
      await this.xcSalesJournalCloseButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSalesJournalCloseButton.click();
      console.log('✅ Closed sales journal page');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 4: Wait for sync to process (10-15 seconds)
      console.log('⏳ Waiting for sync to process (15 seconds)...');
      await this.page.waitForTimeout(15000); // 15 seconds wait for sync

      // Step 5: Refresh the page to see sync status
      console.log('🔄 Refreshing page to check sync status...');
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000); // Give time for page to fully load

      // Step 6: Wait for sync success label to appear
      await this.xcSyncSuccessLabel.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      console.log('✅ Sync success label appeared');

      // Wait a bit more for sync to complete
      await this.page.waitForTimeout(3000);
      console.log('✅ Sales journal sync to QBO completed successfully');

    } catch (error) {
      throw new Error(`Failed to sync sales journal to QBO: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Complete the full sales journal entry flow
   */
  async completeSalesJournalEntryFlow(): Promise<void> {
    try {
      // Step 1: Click Actions button
      await this.xcActionsButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcActionsButton.click();
      console.log('✅ Clicked Actions button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 2: Click Sales entry from dropdown
      await this.xcAddSalesEntryButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcAddSalesEntryButton.click();
      console.log('✅ Clicked Sales entry');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 3: Click Add button
      await this.xcAddButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcAddButton.click();
      console.log('✅ Clicked Add button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 4: Now check if sales entry already exists (after we're on the sales journal page)
      const hasExistingEntry = await this.checkForExistingSalesEntry();
      
      if (hasExistingEntry) {
        // Existing entry found - sync it directly
        await this.syncExistingSalesEntry();
        console.log('✅ Existing sales entry sync flow completed successfully');
      } else {
        // No existing entry - continue with normal creation flow
        await this.addSalesJournalEntry();
        await this.syncSalesJournalToQBO();
        console.log('✅ New sales journal entry flow completed successfully');
      }
      
      console.log('✅ Sales journal entry flow completed successfully');
    } catch (error) {
      throw new Error(`Failed to complete sales journal entry flow: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Check if a sales entry already exists for today
   */
  async checkForExistingSalesEntry(): Promise<boolean> {
    try {
      // Wait a bit for the page to load after clicking Add button
      await this.page.waitForTimeout(2000);
      
      // Check if the view/edit toggle exists
      const toggleExists = await this.xcViewEditToggle.isVisible();
      
      if (toggleExists) {
        console.log('📋 Existing sales entry detected - will sync existing entry');
        return true;
      } else {
        console.log('📝 No existing sales entry found - will create new entry');
        return false;
      }
    } catch (error) {
      console.log('📝 No existing sales entry found - will create new entry');
      return false;
    }
  }

  /**
   * Sync an existing sales entry to QBO
   */
  async syncExistingSalesEntry(): Promise<void> {
    try {
      console.log('🔄 Syncing existing sales entry to QBO...');
      
      // Step 1: Click sales journal actions button
      await this.xcSalesJournalActionsButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSalesJournalActionsButton.click();
      console.log('✅ Clicked sales journal actions button');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 2: Click Sync to QuickBooks
      await this.xcSyncToQboButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSyncToQboButton.click();
      console.log('✅ Clicked Sync to QuickBooks');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 3: Close the sales journal page
      await this.xcSalesJournalCloseButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.xcSalesJournalCloseButton.click();
      console.log('✅ Closed sales journal page');
      await this.page.waitForTimeout(3000); // Demo wait

      // Step 4: Wait for sync to process (10-15 seconds)
      console.log('⏳ Waiting for sync to process (15 seconds)...');
      await this.page.waitForTimeout(15000); // 15 seconds wait for sync

      // Step 5: First refresh to check sync status
      console.log('🔄 First refresh to check sync status...');
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000); // Give time for page to fully load

      // Step 6: Second refresh to get success status (since existing entries go back to pending)
      console.log('🔄 Second refresh to get success status...');
      await this.page.reload();
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000); // Give time for page to fully load

      // Step 7: Wait for sync success label to appear
      await this.xcSyncSuccessLabel.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      console.log('✅ Sync success label appeared');

      // Wait a bit more for sync to complete
      await this.page.waitForTimeout(3000);
      console.log('✅ Existing sales entry sync to QBO completed successfully');

    } catch (error) {
      throw new Error(`Failed to sync existing sales entry to QBO: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 