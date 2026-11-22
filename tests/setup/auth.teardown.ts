import { test as teardown } from '@fixtures/base';
import { deleteUserViaApi } from '@utils/apiHelpers';
import { UserData } from '@utils/userData';
import fs from 'fs';

teardown('delete the setup user', async ({ request }) => {
    const user: UserData = JSON.parse(fs.readFileSync('playwright/.auth/user-data.json', 'utf-8'));
    await deleteUserViaApi(request, user);
});