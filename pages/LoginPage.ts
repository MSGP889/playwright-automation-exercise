import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signupHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
    }

    async startSignup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

}