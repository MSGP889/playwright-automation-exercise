import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly deliveryAddress: Locator;
    readonly orderReview: Locator;
    readonly commentBox: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryAddress = page.locator('#address_delivery');
        this.orderReview = page.locator('#cart_info');
        this.commentBox = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }
}