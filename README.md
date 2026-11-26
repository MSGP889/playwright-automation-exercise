# Playwright Automation Exercise

UI and API test automation framework for automationexercise.com, built with Playwright and TypeScript.

![Playwright Tests](https://github.com/MSGP889/playwright-automation-exercise/actions/workflows/playwright.yml/badge.svg)

## Tech stack

- Playwright (UI and API testing)
- TypeScript
- GitHub Actions (CI/CD)
- Zod (API schema validation)
- axe-core (accessibility checks)
- dotenv (environment config)

## What is covered

- **UI:** home, products, auth (signup and login), cart, checkout
- **API:** products, brands, user account (create, update, delete)
- **Accessibility:** WCAG checks with axe-core
- **Visual:** screenshot comparison
- **Combined:** UI action verified through the API

## Framework features

- Page Object Model for all pages
- Custom fixtures (page objects, ad blocking, API-created test user with automatic cleanup)
- Data-driven tests
- Login once in a setup project and reuse the session with `storageState`
- API test data creation and cleanup
- Retry logic for slow API responses
- Schema validation of API responses
- Tags (`@smoke`, `@regression`) to select which tests run
- Multi-browser: Chromium, Firefox, WebKit

## Playwright topics covered

- Locators and web-first assertions (auto-waiting, no hard waits)
- `test.step` for readable reports
- Soft assertions (`expect.soft`)
- Dropdowns, file upload, dialogs and file downloads
- Multiple tabs (`context.newPage`)
- iFrames (`frameLocator`)
- Keyboard-only navigation (`Tab`, `Enter`, `toBeFocused`)
- Annotations: `skip`, `fixme`, `fail`, `slow` and custom annotations
- Hooks: `beforeEach`, `beforeAll`, `afterAll`
- Custom fixtures with setup and teardown
- Data-driven tests (loops over test data)
- Authentication with `storageState` and project dependencies
- Visual testing (`toHaveScreenshot`)
- Accessibility testing (axe-core)
- API testing: GET, POST, PUT, DELETE, chaining, `toMatchObject`
- API schema validation (Zod)
- Tags and `--grep` filtering
- Parallel workers, retries and `--repeat-each` for flakiness checks

## Project structure

```
.github/workflows/   CI pipeline
fixtures/            custom test fixtures
pages/               page objects
tests/ui/            UI tests
tests/api/           API tests
tests/setup/         login setup and cleanup
test-data/           test data
utils/               helpers and API schemas
```

## How to run

```bash
npm install
npx playwright install
cp .env.example .env
```

Run all tests:

```bash
npx playwright test
```

Run only smoke tests, or one browser:

```bash
npx playwright test --grep @smoke
npx playwright test --project=chromium
```

Open the last report:

```bash
npx playwright show-report
```

## CI/CD

GitHub Actions runs the tests automatically:

- **Smoke tests** run on every push and pull request to `main`, on Chromium, WebKit and the logged-in project
- **Regression tests** run every night and can also be started manually
- The HTML report of every run is saved as a build artifact