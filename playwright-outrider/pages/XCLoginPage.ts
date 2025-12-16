import { Page, Locator, expect } from '@playwright/test';
import { XC_SELECTORS, XC_TIMEOUTS, XC_URLS, XC_CREDENTIALS } from '../configs/xc_constants';

/**
 * XC Login Page Object Model
 * Handles authentication for the XC demo application
 */
export class XCLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly notThisDeviceButton: Locator;
  readonly landingPageElement: Locator;
  readonly parallelLoginPopup: Locator;
  readonly parallelLoginButton: Locator;
  readonly profileIcon: Locator;
  readonly logoutButton: Locator;
  readonly syncMonitorButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(XC_SELECTORS.LOGIN_USERNAME_INPUT);
    this.passwordInput = page.locator(XC_SELECTORS.LOGIN_PASSWORD_INPUT);
    this.continueButton = page.locator(XC_SELECTORS.LOGIN_CONTINUE_BUTTON);
    this.notThisDeviceButton = page.locator(XC_SELECTORS.NOT_THIS_DEVICE_BUTTON);
    this.landingPageElement = page.locator(XC_SELECTORS.LANDING_PAGE_ELEMENT);
    this.parallelLoginPopup = page.locator(XC_SELECTORS.PARALLEL_LOGIN_POPUP);
    this.parallelLoginButton = page.locator(XC_SELECTORS.PARALLEL_LOGIN_BUTTON);
    this.profileIcon = page.locator(XC_SELECTORS.PROFILE_ICON);
    this.logoutButton = page.locator(XC_SELECTORS.LOGOUT_BUTTON);
    this.syncMonitorButton = page.locator(XC_SELECTORS.SYNC_MONITOR_BUTTON);
  }

  /**
   * Navigate to XC login page
   */
  async goto(): Promise<void> {
    try {
      await this.page.goto(XC_URLS.LOGIN_URL);
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to navigate to XC login page: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Complete two-step login process with credentials
   */
  async login(username?: string, password?: string): Promise<void> {
    try {
      const loginUsername = username || XC_CREDENTIALS.USERNAME;
      const loginPassword = password || XC_CREDENTIALS.PASSWORD;

      // Step 1: Enter username and click continue
      await this.usernameInput.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.usernameInput.fill(loginUsername);

      await this.continueButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.continueButton.click();
      await this.page.waitForLoadState('domcontentloaded');

      // Step 2: Enter password and click continue
      await this.passwordInput.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.passwordInput.fill(loginPassword);

      await this.continueButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.continueButton.click();
      await this.page.waitForLoadState('domcontentloaded');

    } catch (error) {
      throw new Error(`Failed to complete XC login: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

    /**
   * Click "Not on this device" button (with visibility check)
   */
  async clickNotThisDevice(): Promise<void> {
    try {
      // Check if the button is visible first
      const isVisible = await this.notThisDeviceButton.isVisible();
      
      if (isVisible) {
        await this.notThisDeviceButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
        await this.notThisDeviceButton.click();
      }
    } catch (error) {
      throw new Error(`Failed to click XC "Not on this device": ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Handle parallel login popup if it appears
   */
  async handleParallelLoginPopup(): Promise<void> {
    try {
      // Wait for page to settle after login
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(3000); // Give more time for popup to appear
      
      // Try to wait for the popup to appear with a timeout
      try {
        await this.parallelLoginPopup.waitFor({ state: 'visible', timeout: 10000 });
        console.log('Parallel login popup detected, clicking button...');
        
        // Wait for the button to be visible and clickable
        await this.parallelLoginButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
        
        // Click the button
        await this.parallelLoginButton.click();
        console.log('Parallel login button clicked');
        
        // Wait for the popup to disappear
        await this.page.waitForTimeout(2000);
      } catch (popupError) {
        console.log('No parallel login popup appeared within timeout');
      }
    } catch (error) {
      // Don't throw error, just log it - popup might not appear
      console.log(`Parallel login popup handling: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verify landing page is loaded
   */
  async verifyLandingPage(): Promise<void> {
    try {
      // Wait for page to be fully loaded first
      await this.page.waitForLoadState('domcontentloaded');

      // Wait for the page to settle and then look for the welcome message
      await this.page.waitForTimeout(3000); // Give extra time for dynamic content
      
      // Then wait for the landing page element with longer timeout
      await this.landingPageElement.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.PAGE_LOAD });
    } catch (error) {
      throw new Error(`Failed to verify XC landing page: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

    /**
   * Complete full login flow including "Not on this device" check
   */
  async completeLoginFlow(username?: string, password?: string): Promise<void> {
    try {
      await this.goto();
      await this.login(username, password);
      await this.clickNotThisDevice();
      
      // Handle parallel login popup if it appears
      await this.handleParallelLoginPopup();
      
      // Check if we're on MFA detection page or landing page
      const currentUrl = this.page.url();
      console.log(`Current URL after login: ${currentUrl}`);
      if (currentUrl.includes('mfa-detect-browser-capabilities')) {
        // Don't verify landing page if we're on MFA page
      } else {
        await this.verifyLandingPage();
      }
    } catch (error) {
      throw new Error(`Failed to complete XC login flow: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Click the sync monitor button
   */
  async clickSyncMonitor(): Promise<void> {
    try {
      await this.syncMonitorButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.syncMonitorButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click sync monitor button: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Logout from the application
   * Clicks profile icon first, then logout option
   */
  async logout(): Promise<void> {
    try {
      // Step 1: Click profile icon
      await this.profileIcon.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.profileIcon.click();

      // Step 2: Click logout button
      await this.logoutButton.waitFor({ state: 'visible', timeout: XC_TIMEOUTS.ELEMENT_WAIT });
      await this.logoutButton.click();

    } catch (error) {
      throw new Error(`Failed to complete XC logout: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 