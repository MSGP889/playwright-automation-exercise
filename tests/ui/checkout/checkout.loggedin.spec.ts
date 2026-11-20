import { test, expect } from '@fixtures/base';
import { UserData } from '@utils/userData';
import { dummyCard } from '../../../test-data/payment';
import fs from 'fs';

test('logged-in user can place an order', async ({ productsPage, cartPage, checkoutPage, paymentPage, page }) => {
    const user: UserData = JSON.parse(fs.readFileSync('playwright/.auth/user-data.json', 'utf-8'));

    await productsPage.navigateToProductsPage();
    const productName = (await productsPage.productName.first().textContent())?.trim() ?? '';

    await productsPage.productCards.first().hover();
    await productsPage.addToCartButton.first().click();
    await productsPage.viewCartLink.click();
    await expect(page).toHaveURL(/view_cart/);
    await cartPage.checkoutButton.click();

    await expect(page).toHaveURL(/checkout/);
    await expect(checkoutPage.deliveryAddress).toContainText(`${user.firstName} ${user.lastName}`);
    await expect(checkoutPage.deliveryAddress).toContainText(user.address);
    await expect(checkoutPage.deliveryAddress).toContainText(user.city);
    await expect(checkoutPage.deliveryAddress).toContainText(user.country);
    await expect(checkoutPage.deliveryAddress).toContainText(user.mobile);
    await expect(checkoutPage.orderReview).toContainText(productName);

    await checkoutPage.commentBox.fill('Please deliver in the morning');
    await checkoutPage.placeOrderButton.click();

    await expect(page).toHaveURL(/payment/);
    await paymentPage.fillPaymentDetails(dummyCard);
    await paymentPage.payButton.click();

    await expect(paymentPage.orderPlacedHeading).toHaveText('Order Placed!');
    await paymentPage.continueButton.click();
});