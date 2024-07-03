import { test, type Page } from '@playwright/test';
import LoginPage from './pages/login-page';

let loginPage: LoginPage;
const URL = 'http://localhost:3000/auth/login';
// const partialURL = /.*auth/login/;

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    loginPage = new LoginPage(page);
});

test.describe('Login page', () => {
    test('Page opened', async () => {
        await loginPage.assertPageOpened();
    });
});
