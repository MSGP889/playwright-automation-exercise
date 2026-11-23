import { test, expect } from '@fixtures/base';

test.describe('Network', { tag: '@regression' }, () => {

    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductsPage();
    });

    test('Add to cart sends a successful network request', async ({ productsPage, page }) => {
        await productsPage.productCards.first().hover();
        const responsePromise = page.waitForResponse(r => r.url().includes('/add_to_cart/'));
        await productsPage.addToCartButton.first().click();
        const response = await responsePromise;
        expect(response.status()).toBe(200);
        expect(await response.text()).toContain('Added To Cart');
        await expect(productsPage.viewCartLink).toBeVisible();
    });

    test('Add to cart when the server fails :mocked response', async ({ productsPage, cartPage, page }) => {
        await page.route('**/add_to_cart/*', route => route.fulfill({ status: 500, body: 'Server error' }));
        await productsPage.productCards.first().hover();
        await productsPage.addToCartButton.first().click();
        await expect(productsPage.viewCartLink).toBeHidden();
        await cartPage.navigateToCartPage();
        await expect(cartPage.emptyCartMessage).toBeVisible();
    });

    test('Products still show when images are blocked', async ({ productsPage, page }) => {
        await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort());
        await page.reload();

        await expect(productsPage.productCards.first()).toBeVisible();
        await expect(productsPage.productName.first()).toBeVisible();
        await expect(productsPage.productPrice.first()).toBeVisible();
    });

    test('Search sends the correct request', async ({ productsPage, page }) => {
        const requestPromise = page.waitForRequest(r => r.url().includes('search=top'));
        await productsPage.searchBox.fill('top');
        await productsPage.searchBtn.click();
        const request = await requestPromise;

        expect(request.method()).toBe('GET');
        expect(request.url()).toContain('search=top');
        await expect(productsPage.productCards.first()).toBeVisible();
    });

    test('Footer subscription fails when the server returns an error', async ({ page, footer }) => {
        await page.route('**/subscribe', route =>
            route.fulfill({ status: 500, body: 'Server error' })
        );

        await footer.subscribe('test@example.com');

        await expect(footer.successMessage).toBeHidden();
    });

});