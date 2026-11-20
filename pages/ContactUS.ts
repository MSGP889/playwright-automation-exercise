import { Page, Locator } from '@playwright/test';

export class ContactUS {
    readonly page: Page;
    readonly getInTouchHeading: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly subject: Locator;
    readonly message: Locator;
    readonly fileInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch', level: 2 });
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.fileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.locator('[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert-success');
        this.homeButton = page.locator('#form-section').getByRole('link', { name: 'Home' });
    }

    async navigateToContactPage() {
        await this.page.goto('/contact_us');
    }

    async fillContactForm(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.message.fill(message);
        await this.fileInput.setInputFiles(filePath);
    }
}