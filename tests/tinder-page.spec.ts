import { test, type Page } from '@playwright/test';
import TinderPage from './pages/tinder-page';
import authenticateTestUser from './utils/authUtils';

let tinderPage: TinderPage;
const URL = 'http://localhost:3000/tinder';
const testUser = {
    about: 'Ja pierdolę patrzcie co spotkałem! bóbr kurwa! ja pierdolę! jakie bydlę! bober! ej, kurwa, bober! bober, nie spierdalaj, mordo! chodź ty, kurwo, do mnie! bober! ale jesteś kurwa duży, ty! bober! ja pierdolę, pierwszy raz w życiu widzę bobra! jakie bydlę jebane! spierdolił do wody i się utopił! Ja pierdolę patrzcie co spotkałem! bóbr kurwa! ja pierdolę! 23',
    bands: ['Kurwa'],
    email: 'test@test.com',
    id: '12345678d',
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
