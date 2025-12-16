import { type Locator, type Page } from '@playwright/test';
import { SELECTORS, TIMEOUTS, URLS } from '../configs/constants';

export class LoginPage {
  readonly page: Page;

  // Login form elements
  readonly usernameText: Locator;
  readonly passwordText: Locator;
  readonly continueButton: Locator;
  readonly dccm: Locator;
  readonly dashboardAgents: Locator;
  readonly agentsMoreIcon: Locator;
  readonly agentsMirrorAgent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameText = page.locator(SELECTORS.LOGIN_USERNAME_INPUT);
    this.passwordText = page.locator(SELECTORS.LOGIN_PASSWORD_INPUT);
    this.continueButton = page.locator(SELECTORS.LOGIN_CONTINUE_BUTTON);
    this.dccm = page.locator(SELECTORS.DCCM);
    this.dashboardAgents = page.locator(SELECTORS.DASHBOARD_AGENTS);
    this.agentsMoreIcon = page.locator(SELECTORS.AGENTS_MORE_ICON);
    this.agentsMirrorAgent = page.locator(SELECTORS.AGENTS_MIRROR_AGENT);
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.page.goto(URLS.LOGIN);
    await this.page.waitForLoadState('networkidle');
    await this.usernameText.fill(username);
    await this.passwordText.fill(password);
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.dccm.click();
  }
}






