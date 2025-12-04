# IMDb Playwright Tests

Lightweight Playwright + TypeScript test suite for imdb.com.

## Prerequisites
- Node.js (18+ recommended)
- npm

## Install
```
npm install
```

## Run tests
Run the Chromium project configured in [playwright.config.ts](playwright.config.ts):
```
npm run playwright
# or
npx playwright test --project=chromium
```

Run a single test file:
```
npx playwright test projects/imdb/tests/header/userProfile.spec.ts --project=chromium
```

Generate report (Allure configured in package.json):
```
npm run report
```

## Test auth / storage state
- The test projects use a saved storage state at `LoginAuth.json` referenced in [playwright.config.ts](playwright.config.ts).
- To regenerate / update the stored auth state run the global setup script (uncomment `globalSetup` in [playwright.config.ts](playwright.config.ts)) or run the helper:
  - See the automation in [projects/imdb/global/globalSetup.ts](projects/imdb/global/globalSetup.ts) which uses [`LoginPage.logInUser`](projects/imdb/page-obj/loginPage.ts).

## Project layout
- Tests: [projects/imdb/tests](projects/imdb/tests)
  - Active example: [projects/imdb/tests/header/userProfile.spec.ts](projects/imdb/tests/header/userProfile.spec.ts)
- Page objects: [projects/imdb/page-obj](projects/imdb/page-obj)
  - Base class: [`Base`](projects/imdb/page-obj/base.ts)
  - Login helper: [`LoginPage`](projects/imdb/page-obj/loginPage.ts) (`logInUser` method)
  - Header: [`Header`](projects/imdb/page-obj/header/header.ts)
  - Account menu: [`AccountMenu`](projects/imdb/page-obj/header/accountMenu.ts)
  - Profile pages: [`ProfilePage`](projects/imdb/page-obj/profile/profilePage.ts), [`EditProfilePage`](projects/imdb/page-obj/profile/editProfilePage.ts)

## TypeScript
Project config: [tsconfig.json](tsconfig.json)

## Scripts
See useful commands in [package.json](package.json):
- `npm run playwright` — run tests
- `npm run report` — generate/open Allure report

## Troubleshooting
- If tests fail due to authentication, update `LoginAuth.json` by running the global setup flow in [projects/imdb/global/globalSetup.ts](projects/imdb/global/globalSetup.ts).
- Use Playwright inspector: add `await page.pause()` in test or page object to debug.

## Contributing
- Keep page objects in [projects/imdb/page-obj](projects/imdb/page-obj).
- Add tests to [projects/imdb/tests](projects/imdb/tests).
