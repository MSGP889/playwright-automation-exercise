import { Page, Locator } from '@playwright/test';
import { UserData } from '@utils/userData';

export class SignupPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedMessage: Locator;
    readonly continueButton: Locator;
    readonly accountDeletedHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByText('Enter Account Information');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedMessage = page.getByText('Account Created!');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.accountDeletedHeading = page.getByText('Account Deleted!');
    }

    async fillAccountDetails(user: UserData) {
        await this.page.locator('#id_gender1').check();
        await this.page.locator('[data-qa="password"]').fill(user.password);
        await this.page.locator('[data-qa="days"]').selectOption(user.day);
        await this.page.locator('[data-qa="months"]').selectOption(user.month);
        await this.page.locator('[data-qa="years"]').selectOption(user.year);
        await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
        await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
        await this.page.locator('[data-qa="company"]').fill(user.company);
        await this.page.locator('[data-qa="address"]').fill(user.address);
        await this.page.locator('[data-qa="country"]').selectOption(user.country);
        await this.page.locator('[data-qa="state"]').fill(user.state);
        await this.page.locator('[data-qa="city"]').fill(user.city);
        await this.page.locator('[data-qa="zipcode"]').fill(user.zipcode);
        await this.page.locator('[data-qa="mobile_number"]').fill(user.mobile);
    }
}