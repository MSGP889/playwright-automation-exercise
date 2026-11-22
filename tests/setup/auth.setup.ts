import { test as setup, expect } from '@fixtures/base';
import { buildUser } from '@utils/userData';
import { createUserViaApi } from '@utils/apiHelpers';
import fs from 'fs';

setup('authenticate', async ({ homePage, loginPage, page, request }) => {
    const user = buildUser();
    await createUserViaApi(request, user);

    await homePage.navigateToHomePage();
    await homePage.signupLoginLink.click();
    await loginPage.login(user.email, user.password);
    await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);

    fs.mkdirSync('playwright/.auth', { recursive: true });
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
    fs.writeFileSync('playwright/.auth/user-data.json', JSON.stringify(user));
});