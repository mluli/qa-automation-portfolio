import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Carrito - SauceDemo', () => {
  let inventory: InventoryPage;
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    await loginPage.loginAsStandardUser();
  });

  test('agregar un producto actualiza el contador del carrito', async () => {
    await inventory.addToCart('sauce-labs-backpack');

    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('el producto agregado aparece en el carrito', async ({ page }) => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cart.itemNames).toHaveText('Sauce Labs Backpack');
  });

  test('quitar un producto vacía el carrito', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.removeFromCart('sauce-labs-backpack');

    await expect(inventory.cartBadge).toHaveCount(0);
  });
});