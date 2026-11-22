import { test, expect } from '@fixtures/base';

test.describe('Home page', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePage();
    });

    test('home page loads with title and logo', { tag: '@smoke' }, async ({ homePage, page }) => {
        await expect(page).toHaveTitle(/Automation Exercise/);
        await expect(homePage.logo).toBeVisible();
    });

    test('header navigation links are visible', { tag: '@smoke' }, async ({ homePage }) => {
        await expect(homePage.headerLinks).toHaveCount(8);

        const names = ['Home', 'Products', 'Cart', 'Signup / Login', 'Test Cases', 'API Testing', 'Video Tutorials', 'Contact us'];
        for (const name of names) {
            await expect(homePage.navLink(name)).toBeVisible();
        }
    });

    const navCases = [
        { name: 'Products', url: /products/, heading: 'All Products' },
        { name: 'Signup / Login', url: /login/, heading: 'Login to your account' },
        { name: 'Contact us', url: /contact_us/, heading: 'Get In Touch' },
        { name: 'Test Cases', url: /test_cases/, heading: 'Test Cases' },
        { name: 'API Testing', url: /api_list/, heading: 'APIs List for practice' },
    ];

    for (const { name, url, heading } of navCases) {
        test(`${name} link navigates to the correct page`, async ({ homePage, page }) => {
            await homePage.navLink(name).click();
            await expect(page).toHaveURL(url);
            await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
        });
    }

    test('recommended item can be added to the cart', async ({ homePage, productsPage, cartPage }) => {
        await expect(homePage.recommendedHeading).toBeVisible();

        await homePage.recommendedAddToCartButton.click();
        await productsPage.viewCartLink.click();

        await expect(cartPage.rows).toHaveCount(1);
    });

    test('scroll up using the arrow button', async ({ homePage }) => {
       
        await homePage.subscriptionHeading.scrollIntoViewIfNeeded();
        await expect(homePage.subscriptionHeading).toBeInViewport();
        await homePage.scrollUpButton.click();
        await expect(homePage.heroTextHeading).toBeInViewport();
    });

});