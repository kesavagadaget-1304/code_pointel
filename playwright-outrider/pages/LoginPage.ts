import { type Locator, type Page } from '@playwright/test';
import { SELECTORS, TIMEOUTS, URLS } from '../configs/constants';

export class LoginPage {
  readonly page: Page;
  
  // Login form elements
  readonly usernameText: Locator;
  readonly passwordText: Locator;
  readonly continueButton: Locator;
  
  // Payroll Admin login form elements
  readonly adminusername: Locator;
  readonly adminpassword: Locator;
  readonly admincontinue: Locator;
  readonly adminloginButton: Locator;
  readonly admincontinueToPayroll: Locator;
  readonly admincontinueToPayrollButton: Locator;

  // Post-login elements
  readonly toastLogo: Locator;
  readonly myAccountButton: Locator;
  readonly logoutButton: Locator;

  // Payroll Admin logout elements
  readonly adminaccountButton: Locator;
  readonly adminlogut: Locator;

  
  // Pendo popup elements
  readonly pendoBumper: Locator;
  readonly pendoCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize admin login form locators
    this.adminusername = page.locator(SELECTORS.PAYROLL_ADMIN_USERNAME);
    this.adminpassword = page.locator(SELECTORS.PAYROLL_ADMIN_PASSWORD);
    this.admincontinue = page.locator(SELECTORS.PAYROLL_ADMIN_NEXT);
    this.adminloginButton = page.locator(SELECTORS.PAYROLL_ADMIN_LOGIN_BUTTON);
    this.admincontinueToPayroll = page.locator(SELECTORS.PAYROLL_ADMIN_CONTINUE_TO_PAYROLL);
    this.admincontinueToPayrollButton = page.locator(SELECTORS.PAYROLL_ADMIN_CONTINUE_TO_PAYROLL_BUTTON);
    

    // Initialize login form locators
    this.usernameText = page.locator(SELECTORS.LOGIN_USERNAME_INPUT);
    this.passwordText = page.locator(SELECTORS.LOGIN_PASSWORD_INPUT);
    this.continueButton = page.locator(SELECTORS.LOGIN_CONTINUE_BUTTON);
    
    // Initialize post-login locators
    this.toastLogo = page.locator(SELECTORS.LOGIN_TOAST_LOGO);
    this.myAccountButton = page.locator(SELECTORS.LOGIN_MY_ACCOUNT_BUTTON);
    this.logoutButton = page.locator(SELECTORS.LOGIN_LOGOUT_BUTTON);

