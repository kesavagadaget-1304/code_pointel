// Simple, focused constants for current testing needs

// Environment validation
const validateEnvironment = () => {
  const requiredVars = [
    'LOGIN_USERNAME', 'LOGIN_PASSWORD', 'BASE_URL' , 'USER_DCCM_1', 'USER_DCCM_2'
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

};

export const DCCM_USERS = {
  USER_1: process.env.USER_DCCM_1 || '',
  USER_2: process.env.USER_DCCM_2 || '',
};


// Application URLs
export const URLS = {
  LOGIN: process.env.BASE_URL || '',
};

// Screenshot paths for error handling
export const SCREENSHOT_PATHS = {
  ACCOUNTING_TAB_ERROR: 'screenshots/accounting/accounting-tab-error.png'
};

// Locator Selectors - Only what we actually use
export const SELECTORS = {

  //04-02-2026
  LOGIN_USERNAME_INPUT: '//input[@id="input-login-user-name"]',
  LOGIN_PASSWORD_INPUT: '//input[@id="input-login-user-password"]',
  LOGIN_CONTINUE_BUTTON: '//input[@id="input-login-dccm-user-submit"]',
  LOGOUT_ACCOUNTICON: "//mat-icon[contains(text(),'account_circle')]",
  LOGOUT: "//span[contains(text(),'Logout')]",

  DCCM: "//span[normalize-space(text()) = 'DCCM']",
  DASHBOARD_AGENTS: '//a[@title="Agents"]',
  AGENTS_MORE_ICON: "//*[normalize-space(text()) = 'more_vert']",
  AGENTS_CHECKBOX1: "(//div[contains(@class,'checkbox')])[1]",
  AGENTS_CHECKBOX2: "(//div[contains(@class,'checkbox')])[2]",
  AGENTS_CHECKBOX3: "(//div[contains(@class,'checkbox')])[3]",
  AGENTS_TEMPLATE: '//BUTTON[@id="btn-role-manage-template"]',
  AGENTS_TEMPLATE_ALERT_VALIDATE: '//div[contains(text(),"Please select atleast one agent !")]',
  AGENTS_TEMPLATE_ALERT_OK_BUTTON: "//button[normalize-space()='Ok']",
  AGENTS_TEMPLATE_PAGE_TITLE: "//h5[contains(text(),'Template')]",
  AGENTS_TEMPLATE_PAGE_CLOSE: "//h5[contains(text(),'Template')]/following::span[2]",
  AGENTS_TEMPLATE_DROPDOWN: '//mat-select[@id="select-agenttemplate-templates"]',
  AGENTS_TEMPLATE_DROPDOWN_OPTION: '(//div[@id="select-agenttemplate-templates-panel"]//span[not(contains(text(),"None"))])[1]',
  AGENTS_TEMPLATE_DROPDOWN_OPTION_NONE: '//div[@id="select-agenttemplate-templates-panel"]//span[contains(text(),"None")]',
  AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE: "(//div[contains(text(),'There is no skill available in this template.')])[1]",
  AGENTS_TEMPLATE_SEARCH_INPUT: '//input[@id="template-search"]',
  AGENTS_TEMPLATE_SEARCHED_INPUT : '//mat-select[@id="select-agenttemplate-templates"]',

};



