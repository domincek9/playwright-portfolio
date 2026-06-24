import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login tests', () => {
test('valid login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

});

test('invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'standard_user',
        'wrong_password'
    );

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match'
  );
});

test('missing username', async ({ page }) => {
  const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        '',
        'secret_sauce'
    );

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username is required'
  );
});

test('missing password', async ({ page }) => {
   const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'standard_user',
        ''
    );

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Password is required'
  );
});
});
