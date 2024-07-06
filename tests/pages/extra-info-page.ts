import { type Locator, type Page, expect } from '@playwright/test';
import generateRandomEmail from '../util/utils';

export class ExtraInfoPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly tag: Locator;
    readonly readyButton: Locator;
    readonly metallTag: Locator;

    readonly pageURL: RegExp = /.*extra-info/;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('extra-info-header');
        this.tag = page.getByTestId('extra-info-tag');
        this.readyButton = page.getByTestId('ready-button');
        this.metallTag = page.locator('p', { hasText: 'metall' });
    }

    async assertPageOpened() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.readyButton).toBeVisible();

        // Check URL
        await expect(this.page).toHaveURL(this.pageURL);
    }

    async clickTag() {
        await this.metallTag.click();
    }

    async clickReady() {
        await this.readyButton.click();
    }
}

export default ExtraInfoPage;
