import { Page, Locator } from '@playwright/test';

type Card = { nameOnCard: string; number: string; cvc: string; expiryMonth: string; expiryYear: string };

export class PaymentPage {
    readonly page: Page;
    readonly payButton: Locator;
    readonly orderPlacedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.payButton = page.locator('[data-qa="pay-button"]');
        this.orderPlacedHeading = page.locator('[data-qa="order-placed"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }

    async fillPaymentDetails(card: Card) {
        await this.page.locator('[data-qa="name-on-card"]').fill(card.nameOnCard);
        await this.page.locator('[data-qa="card-number"]').fill(card.number);
        await this.page.locator('[data-qa="cvc"]').fill(card.cvc);
        await this.page.locator('[data-qa="expiry-month"]').fill(card.expiryMonth);
        await this.page.locator('[data-qa="expiry-year"]').fill(card.expiryYear);
    }
}