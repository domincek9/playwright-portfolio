import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout tests', () => {
    
  
  test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpackToCart();
  await inventoryPage.addBikeLightToCart();
  await inventoryPage.openCart();

  await cartPage.checkout();
  

  await expect(page).toHaveURL(/.*checkout-step-one.html/); 
});



test('successful checkout', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    // Fill in checkout information
    await checkoutPage.fillInformation('Dominika', 'Tekulova', '91304');
    await checkoutPage.continueCheckout();

    // Verify checkout overview
    await expect(page.locator('.inventory_item_name')).toHaveCount(2);
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');

    // Finish checkout
    await checkoutPage.finishCheckout();

    // Verify checkout complete
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});


test('checkout without first name', async ({ page }) => {


    const checkoutPage = new CheckoutPage(page);

    // Fill in checkout information without first name
    await checkoutPage.fillInformation('', 'Tekulova', '91304');
    await checkoutPage.continueCheckout();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
});

test('checkout without last name', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    // Fill in checkout information without last name
    await checkoutPage.fillInformation('Dominika', '', '91304');
    await checkoutPage.continueCheckout();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
});

test('checkout without postal code', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

    // Fill in checkout information without postal code
    await checkoutPage.fillInformation('Dominika', 'Tekulova', '');
    await checkoutPage.continueCheckout();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
});
});
