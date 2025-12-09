# IMDb Playwright Tests

Lightweight Playwright + TypeScript test suite for imdb.com with automated CI/CD pipeline.

## Prerequisites
- Node.js (18+ recommended)
- npm

## Install
```sh
npm install
```

## Run tests
Run the Chromium project configured in [playwright.config.ts](playwright.config.ts):
```sh
npm run playwright
# or
npx playwright test --project=chromium
```

Run a single test file:
```sh
npx playwright test projects/imdb/tests/header/userProfile.spec.ts --project=chromium
```

Generate and view Allure report:
```sh
npm run report
```

## Configuration: env.ts
Centralized environment configuration at `projects/imdb/helpers/env.ts`:

- **ENV.BASE_URL** — default `https://www.imdb.com`, override with `BASE_URL` env var
- **ENV.LOGIN_STATE_PATH** — default `LoginAuth.json`, override with `LOGIN_STATE_PATH`
- **ENV.DEFAULT_TIMEOUT** — default `30000` ms, override with `DEFAULT_TIMEOUT`
- **ENV.IMDB_USER / ENV.IMDB_PASS** — credentials (empty by default, set in CI or `.env`)

Helper function:
- `requireEnv(key)` — throws if a required value is missing

Example usage:
```ts
import { ENV, requireEnv } from './projects/imdb/helpers/env';
const baseUrl = ENV.BASE_URL;
const user = requireEnv('IMDB_USER'); // throws if not set
```

## Test auth / storage state
- The test projects use a saved storage state at `LoginAuth.json` referenced in [playwright.config.ts](playwright.config.ts).
- To regenerate / update the stored auth state run the global setup script (uncomment `globalSetup` in [playwright.config.ts](playwright.config.ts)) or use:
  - [projects/imdb/global/globalSetup.ts](projects/imdb/global/globalSetup.ts) which uses [`LoginPage.logInUser`](projects/imdb/page-obj/loginPage.ts)

## Project layout
- **Tests**: [projects/imdb/tests](projects/imdb/tests)
  - Account menu: [accountMenu/accountMenu.spec.ts](projects/imdb/tests/accountMenu/accountMenu.spec.ts)
  - Header: [header/header.spec.ts](projects/imdb/tests/header/header.spec.ts)
  - User profile: [userProfile/userProfile.spec.ts](projects/imdb/tests/userProfile/userProfile.spec.ts)
  - Watchlist: [watchlist/watchlist.spec.ts](projects/imdb/tests/watchlist/watchlist.spec.ts)

- **Page objects**: [projects/imdb/page-obj](projects/imdb/page-obj)
  - Base class: [`base.ts`](projects/imdb/page-obj/base.ts)
  - Login: [`loginPage.ts`](projects/imdb/page-obj/loginPage.ts)
  - Header: [`header/header.ts`](projects/imdb/page-obj/header/header.ts), [`header/accountMenu.ts`](projects/imdb/page-obj/header/accountMenu.ts)
  - Profile: [`profile/profilePage.ts`](projects/imdb/page-obj/profile/profilePage.ts), [`profile/editProfilePage.ts`](projects/imdb/page-obj/profile/editProfilePage.ts)
  - Watchlist: [`watchlist/watchlistPage.ts`](projects/imdb/page-obj/watchlist/watchlistPage.ts)

- **Test data**: [projects/imdb/test-data](projects/imdb/test-data)

## CI/CD
GitHub Actions workflow configured in [.github/workflows/ci.yml](.github/workflows/ci.yml):
- Runs on push to `main` and `master` branches
- Runs on pull requests
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads Allure results as artifact (30-day retention)

## Reports
Tests generate Allure reports with:
- Test results and execution time
- Screenshots on failure
- Video recordings on failure
- Trace files on first retry

## TypeScript
Project config: [tsconfig.json](tsconfig.json)

## Scripts
Available commands in [package.json](package.json):
- `npm run playwright` — run all tests
- `npm run report` — generate and open Allure report
- `npm run test` — clean, run tests, and generate report
- `npm run clean` — remove allure-results and allure-report directories
- `npm run lint` — run ESLint
- `npm run pretty` — format with Prettier

## Troubleshooting
- **Authentication fails**: Update `LoginAuth.json` by running the global setup flow in [projects/imdb/global/globalSetup.ts](projects/imdb/global/globalSetup.ts)
- **Tests hang**: Remove `page.pause()` calls in test files
- **Selectors fail**: Check if IMDb UI changed; update selectors in page objects accordingly
- **Debug tests**: Use Playwright Inspector: add `await page.pause()` temporarily in test or page object

## Contributing
- Keep page objects in [projects/imdb/page-obj](projects/imdb/page-obj)
- Add tests to [projects/imdb/tests](projects/imdb/tests)
- Add test data (images, etc.) to [projects/imdb/test-data](projects/imdb/test-data)
- Use relative paths for test data files (e.g., `./picture.jpg` from project root)

