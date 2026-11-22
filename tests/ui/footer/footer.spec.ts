import { test, expect } from '@fixtures/base';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/view_cart' },
    { name: 'Contact us', path: '/contact_us' },
];

for (const { name, path } of pages) {
    test(`footer subscription works on the ${name} page`, async ({ page, footer }) => {
        await page.goto(path);
        await expect(footer.subscriptionHeading).toBeVisible();

        await footer.subscribe('test@gmail.com');

        await expect(footer.successMessage).toHaveText('You have been successfully subscribed!');
    });
}