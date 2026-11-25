import { test, expect } from '@fixtures/base';

test.describe('Visual', { tag: '@visual' }, () => {
    test('home page logo looks the same', async ({ homePage }) => {
        await homePage.navigateToHomePage();
        await expect(homePage.logo).toBeVisible();
        await expect(homePage.logo).toHaveScreenshot('logo.png');
    });
    
});