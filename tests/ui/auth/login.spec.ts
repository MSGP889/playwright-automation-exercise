import { test, expect } from '@fixtures/base';
import { buildUser, UserData } from '@utils/userData';
import { createUserViaApi, deleteUserViaApi } from '@utils/apiHelpers';

test.describe('Login', { tag: '@regression' }, () => {
    let user: UserData;

    // runs once per worker, before the tests in this describe
    test.beforeAll(async ({ playwright }) => {
        const api = await playwright.request.newContext({
            baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
        });
        user = buildUser();
        await createUserViaApi(api, user);
        await api.dispose();
    });

    // runs once per worker, after the tests in this describe
    test.afterAll(async ({ playwright }) => {
        const api = await playwright.request.newContext({
            baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
        });
        await deleteUserViaApi(api, user);
        await api.dispose();
    });

    test('existing user can log in', { tag: '@smoke' }, async ({ homePage, loginPage, page }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(user.email, user.password);
        await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
    });

    test('login with a wrong password shows an error message', async ({ homePage, loginPage, page }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(user.email, 'invalidpassword');
        await expect(loginPage.errorMessage).toHaveText('Your email or password is incorrect!');
        await expect(homePage.loggedInAs).not.toBeVisible();
    });

    test('a logged-in user can log out', async ({ homePage, loginPage, page }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(user.email, user.password);
        await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
        await homePage.logoutLink.click();
        await expect(page).toHaveURL(/login/);
        await expect(loginPage.signupHeading).toHaveText('New User Signup!');
        await expect(homePage.loggedInAs).not.toBeVisible();
    });

    test('login form can be submitted using only the keyboard', async ({ homePage, loginPage, page }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);

        await loginPage.loginEmailInput.fill('test@email.com');
        await loginPage.loginEmailInput.press('Tab');
        await expect(loginPage.loginPasswordInput).toBeFocused();

        await page.keyboard.type('Test1234');
        await page.keyboard.press('Enter');

        await expect(loginPage.errorMessage).toBeVisible();
    });
});