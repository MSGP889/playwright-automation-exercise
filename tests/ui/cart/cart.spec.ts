import { test, expect } from '@fixtures/base';

test.describe('Cart', () => {

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
        await expect(cartPage.emptyCartMessage).toBeVisible();
    });

    test('product quantity set on the detail page shows in the cart with the right total', async ({ productsPage, productDetailsPage, cartPage, page }) => {
        await productsPage.openProductDetails(0);

        const name = (await productDetailsPage.productName.textContent())?.trim() ?? '';
        const price = (await productDetailsPage.price.textContent())?.trim() ?? '';
        const unitPrice = parseInt(price.replace(/\D/g, ''), 10);

        await productDetailsPage.quantityInput.fill('4');
        await productDetailsPage.addToCartButton.click();
        await productDetailsPage.viewCartLink.click();

        await expect(page).toHaveURL(/view_cart/);
        await expect(cartPage.rows).toHaveCount(1);
        await expect(cartPage.nameOf(0)).toHaveText(name);
        await expect(cartPage.quantityOf(0)).toHaveText('4');
        await expect(cartPage.totalOf(0)).toHaveText(`Rs. ${unitPrice * 4}`);
    });

    test.only('user directs to login when trying to checkout without being logged in', async ({ productsPage, page, cartPage, loginPage }) => {
        await productsPage.productCards.first().hover();
        await productsPage.addToCartButton.first().click();
        await productsPage.viewCartLink.click();
        await expect(page).toHaveURL(/view_cart/);
        await cartPage.checkoutButton.click();
        await expect(cartPage.checkoutModalMessage).toBeVisible();
        await cartPage.registerLoginLink.click();
        await expect(page).toHaveURL(/login/);
        await expect(loginPage.signupHeading).toBeVisible();
    });
});