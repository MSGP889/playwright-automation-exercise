import {test,expect} from '@fixtures/base';
import { UserData } from '@utils/userData';
import fs from 'fs';

test("logged-in user sees their name, Logout and Delete Account in the header", { tag: '@regression' }, async({homePage})=>{

    const user: UserData = JSON.parse(fs.readFileSync('playwright/.auth/user-data.json', 'utf-8'));
    await homePage.navigateToHomePage();
    await expect(homePage.loggedInAs).toHaveText(`Logged in as ${user.name}`);
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.deleteAccountLink).toBeVisible();
    await expect(homePage.signupLoginLink).not.toBeVisible();
});