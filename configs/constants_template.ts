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

    //10-02-2026
  AGENTS_TEMPLATE_SCHEDULE_BUTTON: '//button[@id="btn-agenttemplate-schedule"]',
  AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_LABEL: "(//span[contains(text(),'Job Type*')])[1]",
  AGENTS_TEMPLATE_SCHEDULE_JOB_TYPE_ONCE: "//*[@value='once']",
  AGENTS_TEMPLATE_SCHEDULE_JOB_NAME: '(//input[@name="jobName"])[1]',
  AGENTS_TEMPLATE_SCHEDULE_START_DATE: '(//input[@name="onceDate"])[1]',
  AGENTS_TEMPLATE_SCHEDULE_START_DATE_CURRENT: "//button[contains(@class,'calendar-body-active')]",
  AGENTS_TEMPLATE_SCHEDULE_START_TIME: '(//input[@placeholder="Time at*"])[1]',
  AGENTS_TEMPLATE_SCHEDULE_SAVE_BUTTON: '//button[@id="once-create-btn"]',
  DASHBOARD_REPORT: "//span[contains(text(),'Report')]",
  DASHBOARD_REPORT_SCHEDULER: "//span[contains(text(),'Scheduler')]",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT: "//*[contains(text(),' Job Type - Current')]",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN: "//label[@aria-owns='select-filter-job-type']",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED: "//span[contains(text(),'Completed ')]",
  DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON: '//button[@id="btn-filter-search"]',
  DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE: "//label[contains(text(),'Filter')]/following-sibling::span",
  DASHBOARD_REPORT_SCHEDULER_VALIDATE: "((//div[contains(@class,'checkbox')])[1])/following::div[2]/p",
  AGENTS_TEMPLATE_UTILIZATION_TAB: "//span[contains(text(),'Utilization')]",
  AGENTS_TEMPLATE_UTILIZATION_EXPORT_TO_EXCEL: "(//span[contains(text(),'EXPORT_TO_EXCEL')])[3]",
  AGENTS_TEMPLATE_GROUPS_TAB: "(//span[contains(text(),'Groups')])[3]",
  AGENTS_TEMPLATE_CLOSE_ICON: "(//h5[contains(text(),'Template')]/following::img)[1]",
  AGENTS_TEMPLATE_SCHEDULER_OVERRIDE_CHECKBOX: '//input[@name="override"]',
  

//11-02-2026
AGENTS_REPORT_JOBNAME_FILTER: '//input[@aria-label="Job Name Search Filter"]',
REPORT_JOBNAME_VALIDATE: '//p[@title=" Job Details"]',
AGENTS_TEMPLATE_LANGUAGES_TAB: "//div[@role='tab']/following::span[contains(text(),'Languages')]",
AGENTS_TEMPLATE_LANGUAGE_AVAILABLE_IN_ROW_1: "(//div[@id='languagetemplateGrid']//following::div[contains(@class,'slick-cell l1 r1')])[1]",
AGENTS_USEREDIT_LANGUAGE_TAB : "//span[contains(text(),'Languages')]",
AGENTS_TEMPLATE_SEARCH_OPTION_LANGUAGE_DROPDOWN: "//mat-option[.//span[normalize-space()='language template']]",

