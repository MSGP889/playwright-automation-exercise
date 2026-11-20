import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly rows: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly quantity: Locator;
    readonly total: Locator;
    readonly removeFromCartButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator('#cart_info_table tbody tr');
        this.productName = this.rows.first().locator('.cart_description h4 a');
        this.productPrice = this.rows.first().locator('.cart_price p');
        this.quantity = this.rows.first().locator('.cart_quantity button');
        this.total = this.rows.first().locator('.cart_total_price');
        this.removeFromCartButton = page.locator('.cart_quantity_delete');
        this.emptyCartMessage = page.getByText('Cart is empty!');
    }

    nameOf(i: number) { return this.rows.nth(i).locator('.cart_description h4 a'); }
    priceOf(i: number) { return this.rows.nth(i).locator('.cart_price p'); }
    quantityOf(i: number) { return this.rows.nth(i).locator('.cart_quantity button'); }
    totalOf(i: number) { return this.rows.nth(i).locator('.cart_total_price'); }

}