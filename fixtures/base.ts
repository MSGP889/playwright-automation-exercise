import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SignupPage } from '@pages/SignupPage';
import { LoginPage } from '@pages/LoginPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { PaymentPage } from '@pages/PaymentPage';
import { ContactUS } from '@pages/ContactUS';
import { FooterComponent } from '@pages/components/FooterComponent';

type MyFixtures = {
    homePage: HomePage;
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    signupPage: SignupPage;
    loginPage: LoginPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage
    contactPage: ContactUS;
    footer: FooterComponent;

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
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },

    contactPage: async ({ page }, use) => {
        await use(new ContactUS(page));
    },

    footer: async ({ page }, use) => {
        await use(new FooterComponent(page));
    }

});

export { expect };