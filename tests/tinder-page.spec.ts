import { test, type Page } from '@playwright/test';
import TinderPage from './pages/tinder-page';
import authenticateTestUser from './utils/authUtils';

let tinderPage: TinderPage;
const URL = 'http://localhost:3000/tinder';
const testUser = {
    about: 'pierdolę 23',
    bands: ['Kurwa'],
    email: 'qw@qw.com',
    id: 'CfwHupr1GIfatdth3f2DoeTFTmU2',
    name: 'R2-D2',
    tags: ['rock 🎸', 'classical 🎻', 'electronic 👾'],
};

test.beforeAll(async () => {
    authenticateTestUser(testUser);
});

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    tinderPage = new TinderPage(page);
});

test.describe('Tinder page', () => {
    test('Page opened', async () => {
        await tinderPage.assertPageOpened();
    });

    test('Swipe right', async () => {
        await tinderPage.swipeCard('right');
    });

    test('Swipe left', async () => {
        await tinderPage.swipeCard('left');
    });
});
