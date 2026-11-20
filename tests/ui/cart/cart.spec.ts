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

test('user can add multiple products to the cart', async ({ productsPage, cartPage, page }) => {
    const productNames: string[] = [];
    const productPrices: string[] = [];

    for (let i = 0; i < 2; i++) {
        productNames.push((await productsPage.productName.nth(i).textContent())?.trim() ?? '');
        productPrices.push((await productsPage.productPrice.nth(i).textContent())?.trim() ?? '');
        await productsPage.productCards.nth(i).hover();
        await productsPage.addToCartButton.nth(i).click();
        if (i === 0) {
            await productsPage.continueShoppingButton.click();
        }
    }

    await productsPage.viewCartLink.click();
    await expect(page).toHaveURL(/view_cart/);
    await expect(cartPage.rows).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
        await expect(cartPage.nameOf(i)).toHaveText(productNames[i]);
        await expect(cartPage.priceOf(i)).toHaveText(productPrices[i]);
        await expect(cartPage.quantityOf(i)).toHaveText('1');
        await expect(cartPage.totalOf(i)).toHaveText(productPrices[i]);
    }
});

test('user can remove a product from the cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.productCards.first().hover();
    await productsPage.addToCartButton.first().click();
    await productsPage.viewCartLink.click();
    await expect(page).toHaveURL(/view_cart/);
    await expect(cartPage.rows).toHaveCount(1);
    await cartPage.removeFromCartButton.click();
    await expect(cartPage.rows).toHaveCount(0);
});