import { test, expect } from '@fixtures/base';

test.describe('Products API', () => {
    test('GET /api/productsList returns the products list', async ({ request }) => {
        const response = await request.get('/api/productsList');
        expect(response.status()).toBe(200);

        // the site returns the real result inside the JSON body
        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);

        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);

        const first = body.products[0];
        expect(first).toHaveProperty('id');
        expect(first).toHaveProperty('name');
        expect(first).toHaveProperty('price');
        expect(first).toHaveProperty('category');
    });

    test('POST /api/productsList is not supported', async ({ request }) => {
        const response = await request.post('/api/productsList');
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

});