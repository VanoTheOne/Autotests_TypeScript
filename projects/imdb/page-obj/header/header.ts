import Base from '../base';
import { Page, Browser } from '@playwright/test';

export default class Header extends Base {
  constructor(page: Page) {
    super(page);
  }

  get signInButton() {
    return this.page.locator('#imdbHeader div.nav__userMenu a.imdb-header__signin-text');
  }

  get watchlistButton() {
    return this.page.locator('#imdbHeader div.imdb-header__watchlist-button a');
  }

  get searchInput() {
    return this.page.locator('#suggestion-search-container input[type="text"]');
  }

  get searchButton() {
    return this.page.locator('#imdbHeader #suggestion-search-button');
  }

  get searchResult() {
    return this.page.locator('[data-testid="find-results-section-title"] li').first();
  }

  get searchFilterContainer() {
    return this.page.locator('#suggestion-search-container label[data-testid="category-selector-button"]');
  }

  get searchFilterTitles() {
    return this.page.locator('#nav-search-form ul li.searchCatSelector__item-tt');
  }

  get menuButton() {
    return this.page.locator('#imdbHeader #imdbHeader-navDrawerOpen');
  }

  get closeMenuButton() {
    return this.page.locator('div[data-testid="panel-header"] label[for="imdbHeader-navDrawer"]');
  }

  async openWatchlist() {
    await this.watchlistButton.click();
  }

  async searchMovie(movieTitle: string) {
    await this.searchInput.click();
    await this.searchInput.fill(movieTitle);
    await this.searchButton.click();
  }

  async openSearchFilter() {
    await this.searchFilterContainer.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }
}
