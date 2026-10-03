import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  // slug: nombre del producto en minúsculas y con guiones, ej: 'sauce-labs-backpack'
  async addToCart(slug: string) {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async removeFromCart(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}