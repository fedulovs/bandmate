import { test, type Page } from '@playwright/test';
import LoginPage from './pages/login-page';
import UserProfilePage from './pages/user-profile-page';

let loginPage: LoginPage;
let profilePage: UserProfilePage;
const URL = 'http://localhost:3000/auth/login';

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    loginPage = new LoginPage(page);
    profilePage = new UserProfilePage(page);
});

test.describe('Login page', () => {
    test('Page opened', async () => {
        await loginPage.assertPageOpened();
    });

    test('Log in', async () => {
        await loginPage.enterEmail();
        await loginPage.enterPassword();
        await loginPage.clickLogIn();

        // Check that profile page is opened
        await profilePage.assertPageOpened();
    });
});
