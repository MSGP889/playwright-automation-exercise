import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly productCards: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly sidebar: Locator;
    readonly categoryHeading: Locator;
    readonly brandsHeading: Locator;
    readonly searchBox: Locator;
    readonly searchBtn: Locator;
    readonly searchedHeading: Locator;
    readonly productTitles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'All Products' });
        this.productCards = page.locator('.features_items>.col-sm-4');
        this.productName = this.productCards.locator('.productinfo p');
        this.productPrice = this.productCards.locator('.productinfo h2');
        this.sidebar = page.locator('.left-sidebar');
        this.categoryHeading = this.sidebar.getByRole('heading', { name: 'Category' });
        this.brandsHeading = this.sidebar.getByRole('heading', { name: 'Brands' });
        this.searchBox = page.locator('#search_product.form-control');
        this.searchBtn = page.locator('#submit_search.btn-default');
        this.searchedHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.productTitles = page.locator('.productinfo.text-center>p');
    }

    async navigateToProductsPage() {
        await this.page.goto('/products');
    }

    async openProductDetails(index: number) {
        await this.productCards.nth(index).getByRole('link', { name: 'View Product' }).click();
    }



}