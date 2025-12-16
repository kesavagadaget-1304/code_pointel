// Simple, focused constants for current testing needs

// Environment validation
const validateEnvironment = () => {
  const requiredVars = [
    'LOGIN_USERNAME', 'LOGIN_PASSWORD', 
    'NON_ADMIN_USERNAME', 'NON_ADMIN_PASSWORD',
    'BASE_URL_PREPROD', 'ADMIN_HOME_URL_PREPROD',
    'ADMIN_PAYROLL_URL', 
    'PAYROLL_LOGIN_USERNAME',  'PAYROLL_LOGIN_PASSWORD'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}`);
    console.warn('Please check your .env file');
  }
};

validateEnvironment();

// Timeouts
export const TIMEOUTS = {
  DEFAULT: 30000,
  LOGIN: 40000,
  PAGE_LOAD: 45000,
  ELEMENT_WAIT: 15000
};

// For backward compatibility
export const DEFAULT_TIMEOUT = TIMEOUTS.DEFAULT;

// Login Credentials
export const LOGIN_CREDENTIALS = {
  USERNAME: process.env.LOGIN_USERNAME || '',
  PASSWORD: process.env.LOGIN_PASSWORD || '',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
  PAYROLL_LOGIN_USERNAME: process.env.PAYROLL_LOGIN_USERNAME || '',
  PAYROLL_LOGIN_PASSWORD: process.env.PAYROLL_LOGIN_PASSWORD || ''
};

// Non-admin user credentials for permissions testing
export const NON_ADMIN_CREDENTIALS = {
  USERNAME: process.env.NON_ADMIN_USERNAME || '',
  PASSWORD: process.env.NON_ADMIN_PASSWORD || ''
};



// Application URLs
export const URLS = {
  LOGIN: process.env.BASE_URL_PREPROD || '',
  ADMIN_HOME: process.env.ADMIN_HOME_URL_PREPROD || '',
  ADMIN_PAYROLL: process.env.ADMIN_PAYROLL_URL || ''
};

// Screenshot paths for error handling
export const SCREENSHOT_PATHS = {
  ACCOUNTING_TAB_ERROR: 'screenshots/accounting/accounting-tab-error.png'
};

// Locator Selectors - Only what we actually use
export const SELECTORS = {
  LOGIN_USERNAME_INPUT: '//input[@id="username"]',
  LOGIN_PASSWORD_INPUT: '//input[@id="password"]',
  LOGIN_CONTINUE_BUTTON: '//button[contains(text(),"Continue")]',
  LOGIN_TOAST_LOGO: '//a[@title="Toast"]',
  LOGIN_MY_ACCOUNT_BUTTON: '//button[@aria-label="My account"]',
  LOGIN_LOGOUT_BUTTON: '//button[@data-toast-track-id="nav-layout--my-account--logout"]',
  
  // Financial Products and Accounting navigation
  FINANCIAL_PRODUCTS_TAB: '//a[@data-testid="financial-products-link"]',
  ACCOUNTING_DROPDOWN: '//button[contains(text(),"Accounting")]',
  
  // Legacy accounting selector (kept for backward compatibility)
  ACCOUNTING_MAIN_TAB: '//a[@data-testid="accounting-link"]',

  // Accounting Activity selectors
  ACCOUNTING_ACTIVITY_OPEN_ARROW: '//button[@aria-label="Open secondary menu"]',
  ACCOUNTING_ACTIVITY_CLOSE_ARROW: '//button[@aria-label="Close secondary menu"]',
  ACCOUNTING_ACTIVITY_HEADER: '//h1[contains(text(),"Accounting activity")]',
  ACCOUNTING_ACTIVITY_LINK: '//div[contains(text(),"Activity")]',
  ACCOUNTING_ACTIVITY_CHECKLIST_CLOSE_BUTTON: '//div[@data-testid="checklist-container"]//i[@aria-label="Close"]',
  

  // Calendar and navigation
  ACCOUNTING_ACTIVITY_PREVIOUS_MONTH_BUTTON: '//button[@aria-label="Previous month"]',
  ACCOUNTING_ACTIVITY_NEXT_MONTH_BUTTON: '//button[@aria-label="Next month"]',
  ACCOUNTING_ACTIVITY_CALENDAR_PICKER: '//i[@aria-label="Month picker"]',
  ACCOUNTING_ACTIVITY_SELECT_MONTH: '//tbody/tr[2]/td[2]/div/button',
  ACCOUNTING_ACTIVITY_LOGIN_TO_QBO:"//span[contains(text(),'Log into QuickBooks Online')]",
  ACCOUNTING_ACTIVITY_INTUIT: "//div[contains(text(),'xcchaitime@gmail.com')]",
  ACCOUNTING_ACTIVITY_INTUIT_SUBMIT: "//button[@type='submit']",
  
  // Payroll status indicators
  ACCOUNTING_ACTIVITY_SUCCESS_PAYROLL: '(//i[@aria-label="success"])[2]',
  ACCOUNTING_ACTIVITY_FAILED_PAYROLL: '(//i[@aria-label="cancel"])[2]',
  ACCOUNTING_ACTIVITY_IN_PROGRESS_PAYROLL: '//i[@aria-label="info"]',
  ACCOUNTING_ACTIVITY_PAYROLLFAILED: '(//span[contains(text(),"PAYROLL FAILED")])[3]',
  ACCOUNTING_ACTIVITY_CLOSE: '//button[@data-testid="calendar-modal-close-icon"]',
  ACCOUNTING_ACTIVITY_ASSIGN_GL: "//button[contains(text(),'Assign a GL')]",
  ACCOUNTING_ACTIVITY_VIEW_DETAILS: "//span[contains(text(),'View details')]",

  // Connections and filters
  ACCOUNTING_ACTIVITY_CONNECTIONS_SELECTOR: '//button[@aria-label="Connections"]',
  ACCOUNTING_ACTIVITY_QBO_COMPANY_OPTION: '(//li[@data-testid="SelectItemContainer"])[2]',
  ACCOUNTING_ACTIVITY_PAYGROUP_FILTER: '//button[@label="filter"]',
  ACCOUNTING_ACTIVITY_CLEAR_FILTER_BUTTON: '//span[contains(text(),"Clear")]',
  ACCOUNTING_ACTIVITY_PAYGROUP_SEARCH_INPUT: '//input[@placeholder="Search"]',
  
  // Filter options
  ACCOUNTING_ACTIVITY_SELECT_ALL_FILTER: '//div/ul/li[1]',
  ACCOUNTING_ACTIVITY_SELECT_OPTION_1: '//div/ul/li[2]',
  ACCOUNTING_ACTIVITY_SELECT_OPTION_2: '//div/ul/li[3]',
  
  // Notifications
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_BUTTON: '//div[@data-testid="Notifcation-btn"]',
  
  // Modal close button
  ACCOUNTING_ACTIVITY_MODAL_CLOSE_BUTTON: '//button/i[@aria-label="Close"]',
  
  // Notifications tab/panel
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_TAB: '//div[@data-testid="notifications-tab"]',
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_PANEL: '//div[@data-testid="notifications-panel"]',
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_CLOSE: '//div[@data-testid="notifications-panel"]//button[@aria-label="Close"]',
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_MARK_ALL_READ: '//span[contains(text(),"Mark all as read")]',
  
  // Notification filter buttons
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_ALL: '//div[@data-overflow-behavior="body"]/div[2]/div/button[1]',
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_ERROR: '//div[@data-overflow-behavior="body"]/div[2]/div/button[2]',
  ACCOUNTING_ACTIVITY_NOTIFICATIONS_WARNING: '//div[@data-overflow-behavior="body"]/div[2]/div/button[3]',
  ACCOUNTING_ACTIVITY_PAYROLL_ASSIGNMENTS_LINK: '//div[contains(text(),"Payroll assignments")]',
  ACCOUNTING_PAYROLL_ASSIGNMENTS_HEADER: '//h1[contains(text(),"Payroll assignments")]',
  ACCOUNTING_CONNECTIONS_HEADER: '//h1[contains(text(),"Accounting connections")]',
  ACCOUNTING_ACTIVITY_CONNECTIONS_LINK: '//div[contains(text(),"Connections")]',
  ACCOUNTING_PAYROLL_ASSIGNMENTS_EMPTY_STATE: '//div[@data-testid="empty-state-title"]',
  
  // Connection Actions
  ACCOUNTING_CONNECTIONS_ACTIONS_BUTTON: '(//button[contains(@data-testid, "menu-dropdown") and contains(@data-testid, "toggle-wrapper")])[2]',
  ACCOUNTING_CONNECTIONS_RECONNECT_BUTTON: '//div[contains(text(),"Reconnect")]',
  ACCOUNTING_CONNECTIONS_DELETE_BUTTON: '//div[contains(text(),"Delete")]',
  
  // Edit Functionality
  ACCOUNTING_CONNECTIONS_EDIT_BUTTON: '//div[@id="tabs--1--panel--0"]/div/div/div[2]/section[1]/div[3]/div/div[2]/button',
  ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_1: '//input[@label="California - BI-WEEKLY"]',
  ACCOUNTING_CONNECTIONS_PAYGROUP_CHECKBOX_2: '//input[@label="New York - MONTHLY"]',
  ACCOUNTING_CONNECTIONS_SAVE_BUTTON: '//span[contains(text(),"Save")]',
  
  // Modal and Navigation
  ACCOUNTING_CONNECTIONS_CLOSE_BUTTON: '//button[@aria-label="Close"]',
  
  // Tabs
  ACCOUNTING_CONNECTIONS_GL_CODES_TAB: '//span[contains(text(),"GL codes")]',
  ACCOUNTING_CONNECTIONS_CLASSES_TAB: '//span[contains(text(),"Classes")]',
  
  // Company Dropdown
  ACCOUNTING_CONNECTIONS_COMPANY_DROPDOWN: '//button[@aria-label="Connections"]',
  
  // Search
  ACCOUNTING_CONNECTIONS_SEARCH_INPUT: '//input[@placeholder="Search by keyword"]',
  ACCOUNTING_CONNECTIONS_GL_CODE_SEARCH_TERM: 'Revenue',
  ACCOUNTING_CONNECTIONS_CLASSES_SEARCH_TERM: 'QA010',
  
  ACCOUNTING_PAYROLL_SETTINGS_HEADER: '//h1[contains(text(),"Accounting Settings")]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_LINK: '//div[contains(text(),"Payroll settings")]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION1: '(//div[@data-testid="PageTargetNavGroup"]//following::div[contains(@class,"PageTargetNavItem")])[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION2: '(//div[@data-testid="PageTargetNavGroup"]//following::div[contains(@class,"PageTargetNavItem")])[3]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_NAVIGATION3: '(//div[@data-testid="PageTargetNavGroup"]//following::div[contains(@class,"PageTargetNavItem")])[5]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_CONNECTED_ACCOUNT: '((//*[contains(text(),"Connected account")])[1])/following::button[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_POSTING_DATE: '((//*[contains(text(),"Posting date")])[1])/following::button[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_PAPER_CHECKS: '((//*[contains(text(),"Paper checks")])[1])/following::button[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_GL_ASSIGNMENTS: '((//*[contains(text(),"GL assignments")])[1])/following::button[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_INDIVIDUAL: '(//div[contains(text(),"Individual")])[1]',
  ACCOUNTING_ACTIVITY_PAYROLL_SETTINGS_SUMMARY: '(//div[contains(text(),"Summary")])[1]',
  
  
// Payroll Admin selectors
PAYROLL_ADMIN_USERNAME: '//input[@id="username"]',
PAYROLL_ADMIN_PASSWORD: '//input[@id="password"]',
PAYROLL_ADMIN_NEXT: '//button[@id="next"]',
PAYROLL_ADMIN_LOGIN_BUTTON: '//button[@type="submit"]',
PAYROLL_ADMIN_CONTINUE_TO_PAYROLL:'//a[@id="next"]',
PAYROLL_ADMIN_CONTINUE_TO_PAYROLL_BUTTON: '//button[@id="btnContinue"]',
PAYROLL_ADMIN_VIEW_PAYROLL: "//div[contains(text(),'View payroll')]",
PAYROLL_ADMIN_TENANT_DROPDOWN: '//span[@data-testid="customer-switcher-toggle-name"]',
PAYROLL_ADMIN_SEARCH_RESTAURANT: '//input[@placeholder="Search restaurant"]',
PAYROLL_ADMIN_RESTAURANT_OPTION: '//button[contains(@data-testid,"customer-switcher-content-list-item")]',
PAYROLL_ADMIN_PREVIEW: '(//a[contains(@data-testid,"upcoming-payroll-continue")])[1]',
PAYROLL_ADMIN_PAGE_TOTAL_AMOUNT: "(//span[contains(text(),'Total amount')]/following::div[text()])[1]",
PAYROLL_ADMIN_START_PAYROLL: '//button[@data-testid="move-to-employee-step"]',
PAYROLL_ADMIN_START_PAYROLL_ANYWAY: "//span[contains(text(),'Start payroll anyway')]",
PAYROLL_ADMIN_CALCUALTE_PAYROLL: '//button[@data-testid="calculate-payroll"]',
PAYROLL_ADMIN_CALCUALTE_PAYROLL_CONTINUE: "//span[contains(text(),'Continue')]",
PAYROLL_ADMIN_PAYDATE: '//span[@data-testid="payroll-summary-check-date"]',
PAYROLL_ADMIN_PAGE_ESTIMATED_WITHDRAWAL_AMOUNT: '//div[@data-testid="estimated-withdrawal-amount"]',
PAYROLL_ADMIN_SUBMIT_PAYROLL: '//button[@data-testid="post-payroll"]',
PAYROLL_ADMIN_SUBMIT_PAYROLL_CONFIRMED: '//button[@data-testid="post-payroll-confirmed"]',
PAYROLL_ADMIN_ACCOUNT_MENU: '//i[@aria-label="Account menu"]',
PAYROLL_ADMIN_LOGOUT: '//span[contains(text(),"Logout")]',
PAYROLL_ADMIN_PAYROLL_POSTED_SUCCESS: "//div[contains(text(),'Payroll posted successfully!')]",
PAYROLL_ADMIN_CONFIG_TEMPLATE: '//*[@data-testid="config-template-title"]',



  // Payroll Assignments selectors
  PAYROLL_ASSIGNMENTS_PAYGROUP_DROPDOWN: '//button[@aria-label="Pay Group Name"]',
  PAYROLL_ASSIGNMENTS_SELECT_PAYGROUP: '//div[@aria-label="Pay Group Name"]/ul/li[3]',
  PAYROLL_ASSIGNMENTS_COPY_FROM_BUTTON: '//button/span[contains(text(),"Copy from")]',
  PAYROLL_ASSIGNMENTS_COPY_FROM_PAYGROUP_DROPDOWN: '//button[@aria-label="Pay Group "]',
  PAYROLL_ASSIGNMENTS_COPY_FROM_SELECT_PAYGROUP: '//div[@aria-label="Pay Group "]/ul/li[3]',
  PAYROLL_ASSIGNMENTS_COPY_FROM_CLOSE: '//button[@data-testid="undefined-close-icon"]',
  PAYROLL_ASSIGNMENTS_H1: "//h1[contains(text(),'Payroll assignments')]",
  PAYROLL_ASSIGNMENTS_LOCATIONS: "//a[@aria-label='scroll to Locations']",
  PAYROLL_ASSIGNMENTS_EARNINGS: '//a[@aria-label="scroll to Earnings"]',
  PAYROLL_ASSIGNMENTS_TIPS: '//a[@aria-label="scroll to Tips"]',
  PAYROLL_ASSIGNMENTS_DEDUCTIONS: '//a[@aria-label="scroll to Deductions"]',
  PAYROLL_ASSIGNMENTS_PAYROLL_TAXES: '//a[@aria-label="scroll to Payroll taxes deducted"]',
  PAYROLL_ASSIGNMENTS_OTHER_EXPENSES: '//a[@aria-label="scroll to Other Expenses"]',
  PAYROLL_ASSIGNMENTS_BANK_WITHDRAWALS: '//a[@aria-label="scroll to Bank withdrawals"]',
  PAYROLL_ASSIGNMENTS_LOC_DROPDOWN: '(((//table)[1])//following::td)[2]',
  PAYROLL_ASSIGNMENTS_CLEAR_SELECTION: "//li[contains(text(),'(Clear selection)')]",
  PAYROLL_ASSIGNMENTS_OPTION1: '//li[@data-testid="select-options-option-1"]',
  PAYROLL_ASSIGNMENTS_SAVE: "//*[contains(text(),'Save')]",
  PAYROLL_ASSIGNMENTS_SAVED: "//*[contains(text(),'Payroll selections have been saved.')]",
  PAYROLL_ASSIGNMENTS_GL_DROPDOWN: '(//button[@data-testid="select-button"])[2]',


  
  // Payroll Assignments section expand/collapse buttons
  PAYROLL_ASSIGNMENTS_LOCATIONS_SECTION: '(//button[@data-testid="disclosure-button"])[1]',
  PAYROLL_ASSIGNMENTS_EARNINGS_SECTION: '(//button[@data-testid="disclosure-button"])[2]',
  PAYROLL_ASSIGNMENTS_TIPS_SECTION: '(//button[@data-testid="disclosure-button"])[3]',
  PAYROLL_ASSIGNMENTS_DEDUCTIONS_SECTION: '(//button[@data-testid="disclosure-button"])[4]',
  PAYROLL_ASSIGNMENTS_EMPLOYER_TAXES_SECTION: '(//button[@data-testid="disclosure-button"])[5]',
  PAYROLL_ASSIGNMENTS_FEES_SECTION: '(//button[@data-testid="disclosure-button"])[6]',
  PAYROLL_ASSIGNMENTS_BANK_WITHDRAWALS_SECTION: '(//button[@data-testid="disclosure-button"])[7]',
  PAYROLL_ASSIGNMENTS_HEADERTITLE: 'config-template-title',


  
  // Pendo Bumpers
  PENDO_BUMPER_FOCUS_BUMPER: '//div[@id="pendo-guide-container"]',
  PENDO_BUMPER_CLOSE_BUTTON: '//button[@aria-label="Close"]',
  



};



// QBO API Constants
export const QBO_API_CONFIG = {
  BASE_URL: 'https://sandbox-quickbooks.api.intuit.com/v3',
  MINOR_VERSION: '75',
  REALM_ID: '193514322325152', // QA_PREPROD_SB_2
  JOURNAL_ID: '8181',
  COMPANY_PREFIX: 'company',
  TOKEN_URL: process.env.QBO_API_TOKEN_URL || 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
  REFRESH_TOKEN: process.env.QBO_API_REFRESH_TOKEN || ''
};

// Pulsar Configuration ✅ COMPLETED
export const PULSAR_URNS = {
  PAYROLL_POSTED: 'urn:protobuf:engineering:ec:payroll:payroll-posted',
  PAYROLL_TRANSACTION: 'urn:protobuf:accounting:payroll:transaction:created',
  ACCOUNTING_JOURNAL: 'urn:protobuf:engineering:accounting-journal:accounting-journal-created'
};

export const PULSAR_TOPICS = {
  ENGINEERING_EC_PAYROLL: 'persistent://engineering/ec/payroll',
  ENGINEERING_ACCOUNTING_PAYROLL_TRANSACTION: 'persistent://engineering/accounting/accounting-payroll-transaction',
  ENGINEERING_ACCOUNTING_JOURNAL: 'persistent://engineering/accounting-journal/accounting-journal-created'
};

// Pulsar JSON Data Constants
export const PULSAR_JSON_DATA = {
  PAYROLL_POSTED: {
    customerUuid: "c5830061-bdb8-11ed-8d22-120f4f86e32f", // Updated customer UUID
    payPeriodUuid: "82d2e289-f7b6-11ee-8840-120f4f86e32f", // Updated pay period UUID
    checkDate: "2025-09-08", // Updated check date
    isAch: true
  }
  /*PAYROLL_TRANSACTION: {
     originId: "445c7dfd-1fc4-11ec-a409-128b390ae63d",
     originType: "PAYROLL",
     originGroupId: "9b27e0fa-8270-11ee-8840-120f4f86e32f",
     correlationId: "test-correlation-123"
   }*/
};

// REST API Endpoints
export const REST_API_CONFIG = {
  PAYROLL_TRANSACTION_ID: '445c7dfd-1fc4-11ec-a409-128b390ae63d', // Updated to match PayrollPosted customerUuid (originId)
  
  // Test case constants for payroll transactions API
  TEST_CASES: {
    // C1934345 - Valid transaction test
    VALID_TRANSACTION_ID: '445c7dfd-1fc4-11ec-a409-128b390ae63d', // Updated to match PayrollPosted customerUuid
    
    // C1934346 - Non-existent transaction test
    NON_EXISTENT_TRANSACTION_ID: '00000000-0000-0000-0000-000000000000',
    
    // C1934347 - Invalid transaction ID format test
    INVALID_TRANSACTION_ID_FORMAT: 'invalid-uuid-format',
    
    // C1934348 & C1934349 - Authentication tests (no constants needed, handled in test logic)
  },
  
  // Expected response status codes
  EXPECTED_STATUS_CODES: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
  },
  
  // Test data for validation
  TEST_DATA: {
    EXPECTED_PAYGROUP_NAME: 'WhiteCap',
    EXPECTED_PAYGROUP_UUID: '6a5d3c9a-7898-11ec-978a-02c7d7953193',
    EXPECTED_LOCATION_UUID: '69912e3a-7898-11ec-978a-02c7d7953193',
    EXPECTED_LOCATION_NAME: 'White Cap'
  }
};

// DevTools XPath constants
export const DEVTOOLS_SELECTORS = {
  ICON: '//*[@id="single-spa-application:spa-dev-tools"]/div/button/div/i',
  USER_AUTH_TAB: '//span[@data-text-content="User authentication"]',
  TOKEN_BOX: '//code[@class="type-subhead select-all"]'
};

// Admin page XPath constants - COMMENTED OUT due to 2FA
// export const ADMIN_SELECTORS = {
//   OTHER_BUTTON: '//input[@data-testid="token-OTHER-input"]',
//   RESTAURANT_NAME_FIELD: '//input[@aria-label="Restaurant name"]',
//   SUBMIT_SEARCH_BUTTON: '//button/i[@aria-label="Submit search"]',
//   INPUT_NOTES: '//textarea[@data-testid="input-notes"]',
//   ACCESS_TOASTWEB: '//button[@data-testid="access-toastweb"]'
// };

// Admin page text constants - COMMENTED OUT due to 2FA
// export const ADMIN_TEXT = {
//   RESTAURANT_NAME: 'Kuleana Rum Shack',
//   INPUT_NOTES_TEXT: 'SA'
// };

// GraphQL credentials
export const GRAPHQL_CREDENTIALS = {
  USERNAME: process.env.GRAPHQL_USERNAME || '',
  PASSWORD: process.env.GRAPHQL_PASSWORD || ''
};

