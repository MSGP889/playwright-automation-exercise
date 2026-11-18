import { test, expect } from '@fixtures/base';

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

    test('View Product opens the product detail page', async ({ productsPage, page, productDetailsPage }) => {
        const firstName = await productsPage.productName.first().textContent();
        await productsPage.openProductDetails(0);
        await expect(page).toHaveURL(/product_details/);
        await expect(productDetailsPage.productName).toHaveText(firstName!);
    });

    test('sidebar shows Category and Brands sections', async ({ productsPage }) => {
        await expect(productsPage.categoryHeading).toBeVisible();
        await expect(productsPage.brandsHeading).toBeVisible();
    });

    test("Search for Product", async ({ productsPage }) => {
        await productsPage.searchBox.fill("Top");
        await productsPage.searchBtn.click();
        await expect(productsPage.searchedHeading).toBeVisible();
        await expect(productsPage.productTitles).toHaveCount(14);
        await expect(productsPage.productTitles.filter({ hasText: 'Fancy Green Top' })).toBeVisible();

    });
})