import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly price: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;
    readonly reviewHeading: Locator;
    readonly reviewEmail: Locator;
    readonly reviewName: Locator;
    readonly reviewText: Locator;
    readonly submitReviewButton: Locator;
    readonly reviewSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('.product-information h2');
        this.price = page.locator('.product-information span span');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.locator('button.cart');
        this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.reviewHeading = page.getByText('Write Your Review');
        this.reviewName = page.locator('#name');
        this.reviewEmail = page.locator('#email');
        this.reviewText = page.locator('#review');
        this.submitReviewButton = page.locator('#button-review');
        this.reviewSuccessMessage = page.getByText('Thank you for your review.');
    }

    async submitReview(name: string, email: string, text: string) {
        await this.reviewName.fill(name);
        await this.reviewEmail.fill(email);
        await this.reviewText.fill(text);
        await this.submitReviewButton.click();
    }

}
