import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage'
import { productDetailsPage } from '@pages/ProductDetailsPage';

type MyFixtures = {
    homePage: HomePage;
    productsPage: ProductsPage;
    productDetailsPage: productDetailsPage;
};

export const test = base.extend<MyFixtures>({
    // Runs for every test: blocks ad/analytics requests
    page: async ({ page }, use) => {
        await page.route(/googlesyndication|doubleclick|googleadservices|adservice/, (route) =>
            route.abort()
        );
        await use(page);
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new productDetailsPage(page));
    }
});

export { expect };