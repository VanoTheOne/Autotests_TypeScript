import { Page, Browser } from '@playwright/test';

export default class Base {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }
}
