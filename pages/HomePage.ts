import { Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly logo: Locator;
    readonly headerLinks:Locator;
    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'Website for automation practice' });
        this.headerLinks=page.locator(".nav.navbar-nav>li");
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

   navLink(name: string): Locator {
  return this.headerLinks.getByRole('link', { name });
}
}

