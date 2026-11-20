import { test, expect } from '@fixtures/base';
import { contactData } from '../../../test-data/contact';

test.describe('Contact Us', () => {
    test('user can submit the contact form with a file attachment', async ({ contactPage, page }) => {
        await contactPage.navigateToContactPage();
        await expect(contactPage.getInTouchHeading).toBeVisible();

        await contactPage.fillContactForm(
            contactData.name,
            contactData.email,
            contactData.subject,
            contactData.message,
            contactData.filePath,
        );

        // register BEFORE the click, otherwise the dialog is auto-dismissed
        page.once('dialog', dialog => dialog.accept());
        await contactPage.submitButton.click();

        await expect(contactPage.successMessage).toBeVisible();
        await expect(contactPage.successMessage).toHaveText(
            'Success! Your details have been submitted successfully.',
        );

        await contactPage.homeButton.click();
        await expect(page).toHaveURL('/');
    });
});