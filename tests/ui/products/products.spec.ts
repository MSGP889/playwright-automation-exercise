import { test, expect } from '@fixtures/base';
import { ProductsPage } from '@pages/ProductsPage';


test.describe("products Page", () => {

    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductsPage();
    });

    test('products page lists all products', async ({ productsPage }) => {
        await expect(productsPage.heading).toBeVisible();
        await expect(productsPage.productCards).toHaveCount(34);
    });

    test('every product card shows a name and a price', async ({ productsPage }) => {
        await expect(productsPage.productName).toHaveCount(34);
        await expect(productsPage.productPrice).toHaveCount(34);
    });

    test('View Product opens the product detail page', async ({ productsPage, page }) => {
        await productsPage.navigateToProductsPage();
        const firstName = await productsPage.productName.first().textContent();
        await productsPage.openProductDetails(0);
        await expect(page).toHaveURL(/product_details/);
        await expect(page.locator('.product-information h2')).toHaveText(firstName!);
    });

    test('sidebar shows Category and Brands sections', async ({ productsPage }) => {
        await expect(productsPage.categoryHeading).toBeVisible();
        await expect(productsPage.brandsHeading).toBeVisible();
    });

    test("Search for Product", async ({ productsPage }) => {
        await productsPage.searchBox.fill("Top");
        await productsPage.searchBtn.click();
        await expect(productsPage.searchedHeading).toBeVisible();
        const titles = await productsPage.productTitles.allTextContents();
        expect(titles).toContain('Fancy Green Top');
        expect(titles.length).toBe(14);

    });
})