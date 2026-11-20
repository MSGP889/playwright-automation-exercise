import { Page, Locator } from '@playwright/test';
import { FooterComponent } from './components/FooterComponent';

export class HomePage {

    readonly page: Page;
    readonly logo: Locator;
    readonly headerLinks: Locator;
    readonly signupLoginLink: Locator;
    readonly loggedInAs: Locator;
    readonly deleteAccountLink: Locator;
    readonly logoutLink: Locator;
    readonly footer: FooterComponent;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'Website for automation practice' });
        this.headerLinks = page.locator(".nav.navbar-nav>li");
        this.signupLoginLink = this.headerLinks.getByRole('link', { name: 'Signup / Login' });
        this.loggedInAs = page.getByText('Logged in as');
        this.deleteAccountLink = this.headerLinks.getByRole('link', { name: 'Delete Account' });
        this.logoutLink = this.headerLinks.getByRole('link', { name: 'Logout' });
        this.footer = new FooterComponent(page);
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    navLink(name: string): Locator {
        return this.headerLinks.getByRole('link', { name });
    }
}

