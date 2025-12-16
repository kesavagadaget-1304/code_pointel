// XC Demo Constants
// This file contains all XC-specific constants for the demo session

export const XC_SELECTORS = {
  // Login selectors
  LOGIN_USERNAME_INPUT: '//input[@id="username"]',
  LOGIN_PASSWORD_INPUT: '//input[@id="password"]',
  LOGIN_CONTINUE_BUTTON: '//button[contains(text(),"Continue")]',
  NOT_THIS_DEVICE_BUTTON: '//button[contains(text(),"Not on this device")]',
  LANDING_PAGE_ELEMENT: '//div[contains(text(),"Welcome")]',
  // Parallel login selectors
  PARALLEL_LOGIN_POPUP: '//h5[contains(text(),"Parallel Login")]',
  PARALLEL_LOGIN_BUTTON: '//*[@id="btnAllowParallelLogin"]',
  // Logout selectors
  PROFILE_ICON: '//div[@id="common-root-body"]/preceding::button[2]',
  LOGOUT_BUTTON: '//span[contains(text(),"Logout")]',
  // Sync monitor selector
  SYNC_MONITOR_BUTTON: '//a[@title="Sync monitor"]',
  // Sales Journal Entry selectors
  XC_ACTIONS_BUTTON: '//button[@aria-haspopup="menu"]/span[contains(text(),"Actions")]',
  XC_ADD_SALES_ENTRY_BUTTON: '//button[@role="menuitem"]/div/div[contains(text(),"Sales entry")]',
  XC_ADD_BUTTON: '//button/span[contains(text(),"Add")]',
  // Sales Category section
  XC_ADD_SALES_CATEGORY_BUTTON: '(//button/span[contains(text(),"Add")])[1]',
  XC_SELECT_HEADS_DROPDOWN_BOX: '//button/div[contains(text(),"Select heads")]',
  XC_SELECT_FIRST_OPTION: '//*[@aria-orientation="vertical"]/ul/li',
  XC_CREDIT_FIELD: '(//tbody/tr/td[5])[2]',
  // Payment Section
  XC_ADD_PAYMENT_BUTTON: '(//button/span[contains(text(),"Add")])[6]',
  XC_DEBIT_FIELD: '(//tbody/tr/td[4])[4]',
  XC_SAVE_JOURNAL_BUTTON: '//button/span[contains(text(),"Save")]',
  // Sales Journal Sync Flow
  XC_SALES_JOURNAL_ACTIONS_BUTTON: '//button[@aria-haspopup="menu"]/span[contains(text(),"Actions")]',
  XC_SYNC_TO_QBO_BUTTON: '//div[contains(text(),"Sync to QuickBooks")]',
  XC_SALES_JOURNAL_CLOSE_BUTTON: '//button[@aria-label="close"]',
  XC_SYNC_SUCCESS_LABEL: '(//div/div/i[@aria-label="success"])[1]',
  // View/Edit Toggle for existing sales entries
  XC_VIEW_EDIT_TOGGLE: '//input[@aria-label="view edit switch"]',
};

// Sales Journal Entry Values
export const XC_SALES_ENTRY_VALUES = {
  CREDIT_VALUE: '8650.00',
  DEBIT_VALUE: '8650.00',
};

export const XC_TIMEOUTS = {
  DEFAULT: 30000,
  ELEMENT_WAIT: 15000,
  PAGE_LOAD: 45000
};

export const XC_URLS = {
  LOGIN_URL: process.env.XC_URL || '',
  BASE_URL: process.env.XC_URL || ''
};

export const XC_CREDENTIALS = {
  USERNAME: process.env.XC_USERNAME || '',
  PASSWORD: process.env.XC_PASSWORD || ''
}; 