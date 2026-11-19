import { test, expect } from '@fixtures/base';
import { buildUser } from '@utils/userData';

test.describe('Signup', () => {
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
});