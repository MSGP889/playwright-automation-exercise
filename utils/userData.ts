//Type alias for user data
export type UserData = {
    name: string; email: string; password: string;
    day: string; month: string; year: string;
    firstName: string; lastName: string; company: string;
    address: string; country: string; state: string; city: string;
    zipcode: string; mobile: string;
};

//function to build a user with random data
export function buildUser(): UserData {
    const id = Date.now();
    return {
        name: `QA User ${id}`, email: `qa.user+${id}@example.com`, password: 'Test@12345',
        day: '10', month: 'May', year: '1995',
        firstName: 'QA', lastName: 'User', company: 'Test Co',
        address: '1 Test Street', country: 'India', state: 'Telangana', city: 'Hyderabad',
        zipcode: '500001', mobile: '9876543210',
    };
}