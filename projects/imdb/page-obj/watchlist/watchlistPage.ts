import Base from '../base';
import { Page } from '@playwright/test';

export default class WatchlistPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  get editWatchlistButton() {
    return this.page.locator('[data-testid="hero-list-subnav-edit-button"]');
  }

  get searchTitleInputField() {
    return this.page.locator('[data-testid="entity-autocomplete-input"]');
  }

  get watchlistFirstItem() {
    return this.page.locator('li[class="ipc-metadata-list-summary-item"]').first();
  }

  get watchlistItemCheckbox() {
    return this.page.locator('[data-testid="eli-check-box"]').first();
  }

  get deleteItemButton() {
    return this.page.locator('[data-testid="list-edit-delete-items"]');
  }

  get confirmDeleteButton() {
    return this.page.locator('[data-testid="dlp-delete-btn"]');
  }

  async addMovieToWatchlist() {
    await this.editWatchlistButton.click();
    await this.page.waitForTimeout(2000);
    await this.searchTitleInputField.click();
    await this.searchTitleInputField.fill('Blade Runner 2049');
    await this.page.getByLabel('Blade Runner 2049 (2017)', { exact: true }).click();
  }

  async removeMovieFromWatchlist() {
    await this.editWatchlistButton.click();
    await this.page.waitForTimeout(2000);
    await this.watchlistItemCheckbox.click();
    await this.deleteItemButton.click();
    await this.confirmDeleteButton.click();
  }
}
