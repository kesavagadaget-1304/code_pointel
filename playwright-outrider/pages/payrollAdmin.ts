import { type Locator, type Page } from '@playwright/test';
import { SELECTORS } from '../configs/constants';

export class PayrollAdmin {
  readonly page: Page;
  readonly payrollViewpayroll: Locator;
  readonly payrollTenantDropdown: Locator;
  readonly payrollSearchRestaurant: Locator;
  readonly payrollRestaurantOption: Locator;
  readonly payrollPreview: Locator;
  readonly payrollPageTotalAmount: Locator;
  readonly payrollStartPayroll: Locator;
  readonly payrollStartPayrollAnyway: Locator;
  readonly payrollCalculatePayroll: Locator;
  readonly payrollCalculatePayrollContinue: Locator;
  readonly payrollPaydate: Locator;
  readonly payrollPageEstimatedWithdrawalAmount: Locator;
  readonly payrollSubmitPayroll: Locator;
  readonly payrollSubmitPayrollConfirmed: Locator;
  readonly payrollAccountMenu: Locator;
  readonly payrollLogout: Locator;
  readonly payrollPayrollPostedSuccess: Locator;
  readonly payrollConfigTemplate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payrollViewpayroll= page.locator(SELECTORS.PAYROLL_ADMIN_VIEW_PAYROLL),
    this.payrollTenantDropdown= page.locator(SELECTORS.PAYROLL_ADMIN_TENANT_DROPDOWN),
    this.payrollSearchRestaurant= page.locator(SELECTORS.PAYROLL_ADMIN_SEARCH_RESTAURANT),
    this.payrollRestaurantOption= page.locator(SELECTORS.PAYROLL_ADMIN_RESTAURANT_OPTION),
    this.payrollPreview= page.locator(SELECTORS.PAYROLL_ADMIN_PREVIEW),
    this.payrollPageTotalAmount= page.locator(SELECTORS.PAYROLL_ADMIN_PAGE_TOTAL_AMOUNT),
    this.payrollStartPayroll= page.locator(SELECTORS.PAYROLL_ADMIN_START_PAYROLL),
    this.payrollStartPayrollAnyway= page.locator(SELECTORS.PAYROLL_ADMIN_START_PAYROLL_ANYWAY),
    this.payrollCalculatePayroll= page.locator(SELECTORS.PAYROLL_ADMIN_CALCUALTE_PAYROLL),
    this.payrollCalculatePayrollContinue= page.locator(SELECTORS.PAYROLL_ADMIN_CALCUALTE_PAYROLL_CONTINUE),
    this.payrollPaydate= page.locator(SELECTORS.PAYROLL_ADMIN_PAYDATE),
    this.payrollPageEstimatedWithdrawalAmount= page.locator(SELECTORS.  PAYROLL_ADMIN_PAGE_ESTIMATED_WITHDRAWAL_AMOUNT),
    this.payrollSubmitPayroll= page.locator(SELECTORS.PAYROLL_ADMIN_SUBMIT_PAYROLL),
    this.payrollSubmitPayrollConfirmed= page.locator(SELECTORS.PAYROLL_ADMIN_SUBMIT_PAYROLL_CONFIRMED),
    this.payrollAccountMenu= page.locator(SELECTORS.PAYROLL_ADMIN_ACCOUNT_MENU),
    this.payrollLogout= page.locator(SELECTORS.PAYROLL_ADMIN_LOGOUT),
    this.payrollPayrollPostedSuccess= page.locator(SELECTORS.PAYROLL_ADMIN_PAYROLL_POSTED_SUCCESS),
    this.payrollConfigTemplate= page.locator(SELECTORS.PAYROLL_ADMIN_CONFIG_TEMPLATE)
    






  }
}