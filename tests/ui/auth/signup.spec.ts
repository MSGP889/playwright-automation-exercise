import { test, expect } from '@fixtures/base';
import { buildUser } from '@utils/userData';

test.describe('Signup', { tag: '@regression' }, () => {

    test('new user can register, is logged in, and can delete the account', async ({ homePage, loginPage, signupPage, page }) => {

        const user = buildUser();

        await homePage.navigateToHomePage();
        await homePage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await expect(loginPage.signupHeading).toHaveText('New User Signup!');

        await loginPage.startSignup(user.name, user.email);
        await expect(page).toHaveURL(/signup/);
        await expect(signupPage.heading).toBeVisible();

        await signupPage.fillAccountDetails(user);
        await signupPage.createAccountButton.click();
        await expect(signupPage.accountCreatedMessage).toBeVisible();
        await signupPage.continueButton.click();
        await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
        await homePage.deleteAccountLink.click();
        await expect(signupPage.accountDeletedHeading).toBeVisible();
    });

    test('signup with existing email shows error message', async ({ homePage, loginPage, signupPage, page, request }) => {

        const user = buildUser();

        try {
            await homePage.navigateToHomePage();
            await homePage.signupLoginLink.click();
            await loginPage.startSignup(user.name, user.email);
            await signupPage.fillAccountDetails(user);
            await signupPage.createAccountButton.click();
            await expect(signupPage.accountCreatedMessage).toBeVisible();
            await signupPage.continueButton.click();
            await homePage.logoutLink.click();

            await loginPage.startSignup(user.name, user.email);
            await expect(signupPage.emailExistsMessage).toHaveText('Email Address already exist!');
        }

        finally {
            await request.delete('/api/deleteAccount', { form: { email: user.email, password: user.password } });
        }
    });

    test('account created in the UI exists in the backend (UI + API)', async ({ homePage, loginPage, signupPage, request }) => {

        const user = buildUser();

        try {
            // UI: sign up
            await homePage.navigateToHomePage();
            await homePage.signupLoginLink.click();
            await loginPage.startSignup(user.name, user.email);
            await signupPage.fillAccountDetails(user);
            await signupPage.createAccountButton.click();
            await expect(signupPage.accountCreatedMessage).toBeVisible();

            // API: verify the account exists in the backend
            const response = await request.get('/api/getUserDetailByEmail', { params: { email: user.email } });
            const body = JSON.parse(await response.text());
            expect(body.responseCode).toBe(200);
            expect(body.user).toMatchObject({ name: user.name, email: user.email });
        }

        finally {
            await request.delete('/api/deleteAccount', { form: { email: user.email, password: user.password } });
        }
    });

});