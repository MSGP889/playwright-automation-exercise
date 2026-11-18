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

    const categoryCases = [
        { parent: 'Women', sub: 'Dress', url: /category_products\/1/, expectedCount: 3 },
        { parent: 'Women', sub: 'Tops', url: /category_products\/2/, expectedCount: 6 },
        { parent: 'Women', sub: 'Saree', url: /category_products\/7/, expectedCount: 3 },
        { parent: 'Men', sub: 'Tshirts', url: /category_products\/3/, expectedCount: 6 },
        { parent: 'Men', sub: 'Jeans', url: /category_products\/6/, expectedCount: 3 },
        { parent: 'Kids', sub: 'Dress', url: /category_products\/4/, expectedCount: 6 },
        { parent: 'Kids', sub: 'Tops & Shirts', url: /category_products\/5/, expectedCount: 7 },
    ];
    for (const { parent, sub, url, expectedCount } of categoryCases) {
        test(`filtering by ${parent} > ${sub} shows only ${parent} ${sub} products`, async ({ productsPage, page }) => {
            await productsPage.filterByCategory(parent, sub);
            await expect(page).toHaveURL(url);
            await expect(productsPage.categoryPageHeading).toHaveText(`${parent} - ${sub} Products`);
            await expect(productsPage.productCards).toHaveCount(expectedCount);
        });
    }

    test('filtering by Brands > Polo shows only Polo products', async ({ productsPage, page }) => {
        await productsPage.filterByBrand('Polo');
        await expect(page).toHaveURL(/brand_products\/Polo/);
        await expect(productsPage.categoryPageHeading).toHaveText('Brand - Polo Products');
        await expect(productsPage.productCards).toHaveCount(6);
    });

    test('filtering by Brands > H&M shows only H&M products', async ({ productsPage, page }) => {
        await productsPage.filterByBrand('H&M');
        await expect(page).toHaveURL(/brand_products\/H&M/);
        await expect(productsPage.categoryPageHeading).toHaveText('Brand - H&M Products');
        await expect(productsPage.productCards).toHaveCount(5);
    });
})