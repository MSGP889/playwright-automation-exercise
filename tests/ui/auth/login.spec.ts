import { test, expect } from '@fixtures/base';

test.describe('Login', { tag: '@regression' }, () => {

    test('existing user can log in', { tag: '@smoke' }, async ({ homePage, loginPage, page, apiUser }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(apiUser.email, apiUser.password);
        await expect(homePage.loggedInAs).toHaveText(`Logged in as ${apiUser.name}`);
    });

    test('login with a wrong password shows an error message', async ({ homePage, loginPage, page, apiUser }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(apiUser.email, 'invalidpassword');
        await expect(loginPage.errorMessage).toHaveText('Your email or password is incorrect!');
        await expect(homePage.loggedInAs).not.toBeVisible();
    });

    test('a logged-in user can log out', async ({ homePage, loginPage, page, apiUser }) => {
        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await loginPage.login(apiUser.email, apiUser.password);
        await expect(homePage.loggedInAs).toHaveText(`Logged in as ${apiUser.name}`);
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