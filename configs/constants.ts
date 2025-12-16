// Simple, focused constants for current testing needs

// Environment validation
const validateEnvironment = () => {
  const requiredVars = [
    'LOGIN_USERNAME', 'LOGIN_PASSWORD', 'BASE_URL'
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
  LOGIN_USERNAME_INPUT: '//input[@id="input-login-user-name"]',
  LOGIN_PASSWORD_INPUT: '//input[@id="input-login-user-password"]',
  LOGIN_CONTINUE_BUTTON: '//input[@id="input-login-dccm-user-submit"]',
LOGOUT_ACCOUNTICON: "//mat-icon[contains(text(),'account_circle')]",
LOGOUT: "//span[contains(text(),'Logout')]",


  DCCM: "//span[normalize-space(text()) = 'DCCM']",
  DASHBOARD_AGENTS: '//a[@title="Agents"]',
  AGENTS_MORE_ICON: "//*[normalize-space(text()) = 'more_vert']",
  AGENTS_CHECKBOX1: "(//div[contains(@class,'checkbox')])[1]",
  AGENTS_MIRROR_AGENT: '//button[@id="btn-role-manage-templates"]',
  AGENTS_MIRRORAGENT_VALIDATE: "(//*[contains(text(),'Mirror Agent')])[1]",
  AGENTS_MIRRORAGENT_CLOSE: '//button[contains(text(),"Close")]',

  AGENTS_MIRRORAGENT_DIV_DROP: '//mat-select[@id="select-agentcopy-divisions"]',
  AGENTS_MIRRORAGENT_GROUP_DROP: '//label[@for="select-agentcopy-group"]',

  

  

};



