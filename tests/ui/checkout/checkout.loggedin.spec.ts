import { test, expect } from '@fixtures/base';
import { UserData } from '@utils/userData';
import { dummyCard } from '../../../test-data/payment';
import fs from 'fs';

test.describe('Checkout (logged in)', { tag: '@regression' }, () => {
    let productName: string;

    test.beforeEach(async ({ productsPage, cartPage, page }) => {
        await productsPage.navigateToProductsPage();
        productName = (await productsPage.productName.first().textContent())?.trim() ?? '';

        await productsPage.productCards.first().hover();
        await productsPage.addToCartButton.first().click();
        await productsPage.viewCartLink.click();
        await expect(page).toHaveURL(/view_cart/);
        await cartPage.checkoutButton.click();
        await expect(page).toHaveURL(/checkout/, { timeout: 15_000 });
    });

    test('logged-in user can place an order', { tag: '@smoke' }, async ({ checkoutPage, paymentPage, page }) => {
        
        const user: UserData = JSON.parse(fs.readFileSync('playwright/.auth/user-data.json', 'utf-8'));

        await test.step('Verify delivery address and order review', async () => {
            await expect.soft(checkoutPage.deliveryAddress).toContainText(`${user.firstName} ${user.lastName}`);
            await expect.soft(checkoutPage.deliveryAddress).toContainText(user.address);
            await expect.soft(checkoutPage.deliveryAddress).toContainText(user.city);
            await expect.soft(checkoutPage.deliveryAddress).toContainText(user.country);
            await expect.soft(checkoutPage.deliveryAddress).toContainText(user.mobile);
            await expect(checkoutPage.orderReview).toContainText(productName);
        });

        await test.step('Place the order with a comment', async () => {
            await checkoutPage.commentBox.fill('Please deliver in the morning');
            await checkoutPage.placeOrderButton.click();
        });

        await test.step('Pay with card', async () => {
            await expect(page).toHaveURL(/payment/);
            await paymentPage.fillPaymentDetails(dummyCard);
            await paymentPage.payButton.click();
        });

        await test.step('Verify the order is placed', async () => {
            await expect(paymentPage.orderPlacedHeading).toHaveText('Order Placed!');
            await paymentPage.continueButton.click();
        });

    });

    test('user can download the invoice after placing an order', async ({ checkoutPage, paymentPage, page }) => {
        await checkoutPage.placeOrderButton.click();
        await expect(page).toHaveURL(/payment/);
        await paymentPage.fillPaymentDetails(dummyCard);
        await paymentPage.payButton.click();
        await expect(paymentPage.orderPlacedHeading).toHaveText('Order Placed!');

        // start waiting BEFORE the click, otherwise the event can be missed
        const downloadPromise = page.waitForEvent('download');
        await paymentPage.downloadInvoiceLink.click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toBe('invoice.txt');
        console.log(download.suggestedFilename());
    });
});