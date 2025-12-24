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

//    *****Mirrior Agent Selectors *****
  DCCM: "//span[normalize-space(text()) = 'DCCM']",
  DASHBOARD_AGENTS: '//a[@title="Agents"]',
  AGENTS_MORE_ICON: "//*[normalize-space(text()) = 'more_vert']",
  AGENTS_CHECKBOX1: "(//div[contains(@class,'checkbox')])[1]",
  AGENTS_CHECKBOX2: "(//div[contains(@class,'checkbox')])[2]",
  AGENTS_CHECKBOX3: "(//div[contains(@class,'checkbox')])[3]",
  AGENTS_MIRROR_AGENT: '//button[@id="btn-role-manage-templates"]',
  AGENTS_MIRRORAGENT_VALIDATE: "(//*[contains(text(),'Mirror Agent')])[1]",
  AGENTS_MIRRORAGENT_CLOSE: '//button[contains(text(),"Close")]',
  AGENTS_MIRRORAGENT_NEXT_BUTTON: '//button[contains(text(),"Next")]',

  AGENTS_MIRRORAGENT_DIV_DROP: '//mat-select[@id="select-agentcopy-divisions"]',
  AGENTS_MIRRORAGENT_DIV_OPTION: '//div[@id="select-agentcopy-divisions-panel"]//span[contains(text(),"All")]',
  AGENTS_MIRRORAGENT_GROUP_DROP: '//label[@for="select-agentcopy-group"]',
  AGENTS_MIRRORAGENT_GROUP_DROPDOWN_OPTION: '//mat-option[@aria-selected="true"]/preceding-sibling::mat-option[1]',
  AGENTS_MIRRORAGENT_GROUP_DROPDOWN_VAL: '(//mat-option[@aria-selected="true"]/preceding-sibling::mat-option[1])/span',
  AGENTS_MIRRORAGENT_DIV_VALUE: '(//mat-select[@id="select-agentcopy-divisions"]//following::span)[2]',
  AGENTS_MIRRORAGENT_USERNAME: "//input[@id='input-agentcopy-username']",
  AGENTS_MIRRORAGENT_SEARCH: "//span[contains(text(),'Search')]",
  AGENTS_MIRRORAGENT_ALERT_CLOSE: "//h5[contains(text(),' Alert! ')]/following::img",
  AGENTS_MIRRORAGENT_NO_USER: "(//div[contains(text(),'No users found')])[1]",
  AGENTS_DASHBOARD_SELECET_DESELECT_ALL: "//div[@title='Select/Deselect All']",
  AGENTS_MIRRORAGENT_ALERT_VALIDATE: '//div[contains(text(),"Please select atleast one agent !")]',
  AGENTS_MIRRORAGENT_ALERT_OK_BUTTON: "//button[normalize-space()='Ok']",
  AGENTS_MIRRORAGENT_USERNAME_LABEL: "(//span[contains(text(),'Mirror Agent Name')]//following::input[@type='checkbox']/following-sibling::label)[1]",
  AGENTS_MIRRORAGENT_SKILLS_LABEL: "//label[contains(text(),' Skills')]",
  AGENTS_MIRRORAGENT_QUEUES_LABEL: "//label[contains(text(),'Queues')]",
  AGENTS_MIRRORAGENT_GROUPS_LABEL: "//label[contains(text(),'Groups')]",
  AGENTS_MIRRORAGENT_LANGUAGES_LABEL: "//label[contains(text(),'Languages')]",
  AGENTS_MIRRORAGENT_PHONE_LABEL: "//label[contains(text(),'Phone')]",
  AGENTS_MIRRORAGENT_PROFILE_LABEL: "//label[contains(text(),'Profile')]",
  AGENTS_MIRRORAGENT_UTILIZATION_LABEL: "//label[contains(text(),'Utilization')]",
  AGENTS_MIRRORAGENT_ROLES_LABEL: "//label[contains(text(),'Roles')]",
  AGENTS_MIRRORAGENT_WORKTEAM_LABEL: "//label[contains(text(),'Work Team')]",
  AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_CLOSE: "//h5[contains(text(),'Select Attributes')]/following::img",
  AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_NEXT_BUTTON: "(//button[contains(text(),'Next')])[2]",
  AGENTS_MIRRORAGENT_SELECT_ATTRIBUTES_BACK_BUTTON: "//button[contains(text(),'Back')]",
  AGENTS_MIRRORAGENT_SKILL_SELECT_ALL: "//label[contains(text(),'Select All')]",
  AGENTS_MIRRORAGENT_SKILL_SEARCH_FILTER: "//input[@aria-label='Name Search Filter']",
  AGENTS_MIRRORAGENT_SKILL_LEVEL_SEARCH_FILTER: '//input[@aria-label="Level Search Filter"]',
  AGENTS_MIRRORAGENT_SKILL_NO_SKILL_AVAILABLE: "(//div[contains(text(),'There is no skill available for this selected user.')])[1]",
  AGENTS_MIRRORAGENT_SKILL_UPDATED_SUCCESSFULLY: "//*[contains(text(),' Updated successfully')]",
  AGENTS_MIRRORAGENT_SKILL_APPLY_BUTTON: "//span[contains(text(),'Apply')]",
  AGENTS_MIRRORAGENT_SKILL_SCHEDULE_BUTTON: "//span[contains(text(),'Schedule')]",
  AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT: "(//input[@type='number'])[1]",
  AGENTS_MIRRORAGENT_SKILL_NUMBER_INPUT_PARENT: "//div[contains(@class,'editable')]",
  AGENTS_MIRRORAGENT_SKILL_APPLY_CONFIRM_BUTTON: "//button[contains(text(),'Apply')]",
  AGENTS_MIRRORAGENT_SKILL_GRID_MENU: '//div[@id="copySkillGrid"]//button[@aria-label="Grid Menu"]',
  AGENTS_MIRRORAGENT_SKILL_CLEAR_ALL_FILTERS: "(//span[contains(text(),'CLEAR_ALL_FILTERS')])[2]",
  AGENTS_MIRRORAGENT_SKILL_CLEAR_ALL_SORTING: "(//span[contains(text(),'CLEAR_ALL_SORTING')])[2]",
  AGENTS_MIRRORAGENT_SKILL_TOGGLE_FILTER_ROW: "(//span[contains(text(),'TOGGLE_FILTER_ROW')])[2]",
  AGENTS_MIRRORAGENT_SKILL_EXPORT_TO_EXCEL: "(//span[contains(text(),'EXPORT_TO_EXCEL')])[2]",
  AGENTS_MIRRORAGENT_COLUMNS_SKILL_NAME: "//label[contains(text(),'Skill Name')]",
  AGENTS_MIRRORAGENT_COLUMNS_SKILL_LEVEL: "//label[contains(text(),'Skill Level')]",
  AGENTS_MIRRORAGENT_FORCE_FIT_COLUMNS: "(//label[contains(text(),'FORCE_FIT_COLUMNS')])[2]",
  AGENTS_MIRRORAGENT_SKILL_SELECT_ALL_CHECKBOX: '(//div[@title="Select/Deselect All"])[3]',
  AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES: "//span[contains(text(),'Languages')]",
  AGENTS_MIRRORAGENT_SKILL_TAB_LANGUAGES_CHECKBOX: '(((//div[@title="Select/Deselect All"])[3])//following::input[@type="checkbox"]/parent::div)[1]',
  AGENTS_MIRRORAGENT_LANGUAGE_SEARCH_FILTER: "//input[@aria-label='Name Search Filter']",
  AGENTS_MIRRORAGENT_LANGUAGE_NO_LANGUAGE_AVAILABLE: "(//div[contains(text(),'There is no language available for this selected user.')])[1]",


  AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_SEARCH_FILTER: "//input[@aria-label='Level Search Filter']",
  AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_NUMBER_INPUT: '(//input[@type="number"])[1]',
  AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_APPLY_BUTTON: "//span[contains(text(),'Apply')]",
  AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_OVERRIDE_WARNING: "//div[contains(text(),'If you want to override skills, languages and queues, Please select override!')]",
  AGENTS_MIRRORAGENT_LANGUAGE_LEVEL_OVERRIDE_APPLY_BUTTON: "//button[contains(text(),'Apply')]",
  AGENTS_MIRRORAGENT_LANGUAGE_UPDATED_SUCCESSFULLY: "//*[contains(text(),' Updated successfully')]",
  AGENTS_MIRRORAGENT_LANGUAGE_GRID_MENU: '//div[@id="addUpdateLanguageGrid"]//button[@aria-label="Grid Menu"]',
  AGENTS_MIRRORAGENT_LANGUAGE_CLEAR_ALL_FILTERS: "(//span[contains(text(),'CLEAR_ALL_FILTERS')])[3]",
  AGENTS_MIRRORAGENT_LANGUAGE_TOGGLE_FILTER_ROW: "(//span[contains(text(),'TOGGLE_FILTER_ROW')])[3]",
  AGENTS_MIRRORAGENT_LANGUAGE_EXPORT_TO_EXCEL: "(//span[contains(text(),'EXPORT_TO_EXCEL')])[3]",
  AGENTS_MIRRORAGENT_SCHEDULE_BUTTON: '(//button[@id="btn-agentcopy-schedule"])[2]',
  AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_LABEL: "(//span[contains(text(),'Job Type*')])[1]",
  AGENTS_MIRRORAGENT_SCHEDULE_JOB_TYPE_ONCE: "//*[@value='once']",
  AGENTS_MIRRORAGENT_SCHEDULE_JOB_NAME: '(//input[@name="jobName"])[1]',
  AGENTS_MIRRORAGENT_SCHEDULE_START_DATE: '(//input[@name="onceDate"])[1]',
  AGENTS_MIRRORAGENT_SCHEDULE_START_DATE_CURRENT: "//button[contains(@class,'calendar-body-active')]",
  AGENTS_MIRRORAGENT_SCHEDULE_START_TIME: '(//input[@placeholder="Time at*"])[1]',
  AGENTS_MIRRORAGENT_SCHEDULE_SAVE_BUTTON: '//button[@id="once-create-btn"]',
  AGENTS_MIRRORAGENT_SKILL_TAB_QUEUES: "//span[contains(text(),'Queues') and @class='iconTitle']",
  AGENTS_MIRRORAGENT_QUEUES_SELECT_ALL_CHECKBOX: '(//div[@title="Select/Deselect All"])[3]',
  AGENTS_MIRRORAGENT_SKILL_QUEUES_CHECKBOX: '(((//div[@title="Select/Deselect All"])[3])//following::input[@type="checkbox"]/parent::div)[1]',
  AGENTS_MIRRORAGENT_QUEUES_NAME_SEARCH_TEXTBOX: '//input[@aria-label="Name Search Filter"]',
  AGENTS_MIRRORAGENT_QUEUES_ACTION_SEARCH_TEXTBOX: '//input[@aria-label="Action Search Filter"]',
  AGENTS_MIRRORAGENT_QUEUES_NO_QUEUES_AVAILABLE: "(//div[contains(text(),'There is no queue available for this selected user.')])[1]",
  AGENTS_MIRRORAGENT_QUEUES_GRID_MENU: '//div[@id="copyQueueGrid"]//button[@aria-label="Grid Menu"]',
  AGENTS_MIRRORAGENT_QUEUES_CLEAR_ALL_FILTERS: "(//span[contains(text(),'CLEAR_ALL_FILTERS')])[3]",
  AGENTS_MIRRORAGENT_QUEUES_TOGGLE_FILTER_ROW: "(//span[contains(text(),'TOGGLE_FILTER_ROW')])[3]",
  AGENTS_MIRRORAGENT_QUEUES_EXPORT_TO_EXCEL: "(//span[contains(text(),'EXPORT_TO_EXCEL')])[3]",

  DASHBOARD_REPORT: "//span[contains(text(),'Report')]",
  DASHBOARD_REPORT_SCHEDULER: "//span[contains(text(),'Scheduler')]",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_CURRENT: "//*[contains(text(),' Job Type - Current')]",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_DROPDOWN: "//label[@aria-owns='select-filter-job-type']",
  DASHBOARD_REPORT_SCHEDULER_JOB_TYPE_COMPLETED: "//span[contains(text(),'Completed ')]",
  DASHBOARD_REPORT_SCHEDULER_SEARCH_BUTTON: '//button[@id="btn-filter-search"]',
  DASHBOARD_REPORT_SCHEDULER_FILTER_CLOSE: "//label[contains(text(),'Filter')]/following-sibling::span",
  DASHBOARD_REPORT_SCHEDULER_VALIDATE: "((//div[contains(@class,'checkbox')])[1])/following::div[2]/p",
  AGENTS_MIRRORAGENT_UTILIZATION_TAB: "//span[contains(text(),'Utilization')]",
  AGENTS_MIRRORAGENT_UTILIZATION_EXPORT_TO_EXCEL: "(//span[contains(text(),'EXPORT_TO_EXCEL')])[3]",
  AGENTS_MIRRORAGENT_GROUPS_TAB: "(//span[contains(text(),'Groups')])[3]",


  //AGENTS_MIRRORAGENT_DIV_NONE: '//div[@id="select-agentcopy-divisions-panel"]//span[contains(text(),"None")]',
                     



  AGENTS_MIRRORAGENT_DASHBOARD_HISTORY: '//*[@id="grid"]/div[4]/div[3]/div/div[10]/div[2]',
  AGENTS_MIRRORAGENT_UTILIZATION_DESELECT:"//div[contains(@class, 'slick-header-columns')][.//span[text()='Media Type']]//div[@data-id='_checkbox_selector']//label",
  AGENTS_MIRRORAGENT_UTILIZATION_SELECT:"//div[contains(@class, 'slick-header-columns')][.//span[text()='Media Type']]//div[@data-id='_checkbox_selector']//label",
  AGENTS_MIRRORAGENT_UTILIZATION_MEDIA_SEARCH:"//div[contains(@class, 'slick-headerrow-column')]//input[@data-columnid='mediaType']",
  AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_SEARCH:"//div[contains(@class, 'slick-headerrow-column')]//input[@data-columnid='maximumCapacity']",
  AGENTS_MIRRORAGENT_UTILIZATION_GRID: "//div[contains(@class, 'slick-pane-header')][.//span[text()='Media Type']]//button[@aria-label='Grid Menu']",
  AGENTS_MIRRORAGENT_UTILIZATION_CAPACITY_INPUT:'//*[@id="copyUtilizationGrid"]/div[4]/div[3]/div/div[2]/div[3]/input',

  AGENTS_MIRRORAGENT_GROUP_DESELECT:"//div[contains(@class, 'slick-header-column')][.//span[text()='Group Name']]/preceding-sibling::div[@data-id='_checkbox_selector']//label",
  AGENTS_MIRRORAGENT_GROUP_SELECT:"//div[contains(@class, 'slick-header-column')][.//span[text()='Group Name']]/preceding-sibling::div[@data-id='_checkbox_selector']//label",
  AGENTS_MIRRORAGENT_GROUP_SEARCH:"//div[contains(@class, 'slick-headerrow-column')]//input[@data-columnid='name']",
  AGENTS_MIRRORAGENT_GROUP_GRID: "//div[@id='copyGroupGrid']//div[contains(@class, 'slick-pane slick-pane-header slick-pane-left')]//button[@aria-label='Grid Menu']",

  AGENTS_MIRRORAGENT_USERNAME_LABEL1: "(//span[contains(text(),'Mirror Agent Name')]//following::input[@type='checkbox']/following-sibling::label)[4]",
  AGENTS_MIRRORAGENT_ROLE_DESELECT:"//div[contains(@class, 'slick-header-column') and .//text()='Role']//label",
  AGENTS_MIRRORAGENT_ROLE_SELECT:"//div[contains(@class, 'slick-header-column') and .//text()='Role']//label",
  AGENTS_MIRRORAGENT_ROLE_SEARCH:'input[data-columnid="role"]',
  AGENTS_MIRRORAGENT_DIVISION_SEARCH:'//div[contains(@class, "l2") and contains(@class, "r2")]//input[@data-columnid="division"]',
  AGENT_MIRRORAGENT_ROLE_GRID:"//div[@id='copyRoleGrid']//div[contains(@class, 'slick-pane-left')]//button[@aria-label='Grid Menu']",
  AGENTS_MIRRORAGENT_CLEAR_ALL_FILTERS:"//div[contains(@class, 'slick-grid-menu') and contains(@style, 'display: block')]//li[@data-command='clear-filter']",
  AGENTS_MIRRORAGENT_TOGGLE_FILTERS:"div.slick-grid-menu[style*='display: block'] li[data-command='toggle-filter']",
  AGENTS_MIRRORAGENT_USERNAME_BULK_LABEL: "(//span[contains(text(),'Mirror Agent Name')]//following::input[@type='checkbox']/following-sibling::label)[2]",
  AGENTS_MIRRORAGENT_USERNAME_BULK_LABEL1: "(//span[contains(text(),'Mirror Agent Name')]//following::input[@type='checkbox']/following-sibling::label)[3]",
  AGENTS_MIRRORAGENT_SCHEDULER_BUTTON:'//*[@id="btn-agentcopy-schedule"]/span[1]',
  AGENTS_MIRRORAGENT_SCHEDULER_JOB_TITLE: '//*[@id="cdk-accordion-child-19"]/div/mat-dialog-content/div/div[2]/mat-form-field[1]/div[1]/div[2]',
  AGENTS_MIRRORAGENT_DIV_MEMBER: '//div[@id="select-agentcopy-divisions-panel"]//span[contains(text(),"Member")]',
  AGENTS_MIRRORAGENT_DIV_NONE: '//div[@id="select-agentcopy-divisions-panel"]//span[contains(text(),"None")]',
  AGENTS_MIRRORAGENT_GROUP_NONE: "(//div[contains(text(),'Please select either divisions or groups to search')])[1]",
  AGENTS_MIRRORAGENT_CONFIRM_OK: "//button[contains(text(),'Ok')]",
  AGENTS_MIRRORAGENT_SKILL_APPLY: "//*[@id='btn-agentcopy-apply']/span[1]"




};



