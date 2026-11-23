import { test, expect } from '@fixtures/base';
import { buildUser } from '@utils/userData';
import { createUserViaApi, deleteUserViaApi } from '@utils/apiHelpers';

test.describe('Login', { tag: '@regression' }, () => {

    test('existing user can log in', { tag: '@smoke' }, async ({ homePage, loginPage, page, request }) => {

        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            await homePage.navigateToHomePage();
            await homePage.signupLoginLink.click();
            await expect(page).toHaveURL(/login/);
            await loginPage.login(user.email, user.password);
            await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
        } finally {
            await deleteUserViaApi(request, user);
        }
    });

    test('login with a wrong password shows an error message', async ({ homePage, loginPage, page, request }) => {

        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            await homePage.navigateToHomePage();
            await homePage.signupLoginLink.click();
            await expect(page).toHaveURL(/login/);
            await loginPage.login(user.email, 'invalidpassword');
            await expect(loginPage.errorMessage).toHaveText('Your email or password is incorrect!');
            await expect(homePage.loggedInAs).not.toBeVisible();
        } finally {
            await deleteUserViaApi(request, user);
        }
    });

    test('a logged-in user can log out', async ({ homePage, loginPage, page, request }) => {

        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            await homePage.navigateToHomePage();
            await homePage.signupLoginLink.click();
            await expect(page).toHaveURL(/login/);
            await loginPage.login(user.email, user.password);
            await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
            await homePage.logoutLink.click();
            await expect(page).toHaveURL(/login/);
            await expect(loginPage.signupHeading).toHaveText('New User Signup!');
            await expect(homePage.loggedInAs).not.toBeVisible();
        } finally {
            await deleteUserViaApi(request, user);
        }
    });
});