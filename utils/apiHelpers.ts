import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { UserData } from '@utils/userData';

// Retry when the site answers 503 (heavy load); wait a little longer each time
async function sendWithRetry(send: () => Promise<APIResponse>, attempts = 3): Promise<APIResponse> {
    for (let i = 1; ; i++) {
        const response = await send();
        if (response.status() !== 503 || i === attempts) return response;
        await new Promise((resolve) => setTimeout(resolve, 3000 * i));
    }
}

// Parse the JSON body, or fail with a readable message (status + start of the page)
async function readBody(response: APIResponse, label: string) {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`${label} returned non-JSON (HTTP ${response.status()}): ${text.slice(0, 200)}`);
    }
}

export async function createUserViaApi(request: APIRequestContext, user: UserData) {
    const response = await sendWithRetry(() =>
        request.post('/api/createAccount', {
            form: {
                name: user.name,
                email: user.email,
                password: user.password,
                title: 'Mr',
                birth_date: user.day,
                birth_month: user.month,
                birth_year: user.year,
                firstname: user.firstName,
                lastname: user.lastName,
                company: user.company,
                address1: user.address,
                address2: '',
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobile,
            },
        })
    );
    const body = await readBody(response, 'createAccount');
    expect(body.responseCode, `createAccount failed: ${body.message}`).toBe(201);
}

export async function deleteUserViaApi(request: APIRequestContext, user: UserData) {
    const response = await sendWithRetry(() =>
        request.delete('/api/deleteAccount', {
            form: { email: user.email, password: user.password },
        })
    );
    const body = await readBody(response, 'deleteAccount');
    expect(body.responseCode, `deleteAccount failed: ${body.message}`).toBe(200);
}