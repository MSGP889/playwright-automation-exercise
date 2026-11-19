import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SignupPage } from '@pages/SignupPage';
import { LoginPage } from '@pages/LoginPage';
type MyFixtures = {
    homePage: HomePage;
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    signupPage: SignupPage;
    loginPage: LoginPage;
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
        await use(new ProductDetailsPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export { expect };