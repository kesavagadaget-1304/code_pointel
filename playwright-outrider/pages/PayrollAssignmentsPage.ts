import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../configs/constants';
import { TestHelpers } from '../utils/testHelpers';

export class PayrollAssignmentsPage {
  readonly page: Page;
  readonly payrollAssignments: Locator;
  readonly closeArrow: Locator;
  readonly payrollAssignmentsHeader: Locator;

  // Payroll Assignments locators
  readonly paygroupDropdown: Locator;
  readonly selectPaygroup: Locator;
  readonly copyFromButton: Locator;
  readonly copyFromPaygroupDropdown: Locator;
  readonly copyFromSelectPaygroup: Locator;
  readonly copyFromClose: Locator;

  // Payroll Assignments section expand/collapse buttons
  readonly locationsSection: Locator;
  readonly earningsSection: Locator;
  readonly tipsSection: Locator;
  readonly deductionsSection: Locator;
  readonly employerTaxesSection: Locator;
  readonly feesSection: Locator;
  readonly bankWithdrawalsSection: Locator;
  readonly locations: Locator;
  readonly earnings: Locator;
  readonly tips: Locator;
  readonly deductions: Locator;
  readonly payrollTaxes: Locator;
  readonly otherExpenses: Locator;
  readonly bankWithdrawals: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payrollAssignments = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_PAYROLL_ASSIGNMENTS_LINK);
    this.closeArrow = page.locator(SELECTORS.ACCOUNTING_ACTIVITY_CLOSE_ARROW);
    this.payrollAssignmentsHeader = page.locator(SELECTORS.ACCOUNTING_PAYROLL_ASSIGNMENTS_HEADER);

    // Payroll Assignments locators
    this.paygroupDropdown = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_PAYGROUP_DROPDOWN);
    this.selectPaygroup = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_SELECT_PAYGROUP);
    this.copyFromButton = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_COPY_FROM_BUTTON);
    this.copyFromPaygroupDropdown = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_COPY_FROM_PAYGROUP_DROPDOWN);
    this.copyFromSelectPaygroup = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_COPY_FROM_SELECT_PAYGROUP);
    this.copyFromClose = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_COPY_FROM_CLOSE);

    // Payroll Assignments section expand/collapse buttons
    this.locationsSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_LOCATIONS_SECTION);
    this.earningsSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_EARNINGS_SECTION);
    this.tipsSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_TIPS_SECTION);
    this.deductionsSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_DEDUCTIONS_SECTION);
    this.employerTaxesSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_EMPLOYER_TAXES_SECTION);
    this.feesSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_FEES_SECTION);
    this.bankWithdrawalsSection = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_BANK_WITHDRAWALS_SECTION);


    //Subtabs
    this.locations = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_LOCATIONS);
    this.earnings = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_EARNINGS);
    this.tips = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_TIPS);
    this.deductions = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_DEDUCTIONS);
    this.payrollTaxes = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_PAYROLL_TAXES);
    this.otherExpenses = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_OTHER_EXPENSES);
    this.bankWithdrawals = page.locator(SELECTORS.PAYROLL_ASSIGNMENTS_BANK_WITHDRAWALS);
  }

  /**
   * Navigate to payroll assignments using new navigation flow
   */
  async clickPayrollAssignments(): Promise<void> {
    try {
      // Try new navigation flow first: Financial Products → Accounting → Payroll Assignments
      try {
        const financialProductsTab = this.page.locator(SELECTORS.FINANCIAL_PRODUCTS_TAB);
        const accountingDropdown = this.page.locator(SELECTORS.ACCOUNTING_DROPDOWN);

        await financialProductsTab.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await financialProductsTab.click();

        await accountingDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await accountingDropdown.click();

        // Click on Payroll Assignments link
        await this.payrollAssignments.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
        await this.payrollAssignments.click();
        await TestHelpers.waitForPageLoad(this.page);
        return;
      } catch (newFlowError) {
        console.log('New navigation flow failed, trying legacy method:', newFlowError);
      }

      // Fallback to legacy method
      await this.payrollAssignments.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.payrollAssignments.click();

      await TestHelpers.waitForPageLoad(this.page);
    } catch (error) {
      throw new Error(`Failed to navigate to payroll assignments: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verify payroll assignments header is visible
   */
  async verifyPayrollAssignmentsHeader(): Promise<void> {
    try {
      await expect(this.payrollAssignmentsHeader).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Failed to verify payroll assignments header: ${error instanceof Error ? error.message : String(error)}`);
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
   * Click paygroup name dropdown
   */
  async clickPaygroupDropdown(): Promise<void> {
    try {
      await this.paygroupDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.paygroupDropdown.click();
    } catch (error) {
      throw new Error(`Failed to click paygroup dropdown: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Select paygroup from dropdown
   */
  async clickSelectPaygroup(): Promise<void> {
    try {
      await this.selectPaygroup.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.selectPaygroup.click();
    } catch (error) {
      throw new Error(`Failed to select paygroup: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click copy from button
   */
  async clickCopyFromButton(): Promise<void> {
    try {
      await this.copyFromButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.copyFromButton.click();
    } catch (error) {
      throw new Error(`Failed to click copy from button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click paygroup dropdown in copy from modal
   */
  async clickCopyFromPaygroupDropdown(): Promise<void> {
    try {
      await this.copyFromPaygroupDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.copyFromPaygroupDropdown.click();
    } catch (error) {
      throw new Error(`Failed to click copy from paygroup dropdown: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Select paygroup in copy from modal
   */
  async selectPaygroupInCopyFromModal(): Promise<void> {
    try {
      await this.copyFromSelectPaygroup.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.copyFromSelectPaygroup.click();
    } catch (error) {
      throw new Error(`Failed to select paygroup in copy from modal: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Close copy from modal
   */
  async closeCopyFromModal(): Promise<void> {
    try {
      await this.copyFromClose.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.copyFromClose.click();
    } catch (error) {
      throw new Error(`Failed to close copy from modal: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Locations section expand/collapse button
   */
  async clickLocationsExpandCollapse(): Promise<void> {
    try {
      await this.locationsSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.locationsSection.click();
    } catch (error) {
      throw new Error(`Failed to click locations expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Earnings section expand/collapse button
   */
  async clickEarningsExpandCollapse(): Promise<void> {
    try {
      await this.earningsSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.earningsSection.click();
    } catch (error) {
      throw new Error(`Failed to click earnings expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Tips section expand/collapse button
   */
  async clickTipsExpandCollapse(): Promise<void> {
    try {
      await this.tipsSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.tipsSection.click();
    } catch (error) {
      throw new Error(`Failed to click tips expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Deductions section expand/collapse button
   */
  async clickDeductionsExpandCollapse(): Promise<void> {
    try {
      await this.deductionsSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.deductionsSection.click();
    } catch (error) {
      throw new Error(`Failed to click deductions expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Employer Taxes section expand/collapse button
   */
  async clickEmployerTaxesExpandCollapse(): Promise<void> {
    try {
      await this.employerTaxesSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.employerTaxesSection.click();
    } catch (error) {
      throw new Error(`Failed to click employer taxes expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Fees section expand/collapse button
   */
  async clickFeesExpandCollapse(): Promise<void> {
    try {
      await this.feesSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.feesSection.click();
    } catch (error) {
      throw new Error(`Failed to click fees expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click Bank Withdrawals section expand/collapse button
   */
  async clickBankWithdrawalsExpandCollapse(): Promise<void> {
    try {
      await this.bankWithdrawalsSection.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.bankWithdrawalsSection.click();
    } catch (error) {
      throw new Error(`Failed to click bank withdrawals expand/collapse button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 