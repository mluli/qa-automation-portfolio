import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}