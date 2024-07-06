import { test } from '@playwright/test';
import SignupPage from './pages/signup-page';
import UserProfilePage from './pages/user-profile-page';
import ExtraInfoPage from './pages/extra-info-page';

let signupPage: SignupPage;
let extraInfoPage: ExtraInfoPage;
let profilePage: UserProfilePage;
const URL = 'http://localhost:3000/auth/signup';

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    signupPage = new SignupPage(page);
    extraInfoPage = new ExtraInfoPage(page);
    profilePage = new UserProfilePage(page);
});

test.describe('Signup page', () => {
    test('Page opened', async () => {
        await signupPage.assertPageOpened();
    });

    test('Sign up', async () => {
        await signupPage.enterName();
        await signupPage.enterEmail();
        await signupPage.enterPassword();
        await signupPage.clickCreateAccount();

        // Check that extra-info page is opened
        await extraInfoPage.assertPageOpened();

        // Chose tags
        await extraInfoPage.clickTag();
        await extraInfoPage.clickReady();

        // Check that profile page is opened
        await profilePage.assertPageOpened();
    });
});
