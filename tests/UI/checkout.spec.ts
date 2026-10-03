import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout - SauceDemo', () => {
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await loginPage.loginAsStandardUser();
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();
    await cart.goToCheckout();
  });

  test('compra completa de punta a punta', async ({ page }) => {
    await checkout.fillInfo('Luciana', 'Diaz', '4000');
    await checkout.continue();

    await expect(page).toHaveURL(/checkout-step-two/);
    await checkout.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  test('muestra error si falta el nombre', async () => {
    await checkout.lastNameInput.fill('Diaz');
    await checkout.postalCodeInput.fill('4000');
    await checkout.continue();

    await expect(checkout.errorMessage).toContainText('First Name is required');
  });
});