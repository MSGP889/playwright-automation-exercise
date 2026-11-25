import { test, expect } from '@fixtures/base';
import AxeBuilder from '@axe-core/playwright';

const KNOWN_ISSUES = ['button-name', 'color-contrast', 'link-name'];

test.describe('Accessibility', { tag: '@accessibility' }, () => {
    test('home page has no new WCAG A/AA violations', {
        annotation: { type: 'known issues', description: KNOWN_ISSUES.join(', ') },
    }, async ({ homePage, page }) => {
        await homePage.navigateToHomePage();

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

        const found = results.violations.map(v => v.id).sort();
        expect(found).toEqual(KNOWN_ISSUES);
    });
});