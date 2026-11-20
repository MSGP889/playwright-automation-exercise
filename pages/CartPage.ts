import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly rows: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly quantity: Locator;
    readonly total: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator('#cart_info_table tbody tr');
        this.productName = this.rows.first().locator('.cart_description h4 a');
        this.productPrice = this.rows.first().locator('.cart_price p');
        this.quantity = this.rows.first().locator('.cart_quantity button');
        this.total = this.rows.first().locator('.cart_total_price');
    }
}