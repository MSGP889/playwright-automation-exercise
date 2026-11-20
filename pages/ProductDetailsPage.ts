import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly price: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-information h2');
        this.price = page.locator('.product-information span span');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.locator('button.cart');
        this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
    }
}
