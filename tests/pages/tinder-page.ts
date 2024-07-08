import { type Locator, type Page, expect } from '@playwright/test';

export class TinderPage {
    readonly page: Page;
    readonly profileTitle: Locator;
    readonly tinderCard: Locator;
    readonly tinderTag: Locator;
    readonly rightSide: Locator;
    readonly leftSide: Locator;
    readonly swipeRightText: Locator;
    readonly swipeLeftText: Locator;

    readonly pageURL: RegExp = /.*tinder/;

    constructor(page: Page) {
        this.page = page;
        this.profileTitle = page.locator('h1', { hasText: 'Band Tinder' });
        this.tinderCard = page.locator('h3');
        this.tinderTag = page.getByTestId('tinder-tag');
        this.rightSide = page.getByTestId('right-side');
        this.leftSide = page.getByTestId('left-side');
        this.swipeRightText = page.getByText('You swiped right');
        this.swipeLeftText = page.getByText('You swiped left');
    }

    async assertPageOpened() {
        await expect(this.profileTitle).toBeVisible();
        await expect(this.tinderCard.last()).toBeVisible();
        await expect(this.rightSide).toBeVisible();
        await expect(this.leftSide).toBeVisible();

        // Checking first element to opt-out from strictness
        await expect(this.tinderTag.last()).toBeVisible();

        // Check URL
        await expect(this.page).toHaveURL(this.pageURL);
    }

    async swipeCard(direction: 'right' | 'left') {
        if (direction == 'right') {
            this.tinderCard.last().dragTo(this.rightSide);
            await expect(this.swipeRightText).toBeVisible();
        } else {
            this.tinderCard.last().dragTo(this.leftSide);
            await expect(this.swipeLeftText).toBeVisible();
        }
    }
}

export default TinderPage;
