import { test, expect } from '@fixtures/base';

test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateToProductsPage();
});

test('user can add a product to the cart', async ({ productsPage, cartPage, page }) => {
    const productName = (await productsPage.productName.first().textContent())?.trim() ?? '';
    const productPrice = (await productsPage.productPrice.first().textContent())?.trim() ?? '';

    await productsPage.productCards.first().hover();
    await productsPage.addToCartButton.first().click();
    await productsPage.viewCartLink.click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(cartPage.rows).toHaveCount(1);
    await expect(cartPage.productName).toHaveText(productName);
    await expect(cartPage.productPrice).toHaveText(productPrice);
    await expect(cartPage.quantity).toHaveText('1');
    await expect(cartPage.total).toHaveText(productPrice);
});