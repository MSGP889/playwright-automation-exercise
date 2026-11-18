import {Page,Locator} from '@playwright/test';

export class ProductDetailsPage
{
    readonly page: Page;
    readonly productName :Locator;

    constructor(page:Page){
        this.page=page;
        this.productName = page.locator('.product-information h2');
    }
}
