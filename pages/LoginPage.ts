import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly signupHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.loginEmailInput = page.getByRole('textbox', { name: 'Email Address' }).first();
        this.loginPasswordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Your email or password is incorrect!');
    }

    async startSignup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

}