//06-02-2026
  AGENTS_MIRRORAGENT_USERNAME_SEARCH: "input[data-columnid='userName']",
  AGENTS_DASHBOARD_DIV_FILTER_CLICK : "//mat-chip//span[contains(@class, 'mat-mdc-chip-action-label') and contains(., 'Division - ')]",
  AGENTS_DASHBOARD_DIV_CLICK : "//mat-select[@name='divisions']",
  AGENTS_DASHBOARD_DIV_ALL_CHECKBOX : "//mat-pseudo-checkbox[contains(@class, 'mat-pseudo-checkbox-checked')]",
  AGENTS_DASHBOARD_DIV_INPUT: '//*[@id="select-filter-divisions-panel"]/mat-form-field/div[1]/div[2]',
  AGENTS_DASHBOARD_DIV_DCCM_CHECKBOX: "//mat-option[.//span[normalize-space()='Dccm']]//mat-pseudo-checkbox[not(contains(@class, 'mat-pseudo-checkbox-checked'))]",
  AGENTS_DASHBOARD_BACKDROP_CLICK :".cdk-overlay-backdrop",
  AGENTS_TEMPLATE_SEARCH_OPTION : 'input[placeholder="search"]',
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN: "//mat-option[.//span[normalize-space()='valid division']]",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN1: "//mat-option[.//span[normalize-space()='CMS_UT_TEMPLATE']]",
  AGENTS_TEMPLATE_ARROW_AFTER: "//button[contains(@class, 'mat-mdc-tab-header-pagination-after')]",
  AGENTS_TEMPLATE_ARROW_BEFORE: "//button[contains(@class, 'mat-mdc-tab-header-pagination-before')]",
  AGENTS_TEMPLATE_DIVISION_SELECT: "//span[contains(@class, 'iconTitle') and normalize-space()='Division']",
  AGENTS_TEMPLATE_DIVISION_SEARCH_INPUT:"//div[contains(@class, 'l1 r1')]//input[@data-columnid='objectName']",
  AGENTS_TEMPLATE_SKILLS_CHECKBOX: '(//div[@title="Select/Deselect All"])[3]',
  AGENTS_TEMPLATE_SKILL_SEARCH_FILTER: "//input[@data-columnid='name' and contains(@class, 'filter-name')]",
  AGENTS_TEMPLATE_SKILLS_NAME_CHECKBOX:'//*[@id="templateGrid"]/div[4]/div[3]/div/div[2]/div[1]',
  REPORT_JOB_CLOSE:"//span[contains(@class, 'mat-mdc-tooltip-trigger')][img[contains(@src, 'close.png')]]",
  REPORT_JOB_HISTORY:"//div[contains(@class, 'slick-cell')]//img[@title='History' and contains(@src, 'History.png')]",
  REPORT_JOB_HISTORY_STATUS: "//div[@id='jobDetailGrid']//div[contains(@class, 'slick-row')]//div[contains(@class, 'l7 r7')]",
  AGENTS_TEMPLATE_LANGUAGE_SELECT: "//span[contains(@class, 'iconTitle') and normalize-space()='Languages']",
  AGENTS_TEMPLATE_QUEUES_SELECT: "//span[contains(@class, 'iconTitle') and normalize-space()='Queues']",
  AGENTS_TEMPLATE_UTILIZATION_SELECT: "//span[contains(@class, 'iconTitle') and normalize-space()='Utilization']",
  AGENTS_TEMPLATE_GROUPS_SELECT: "//span[contains(@class, 'iconTitle') and normalize-space()='Groups']",
  AGENTS_TEMPLATE_LANGUAGE_CHECKBOX: '//*[@id="languagetemplateGrid"]/div[4]/div[3]/div/div/div[1]',
  AGENTS_TEMPLATE_UTILIZATION_MEDIA_SEARCH:"//input[@data-columnid='mediaType']",
  AGENTS_TEMPLATE_UTILIZATION_MEDIA_CHECKBOX: '//*[@id="templateUtilizationsGrid"]/div[4]/div[3]/div/div/div[1]',
  AGENTS_TEMPLATE_DIVISION_CHECKBOX: '//*[@id="templateDivisionGrid"]/div[4]/div[3]/div/div/div[1]',
  AGENTS_TEMPLATE_GROUPS_SEARCH_FILTER:"//input[@data-columnid='groupName']",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN2: "//mat-option[.//span[normalize-space()='skill delete template']]",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN3: "//mat-option[.//span[normalize-space()='language delete template']]",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN4: "//mat-option[.//span[normalize-space()='Queue delete template']]",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN5: "//mat-option[.//span[normalize-space()='group delete template']]",
  AGENTS_TEMPLATE_SEARCH_OPTION_DROPDOWN6: "//mat-option[.//span[normalize-space()='Group Template']]",
  AGENTS_TEMPLATE_GROUP_NAME_CHECKBOX: '//*[@id="templateGroupGrid"]/div[4]/div[3]/div/div/div[1]/label',
  AGENTS_TEMPLATE_SCHEDULE_OVERRIDE: "//input[@type='checkbox' and @name='override']",
  AGENTS_REPORT_JOBNAME_FILTERS : "//div[contains(@class, 'l2 r2')]//input[@data-columnid='jobName']",
  REPORT_JOBNAME_VALIDATES: "//div[contains(@class, 'l2 r2')]//p[contains(@style, 'cursor:pointer')]",



};



