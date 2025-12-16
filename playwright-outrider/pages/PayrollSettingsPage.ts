import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../configs/constants';
import { TestHelpers } from '../utils/testHelpers';

export class PayrollSettingsPage {
  readonly page: Page;
  readonly settingsLink: Locator;
  readonly closeArrow: Locator;
  readonly payrollSettingsHeader: Locator;
  readonly companyDropdown: Locator;
  readonly companyOption2: Locator;
  readonly postingDateDropdown: Locator;
  readonly checkDateOption: Locator;
  readonly paperChecksDropdown: Locator;
  readonly summaryOption: Locator;
  readonly header: Locator;
  readonly nav1: Locator;
  readonly nav2: Locator;
  readonly nav3: Locator;
  readonly connectedAccount: Locator;
  readonly postingDate: Locator;
  readonly paperChecks: Locator;
  readonly glAssignments: Locator;
  readonly individual: Locator;
  readonly summary: Locator;


  constructor(page: Page) {
    this.page = page;
    this.settingsLink = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_LINK);
    this.closeArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CLOSE_ARROW);
    this.payrollSettingsHeader = page.locator(SELECTORS.ACCOUNTING_PAYROLL_SETTINGS_HEADER);

    // New locators for payroll settings configuration
    this.companyDropdown = page.locator('//*[@id="buffet-dropdown-5"]/div');
    this.companyOption2 = page.locator('//*[@id="dropdown-contents-7"]/ul/li[2]');
    this.postingDateDropdown = page.locator('(//button/div[contains(text(),"Select posting date")])[1]');
    this.checkDateOption = page.locator('//*[@id="dropdown-contents-12"]/ul/li[2]');
    this.paperChecksDropdown = page.locator('(//button/div[contains(text(),"Select paper checks option")])[1]');
    this.summaryOption = page.locator('//*[@id="dropdown-contents-17"]/ul/li[2]');

    this.header = page.locator(SELECTORS.ACCOUNTING_PAYROLL_SETTINGS_HEADER);
    this.nav1 = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION1);
    this.nav2 = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION2);
    this.nav3 = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION3);
    this.connectedAccount = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_CONNECTED_ACCOUNT);
    this.postingDate = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_POSTING_DATE);
    this.paperChecks = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_PAPER_CHECKS);
    this.glAssignments = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_GL_ASSIGNMENTS);
    this.individual = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_INDIVIDUAL);
    this.summary = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_SUMMARY);


  }

  /**
   * Navigate to the Payroll Settings page using new navigation flow
   */
  async navigateToSettings(): Promise<void> {
    try {
      // Try new navigation flow first: Financial Products → Accounting → Payroll Settings
      try {
        const financialProductsTab = this.page.locator(SELECTORS.FINANCIAL_PRODUCTS_TAB);
        const accountingDropdown = this.page.locator(SELECTORS.ACCOUNTING_DROPDOWN);

        await financialProductsTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await financialProductsTab.click();

        await accountingDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await accountingDropdown.click();

        // Click on Payroll Settings link
        await this.settingsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await this.settingsLink.click();
        await TestHelpers.waitForPageLoad(this.page);
        return;
      } catch (newFlowError) {
        console.log('New navigation flow failed, trying legacy method:', newFlowError);
      }

      // Fallback to legacy method
      await this.settingsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.settingsLink.click();
      await TestHelpers.waitForPageLoad(this.page);
    } catch (error) {
      throw new Error(`Failed to navigate to payroll settings: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verify payroll settings header is visible
   */
  async verifyPayrollSettingsHeader(): Promise<void> {
    try {
      await expect(this.payrollSettingsHeader).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify payroll settings header: ${error instanceof Error ? error.message : String(error)}`);
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
   * Select company option 2 from dropdown
   */
  async selectCompanyOption2(): Promise<void> {
    try {
      await this.companyDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.companyDropdown.click();
      await this.companyOption2.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.companyOption2.click();
    } catch (error) {
      throw new Error(`Failed to select company option 2: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Select check date from posting date dropdown
   */
  async selectCheckDate(): Promise<void> {
    try {
      await this.postingDateDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.postingDateDropdown.click();
      await this.checkDateOption.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.checkDateOption.click();
    } catch (error) {
      throw new Error(`Failed to select check date: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Select summary from paper checks dropdown
   */
  async selectPaperChecksSummary(): Promise<void> {
    try {
      await this.paperChecksDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.paperChecksDropdown.click();
      await this.summaryOption.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.summaryOption.click();
    } catch (error) {
      throw new Error(`Failed to select paper checks summary: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 