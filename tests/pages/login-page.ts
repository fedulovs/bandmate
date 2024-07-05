import { type Locator, type Page, expect } from '@playwright/test';

// import dotenv from 'dotenv';

// dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly loginTitle: Locator;
    readonly emailText: Locator;
    readonly emailInput: Locator;
    readonly passwordText: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;
    readonly loginToSignupSwitch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('login-header');
        this.loginTitle = page.locator('h1', { hasText: 'Log In' });
        this.emailText = page.getByTestId('email-text');
        this.passwordText = page.getByTestId('password-text');
        this.emailInput = page.getByTestId('email-input');
        this.passwordInput = page.getByTestId('password-input');
        this.logInButton = page.getByTestId('log-in-button');
        this.loginToSignupSwitch = page.getByTestId('switch-to-sign-up-button');
    }

    async assertPageOpened() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.loginTitle).toBeVisible();
        await expect(this.emailText).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordText).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginToSignupSwitch).toBeVisible();
    }

    async enterEmail() {
        await this.emailInput.fill(process.env.TEST_USER_EMAIL!);
    }

    async enterPassword() {
        await this.passwordInput.fill(process.env.TEST_USER_PASSWORD!);
    }

    async clickLogIn() {
        await this.logInButton.click();
    }
}

export default LoginPage;
