import { test, expect } from '@playwright/test';
import Base from '../../page-obj/base';
import Header from '../../page-obj/header/header';
import WatchlistPage from '../../page-obj/watchlist/watchlistPage';
import AccountMenu from '../../page-obj/header/accountMenu';

test.describe(`Watchlist page tests`, function () {
  let base: Base;
  let header: Header;
  let watchlistPage: WatchlistPage;
  let accountMenu: AccountMenu;

  test.beforeEach(async ({ page }) => {
    base = new Base(page);
    header = new Header(page);
    watchlistPage = new WatchlistPage(page);
    accountMenu = new AccountMenu(page);

    await base.navigate(`https://www.imdb.com/`);
  });

  test.describe(`Watchlist page tests`, function () {
    test(`Should check if new item is added to watchlist`, async ({ page }) => {
      await header.openWatchlist();
      await watchlistPage.addMovieToWatchlist();
      await header.openWatchlist();
      await base.reloadPage();
      await expect(watchlistPage.watchlistFirstItem).toContainText('Blade Runner 2049');
    });

    test(`Should check if item is deleted from watchlist`, async ({ page }) => {
      await header.openWatchlist();
      await watchlistPage.removeMovieFromWatchlist();
      await header.openWatchlist();
      await base.reloadPage();
      await expect(watchlistPage.watchlistFirstItem).not.toBeAttached();
    });
  });
});
