import { test, expect } from '@fixtures/base';
import { productsListSchema } from '@utils/apiSchemas';

test.describe('Products API', { tag: '@regression' }, () => {

    test('GET /api/productsList returns the products list', { tag: '@smoke' }, async ({ request }) => {
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

    test('POST search product returns matching products (API)', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
            form: { search_product: 'top' },
        });
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        //console.log(JSON.stringify(body.products[0], null, 2));
        expect(body.responseCode).toBe(200);
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
        for (const product of body.products) {
            const text = `${product.name} ${product.category.category}`;
            expect(text).toMatch(/top/i);
        }
    });

    const searchTerms = ['top', 'tshirt', 'jeans', 'dress'];

    for (const term of searchTerms) {
        test(`POST search product "${term}" returns matching products`, async ({ request }) => {
            const response = await request.post('/api/searchProduct', {
                form: { search_product: term },
            });
            expect(response.status()).toBe(200);

            const body = JSON.parse(await response.text());
            expect(body.responseCode).toBe(200);
            expect(body.products.length).toBeGreaterThan(0);

            for (const product of body.products) {
                const text = `${product.name} ${product.category.category}`;
                expect(text).toMatch(new RegExp(term, 'i'));
            }
        });
    }

    test('Search product without a search term is rejected', async ({ request }) => {
        const response = await request.post('/api/searchProduct');
        const body = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });

    test("GET /api/productsList has the expected header and responds in time", async ({ request }) => {
        const start = Date.now();
        const response = await request.get("/api/productsList");
        const duration = Date.now() - start;
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('text/html');
        expect(duration).toBeLessThan(5000);
    })

    test('GET products list matches the expected schema', { tag: '@regression' }, async ({ request }) => {
        const response = await request.get('/api/productsList');
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(() => productsListSchema.parse(body)).not.toThrow();
    });

});