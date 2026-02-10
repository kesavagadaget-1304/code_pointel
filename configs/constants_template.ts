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


  //05-02-2026
  AGENTS_TEMPLATE_SKILL_UPDATED_SUCCESSFULLY: "//*[contains(text(),'Agents updated successfully')]",
  AGENTS_TEMPLATE_APPLY_BUTTON: "//span[contains(text(),'Apply')]",
  AGENTS_TEMPLATE_SKILL_SCHEDULE_BUTTON: "//button[@id='btn-agenttemplate-schedule']//following-sibling::span[contains(text(),'Schedule')]",
  AGENTS_TEMPLATE_OVERRIDE_CHECKBOX: '//div[contains(text(),"If you want to override skills, languages and queues, Please select override!")]/following::input[@type="checkbox"]',
  AGENTS_TEMPLATE_OVERRIDE_APPLY_BUTTON: "//button[contains(text(),'Apply')]",
  AGENTS_TEMPLATE_SKILL_AVAILABLE_IN_ROW_1: "(//div[contains(text(),'There is no skill available in this template.')]/following::div[contains(@class,'slick-cell l1 r1')])[1]",


  AGENTS_USERNAME_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following::span)[1]",
  AGENTS_USERNAME2_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following-sibling::span)[2]",
  AGENTS_USERNAME3_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following-sibling::span)[3]",
  AGENTS_MIRRORAGENT_HISTORY_USER: '//img[@title="History"]',
  AGENTS_USERNAME_SEARCH_TEXTBOX: '//input[@aria-label="User Name Search Filter"]',
  HISTORY_CURRENT_VALUE: '((//div[@class="ui-widget-content slick-row even"])[1])/div[5]',
  HISTORY_CLOSE: "//button[contains(text(),'Close')]",
  AGENTS_MIRRORAGENT_DIV_OPTION: '//div[@id="select-agentcopy-divisions-panel"]//span[contains(text(),"All")]',
  AGENTS_MIRRORAGENT_ALERT_SELECTGROUP: '//div[contains(text(),"Please select either divisions or groups to search")]',
  AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION_2: '//mat-option[@aria-selected="true"]/following-sibling::mat-option[1]',
  AGENTS_TEMPLATE_SKILLS_TAB: "//span[contains(text(),'Skills')]",
  AGENTS_TEMPLATE_SKILLS_TAB_GRID_FIRST_CELL: "(//div[@id='slickGridContainer-exportSkillGrid']//following::div[contains(@class,'slick-cell l1 r1')])[1]",
  AGENTS_TEMPLATE_CLOSE_BUTTON: "//button[contains(text(),'Close')]",
  AGENTS_TEMPLATE_NAME_SEARCH_TEXTBOX: '//input[@aria-label="Name Search Filter"]',
  AGENTS_TEMPLATE_NO_SKILL_AVAILABLE: "(//div[contains(text(),'There is no skill available in this template.')])[1]",
  DCCM_DASHBOARD: '//a[@title="Dashboard"]',
};



