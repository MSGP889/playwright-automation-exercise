import {test, expect} from '@fixtures/base';
import { buildUser } from '@utils/userData';
import { createUserViaApi, deleteUserViaApi} from '@utils/apiHelpers';

test('existing user can log in', async ({ homePage, loginPage, page, request }) => {
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