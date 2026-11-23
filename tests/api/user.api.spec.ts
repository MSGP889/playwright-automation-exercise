import { test, expect } from '@fixtures/base';
import { buildUser } from '@utils/userData';
import { createUserViaApi, deleteUserViaApi } from '@utils/apiHelpers';

test.describe('User API', { tag: '@regression' }, () => {
    
    test('POST verifyLogin with valid details returns user exists (API)', async ({ request }) => {
        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            const response = await request.post('/api/verifyLogin', {
                form: { email: user.email, password: user.password },
            });
            expect(response.status()).toBe(200);

            const body = JSON.parse(await response.text());
            expect(body.responseCode).toBe(200);
            expect(body.message).toBe('User exists!');
        } finally {
            await deleteUserViaApi(request, user);
        }
    });

    test('POST verifyLogin with a wrong password returns user not found (API)', async ({ request }) => {
        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            const response = await request.post('/api/verifyLogin', {
                form: { email: user.email, password: 'wrong-password' },
            });
            expect(response.status()).toBe(200);

            const body = JSON.parse(await response.text());
            expect(body.responseCode).toBe(404);
            expect(body.message).toBe('User not found!');
        } finally {
            await deleteUserViaApi(request, user);
        }
    });

    test('Get user details by email (API)', async ({ request }) => {

        const user = buildUser();
        await createUserViaApi(request, user);

        try {
            const response = await request.get('/api/getUserDetailByEmail', { params: { email: user.email } });
            expect(response.status()).toBe(200);
            const body = JSON.parse(await response.text());
            expect(body.responseCode).toBe(200);
            expect(body.user.email).toBe(user.email);
            expect(body.user.name).toBe(user.name);
        }

        finally {
            await deleteUserViaApi(request, user);
        }
    });

    test('Verify login without a password is rejected (API, negative test)', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: { email: 'qa.user@example.com' },
        });
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });

    test('DELETE to the verifyLogin API is not supported (negative test)', async ({ request }) => {
        const response = await request.delete('/api/verifyLogin');
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test("Delete a non-existent account (API, negative test)", async ({ request }) => {
        const user = buildUser();
        const response = await request.delete('/api/deleteAccount', {form: { email: user.email, password: user.password }});
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('Account not found!');
    });

});