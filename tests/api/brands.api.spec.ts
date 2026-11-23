import { test, expect } from '@fixtures/base';

test.describe('Brands API', { tag: '@regression' }, () => {
    test('GET all brands list (API)', async ({ request }) => {
        const response = await request.get('/api/brandsList');
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(200);
        expect(Array.isArray(body.brands)).toBe(true);
        expect(body.brands.length).toBeGreaterThan(0);
        const firstBrand = await body.brands[0];
        console.log(firstBrand);
        expect(firstBrand).toHaveProperty('id');
        expect(firstBrand).toHaveProperty('brand');
    });

    test('PUT to the brands list API is not supported (negative test)', async ({ request }) => {
        const response = await request.put('/api/brandsList');
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

});