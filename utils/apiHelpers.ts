import { APIRequestContext, expect } from '@playwright/test';
import { UserData } from '@utils/userData';

export async function createUserViaApi(request: APIRequestContext, user: UserData) {
    const response = await request.post('/api/createAccount', {
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
    });

    const text = await response.text();
    
    let body;
    try {
        body = JSON.parse(text);
    } catch {
        throw new Error(`createAccount returned non-JSON (HTTP ${response.status()}): ${text.slice(0, 300)}`);
    }
    expect(body.responseCode, `createAccount failed: ${body.message}`).toBe(201);
}

export async function deleteUserViaApi(request: APIRequestContext, user: UserData) {
    const response = await request.delete('/api/deleteAccount', {
        form: { email: user.email, password: user.password },
    });
    const body = await response.json();
    expect(body.responseCode, `deleteAccount failed: ${body.message}`).toBe(200);
}