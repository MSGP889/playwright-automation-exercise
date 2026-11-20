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
    readonly contactUsBtn: Locator;
    readonly recommendedHeading: Locator;
    readonly recommendedAddToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'Website for automation practice' });
        this.headerLinks = page.locator(".nav.navbar-nav>li");
        this.signupLoginLink = this.headerLinks.getByRole('link', { name: 'Signup / Login' });
        this.loggedInAs = page.getByText('Logged in as');
        this.deleteAccountLink = this.headerLinks.getByRole('link', { name: 'Delete Account' });
        this.logoutLink = this.headerLinks.getByRole('link', { name: 'Logout' });
        this.footer = new FooterComponent(page);
        this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
        this.recommendedHeading = page.getByRole('heading', { name: 'recommended items', level: 2 });
        this.recommendedAddToCartButton = this.page.locator('#recommended-item-carousel .item.active .add-to-cart').first();
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    navLink(name: string): Locator {
        return this.headerLinks.getByRole('link', { name });
    }
}

