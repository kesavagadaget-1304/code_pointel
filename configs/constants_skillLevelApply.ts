// Simple, focused constants for current testing needs

// Environment validation
const validateEnvironment = () => {
    const requiredVars = [
        'LOGIN_USERNAME', 'LOGIN_PASSWORD', 'BASE_URL', 'USER_DCCM_1', 'USER_DCCM_2'
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
    AGENTS_CHECKBOX1: "(//div[contains(@class,'checkbox')])[1]",

    AGENTS_USERNAME_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following::span)[1]",
    AGENTS_USERNAME2_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following-sibling::span)[2]",
    AGENTS_USERNAME3_COPY: "(//i[contains(@title,'Edit_Agent.header')]/following-sibling::span)[3]",

    AGENTS_SKILLAPPLY_BULKEDIT: '//span[@id="btn-agentmapping-bulkedit"]',
    AGENTS_SKILLAPPLY_BULKEDIT_SKILL_LEVEL_TEXTBOX: '//input[@id="skillLevel"]',
    AGENTS_SKILLAPPLY_BULKEDIT_CLOSE: "(//h5[contains(text(),'Agent Edit')]/following::img)[1]",
    
    AGENTS_SKILLAPPLY_BULKEDIT_APPLY_BUTTON: "//span[contains(text(),'Apply')]",

    AGENTS_SKILLAPPLY_1ST_SKILL: "(//div[@id='addUpdateSkillGrid']//following::div[contains(@class,'slick-cell l1 r1')])[1]",
    AGENTS_SKILLAPPLY_1ST_SKILL_CHECKBOX: "(//div[@id='addUpdateSkillGrid']//following::div[contains(@class,'slick-cell l0 r0')])[1]",
    AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL : "(//div[@id='addUpdateSkillGrid']//following::div[contains(@class,'slick-cell l2 r2')]/input)[1]",
    AGENTS_SKILLAPPLY_1ST_SKILL_LEVEL_DROPDOWN_OPTION: "//div[@data-name='editor-skillLevel']/ul/li[%s]/label",
    AGENTS_SKILLAPPLY_SUCCESS_MESSAGE: "//div[contains(text(),' Updated successfully')]",
    AGENTS_USEREDIT_SKILL_TAB : "//span[contains(text(),'Skills')]",
    AGENTS_USEREDIT_UPDATED_SKILL_LEVEL: "(//div[@id='exportSkillGrid']//following::div[contains(@class,'slick-cell l2 r2')]/input)[1]",
    AGENTS_MIRRORAGENT_HISTORY_USER: '//img[@title="History"]',
    AGENTS_USERNAME_SEARCH_TEXTBOX: '//input[@aria-label="User Name Search Filter"]',
    HISTORY_CURRENT_VALUE : '((//div[@class="ui-widget-content slick-row even"])[1])/div[5]',
    HISTORY_PREVIOUS_VALUE : '((//div[@class="ui-widget-content slick-row even"])[1])/div[4]',
    HISTORY_CLOSE : "//button[contains(text(),'Close')]",
    AGENTS_DASHBOARD_HISTORY: "//div[contains(@class, 'slick-cell l1 r1') and contains(@class, 'selected')]//img[@title='History']",
    AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_TAB: "//span[contains(text(),'Languages')]",
    AGENTS_SKILLAPPLY_BULKEDIT_LANGUAGE_LEVEL_SEARCHBOX: '//input[@id="languageLevel"]',

    AGENTS_SKILLAPPLY_1ST_LANG: "(//div[@id='language-add-container']//following::div[contains(@class,'slick-cell l1 r1')])[1]",
    AGENTS_SKILLAPPLY_1ST_LANG_CHECKBOX: "(//div[@id='language-add-container']//following::div[contains(@class,'slick-cell l0 r0')])[1]",
    AGENTS_SKILLAPPLY_1ST_LANG_LEVEL : "(//div[@id='language-add-container']//following::div[contains(@class,'slick-cell l2 r2')]/input)[1]",
    AGENTS_SKILLAPPLY_1ST_LANG_LEVEL_DROPDOWN_OPTION: "//div[@data-name='editor-languageLevel']/ul/li[%s]/label",



};



