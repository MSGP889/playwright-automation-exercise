import { Page, Locator } from '@playwright/test';

export class FooterComponent {
    readonly subscriptionHeading: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.subscriptionHeading = page.locator('footer').getByText('Subscription', { exact: true });
        this.emailInput = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe');
        this.successMessage = page.getByText('You have been successfully subscribed!');
    }

    async subscribe(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

}