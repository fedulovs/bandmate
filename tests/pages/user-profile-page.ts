import { type Locator, type Page, expect } from '@playwright/test';

export class UserProfilePage {
    readonly page: Page;
    readonly profileTitle: Locator;
    readonly profileImage: Locator;
    readonly profileName: Locator;
    readonly profileEmail: Locator;
    readonly profileDescription: Locator;
    readonly tags: Locator;
    readonly profileStartTinderButton: Locator;
    readonly pageURL: RegExp = /.*profile/;

    constructor(page: Page) {
        this.page = page;
        this.profileTitle = page.locator('h1', { hasText: 'Profile' });
        this.profileImage = page.getByTestId('profile-image');
        this.profileName = page.getByTestId('profile-name');
        this.profileEmail = page.getByTestId('profile-email');
        this.profileDescription = page.getByTestId('profile-description');
        this.tags = page.getByTestId('tags');
        this.profileStartTinderButton = page.getByTestId(
            'profile-start-tinder-button'
        );
    }

    async assertPageOpened() {
        await expect(this.profileTitle).toBeVisible();
        await expect(this.profileImage).toBeVisible();
        await expect(this.profileName).toBeVisible();
        await expect(this.profileEmail).toBeVisible();
        await expect(this.profileDescription).toBeVisible();
        await expect(this.tags).toBeVisible();
        await expect(this.profileStartTinderButton).toBeVisible();

        // Check URL
        await expect(this.page).toHaveURL(this.pageURL);
    }
}

export default UserProfilePage;
