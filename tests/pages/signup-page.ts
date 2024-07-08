import { type Locator, type Page, expect } from '@playwright/test';
import generateRandomEmail from '../utils/utils';

export class SignupPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly signupTitle: Locator;
    readonly nameText: Locator;
    readonly nameInput: Locator;
    readonly emailText: Locator;
    readonly emailInput: Locator;
    readonly passwordText: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly signupToLoginSwitch: Locator;
    readonly pageURL: RegExp = /.*signup/;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('login-header');
        this.signupTitle = page.locator('h1', { hasText: 'Create Account' });
        this.nameText = page.getByTestId('name-text');
        this.nameInput = page.getByTestId('name-input');
        this.emailText = page.getByTestId('email-text');
        this.emailInput = page.getByTestId('email-input');
        this.passwordText = page.getByTestId('password-text');
        this.passwordInput = page.getByTestId('password-input');
        this.submitButton = page.getByTestId('submit-button');
        this.signupToLoginSwitch = page.getByTestId('switch-to-log-in-button');
    }

    async assertPageOpened() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.signupTitle).toBeVisible();
        await expect(this.nameText).toBeVisible();
        await expect(this.nameInput).toBeVisible();
        await expect(this.emailText).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordText).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.signupToLoginSwitch).toBeVisible();

        // Check URL
        await expect(this.page).toHaveURL(this.pageURL);
    }

    async enterName() {
        await this.nameInput.fill('R2-D2');
    }

    async enterEmail() {
        await this.emailInput.fill(generateRandomEmail());
    }

    async enterPassword() {
        await this.passwordInput.fill('12345678');
    }

    async clickCreateAccount() {
        await this.submitButton.click();
    }
}

export default SignupPage;
