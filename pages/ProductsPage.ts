import { Page, Locator, expect } from '@playwright/test';

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
    readonly categoryPageHeading: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;

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
        this.categoryPageHeading = page.locator('.features_items > h2.title');
        this.addToCartButton = this.productCards.getByRole('button', { name: 'Add to cart' });
        this.addToCartButton = this.productCards.locator('.productinfo .add-to-cart');
        this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' });
    }

    async navigateToProductsPage() {
        await this.page.goto('/products');
    }

    async openProductDetails(index: number) {
        await this.productCards.nth(index).getByRole('link', { name: 'View Product' }).click();
    }

    async filterByCategory(parent: string, sub: string) {
        await this.page.locator(`.category-products a[href="#${parent}"] .badge`).click();
        await this.page.locator(`#${parent}`).getByRole('link', { name: sub }).click();
    }

    async filterByBrand(brand: string) {
        await this.page.getByRole('link', { name: brand }).click();
    }

}