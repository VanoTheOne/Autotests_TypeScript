import Base from '../base';
import { Page } from '@playwright/test';

export default class AccountMenu extends Base {
  constructor(page: Page) {
    super(page);
  }

  get accountMenuButton() {
    return this.page.locator('#imdbHeader label.navbar__user-menu-toggle__button');
  }

  get accountMenuYourProfileButton() {
    return this.page.locator('#navUserMenu-contents [href="/profile/?ref_=hm_nv_profile"]');
  }

  get accountMenuYourWatchlistButton() {
    return this.page.locator('#navUserMenu-contents [href="/list/watchlist/?ref_=hm_nv_wls"]');
  }

  get accountMenuYourRatingsButton() {
    return this.page.locator('#navUserMenu-contents [href="/list/ratings/?ref_=hm_nv_rat"]');
  }

  get accountMenuYourListsButton() {
    return this.page.locator('#navUserMenu-contents [href="/profile/lists/?ref_=hm_nv_lst"]');
  }

  get accountMenuYourInterestsButton() {
    return this.page.locator('#navUserMenu-contents [href="/list/interests/?ref_=hm_nv_in"]');
  }

  get accountMenuYourWatchHistoryButton() {
    return this.page.locator('#navUserMenu-contents [href="/list/watchhistory/?ref_=hm_nv_wtchd"]');
  }

  get accountMenuAccountSettingsButton() {
    return this.page.locator('#navUserMenu-contents [href="/registration/accountsettings/?ref_=hm_nv_pers"]');
  }

  get accountMenuSignOutButton() {
    return this.page.locator('#navUserMenu-contents [href="/registration/logout/?u=%2F&ref_=hm_nv_lgout"]');
  }

  async openUserProfile() {
    await this.accountMenuButton.click();
    await this.accountMenuYourProfileButton.click();
  }

  async openUserWatchlist() {
    await this.accountMenuButton.click();
    await this.accountMenuYourWatchlistButton.click();
  }

  async openUserRatings() {
    await this.accountMenuButton.click();
    await this.accountMenuYourRatingsButton.click();
  }

  async openUserLists() {
    await this.accountMenuButton.click();
    await this.accountMenuYourListsButton.click();
  }

  async openUserInterests() {
    await this.accountMenuButton.click();
    await this.accountMenuYourInterestsButton.click();
  }

  async openUserWatchHistory() {
    await this.accountMenuButton.click();
    await this.accountMenuYourWatchHistoryButton.click();
  }

  async openUserAccountSettings() {
    await this.accountMenuButton.click();
    await this.accountMenuAccountSettingsButton.click();
  }

  async signOut() {
    await this.accountMenuButton.click();
    await this.accountMenuSignOutButton.click();
  }
}
