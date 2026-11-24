import { test, expect } from "@fixtures/base";

test.describe('Iframes practice', async () => {

    test('User can type into the editor inside the iframe', async ({ page }) => {

        await page.goto("https://the-internet.herokuapp.com/iframe");
        const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
        await expect(editor).toHaveText('Your content goes here.');

        await editor.fill('Hello from Playwright');
        await expect(editor).toHaveText('Hello from Playwright');
    });
});