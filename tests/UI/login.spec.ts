import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login - SauceDemo', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login exitoso con usuario válido', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('muestra error con credenciales inválidas', async () => {
    await loginPage.login('usuario_falso', 'clave_falsa');

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

  test('muestra error si el usuario está vacío', async () => {
    await loginPage.passwordInput.fill('secret_sauce');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('usuario bloqueado no puede ingresar', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});