    // Initialize Payroll Admin logout locators
    this.adminaccountButton = page.locator(SELECTORS.PAYROLL_ADMIN_ACCOUNT_MENU);
    this.adminlogut=page.locator(SELECTORS.PAYROLL_ADMIN_LOGOUT);

    
    // Initialize Pendo popup locators
    this.pendoBumper = page.locator(SELECTORS.PENDO_BUMPER_FOCUS_BUMPER);
    this.pendoCloseButton = page.locator(SELECTORS.PENDO_BUMPER_CLOSE_BUTTON);
  }




  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    try {
      await this.page.goto(URLS.LOGIN);
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to navigate to login page: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async navigateToLoginAdmin(): Promise<void> {
    // Assuming the admin login URL is ADMIN_HOME as per the available URLS
    await this.page.goto(URLS.ADMIN_PAYROLL);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

//  Enter Admin Username
async enterAdminUsername(username: string): Promise<void> {
  await this.adminusername.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
  await this.adminusername.fill(username);
  await this.admincontinue.click();
  await this.page.waitForLoadState('domcontentloaded');
}

// Enter Admin Password
async enterAdminPassword(password: string): Promise<void> {
  await this.adminpassword.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
  await this.adminpassword.fill(password);
  await this.adminloginButton.click();
  await this.page.waitForLoadState('domcontentloaded');
}




  /**
   * Enter username and proceed
   */
  async enterUsername(username: string): Promise<void> {
    try {
      await this.usernameText.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.usernameText.fill(username);
      await this.continueButton.click();
    } catch (error) {
      throw new Error(`Failed to enter username: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Enter password and proceed
   */
  async enterPassword(password: string): Promise<void> {
    try {
      await this.passwordText.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.passwordText.fill(password);
      await this.continueButton.click();
    } catch (error) {
      throw new Error(`Failed to enter password: ${error instanceof Error ? error.message : String(error)}`);
    }
  }


  /**
   * Complete admin login flow
   */
  async adminSignIn(username: string, password: string): Promise<void> {
    await this.navigateToLoginAdmin();
    await this.enterAdminUsername(username);
    await this.page.waitForLoadState('domcontentloaded');
    
    await this.enterAdminPassword(password);
    await this.page.waitForLoadState('domcontentloaded');
    
    await this.page.waitForLoadState('domcontentloaded');
    await this.admincontinueToPayroll.click();
    await this.admincontinueToPayrollButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Complete login flow
   */
  async signIn(username: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.enterUsername(username);
    await this.enterPassword(password);
    
    // Wait for login to complete and toast logo to be visible
    // await this.toastLogo.waitFor({ state: 'visible', timeout: 30000 }); // Increased timeout for slower loading
    // await this.toastLogo.click();
    
    // Wait for page to be fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    
    // Close any Pendo bumpout that might appear after login
    await this.closePendoBumper();
    
    // Verify login success
    await this.verifyLoginSuccess();
  }

  /**
   * Verify successful login
   */
  async verifyLoginSuccess(): Promise<void> {
    const currentUrl = this.page.url();
    if (currentUrl.includes('login') || currentUrl.includes('auth')) {
      throw new Error(`Login failed: Still on authentication page. Current URL: ${currentUrl}`);
    }
  }

  /**
   * Wait for page to be ready for interaction
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector('body');
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    try {
      // Click on My Account button
      await this.myAccountButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.myAccountButton.click();
      
      // Click on Logout button
      await this.logoutButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      await this.logoutButton.click();
      
      // Wait for logout to complete (redirect to login page)
      await this.page.waitForLoadState('load');
      
    } catch (error) {
      //const currentUrl = this.page.url();
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

   async adminLogout(): Promise<void> {
    await this.adminaccountButton.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    await this.adminaccountButton.click();
    await this.adminlogut.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
    await this.adminlogut.click();
    await this.page.waitForLoadState('domcontentloaded');
   }




  /**
   * Close Pendo bumper if it appears - Enhanced version
   */
  async closePendoBumper(): Promise<void> {
    try {
      // Wait a moment for any Pendo elements to appear
      await this.page.waitForTimeout(1000);
      
      // Check for various Pendo selectors that might appear
      const pendoSelectors = [
        SELECTORS.PENDO_BUMPER_FOCUS_BUMPER,
        '[data-pendo-id]',
        '.pendo-bumper',
        '.pendo-overlay',
        '[class*="pendo"]',
        '[id*="pendo"]'
      ];
      
      for (const selector of pendoSelectors) {
        try {
          const pendoElement = this.page.locator(selector);
          const isVisible = await pendoElement.isVisible();
          
          if (isVisible) {
            console.log(`Found Pendo element: ${selector}`);
            
            // Try multiple close strategies
            const closeStrategies = [
              // Strategy 1: Look for close button within the Pendo element
              () => pendoElement.locator('button[aria-label*="close"], .close, [data-testid*="close"], [class*="close"]').click(),
              // Strategy 2: Look for X button
              () => pendoElement.locator('button:has-text("×"), button:has-text("✕"), button:has-text("X")').click(),
              // Strategy 3: Look for "Got it" or similar buttons
              () => pendoElement.locator('button:has-text("Got it"), button:has-text("OK"), button:has-text("Close"), button:has-text("Dismiss")').click(),
              // Strategy 4: Click outside the Pendo element
              () => this.page.click('body', { position: { x: 50, y: 50 } }),
              // Strategy 5: Click on backdrop/overlay
              () => this.page.locator('.pendo-backdrop, .pendo-overlay, [class*="backdrop"], [class*="overlay"]').click()
            ];
            
            for (const strategy of closeStrategies) {
              try {
                await strategy();
                console.log(`Pendo closed successfully using strategy`);
                break;
              } catch (strategyError) {
                // Continue to next strategy
                continue;
              }
            }
            
            // Wait a moment for the close action to take effect
            await this.page.waitForTimeout(500);
          }
        } catch (selectorError) {
          // Continue to next selector
          continue;
        }
      }
      
      // Final cleanup: Try escape key multiple times
      for (let i = 0; i < 3; i++) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);
      }
      
    } catch (error) {
      // Silently handle Pendo closing errors
      console.log(`Pendo handling completed with potential errors: ${error}`);
    }
  }

}






