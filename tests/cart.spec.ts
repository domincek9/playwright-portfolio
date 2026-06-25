import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';


test.describe('Cart tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  
test('add backpack to cart', async ({ page }) => {
  
  // Add Backpack to cart

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addBackpackToCart();

  // Verify cart badge
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Verify button changed to Remove

  await expect(
  page.locator('[data-test="remove-sauce-labs-backpack"]')
  ).toHaveText('Remove');

  // Open cart
  await cartPage.openCart();

  // Verify product in cart
  await expect(page.locator('.inventory_item_name'))
    .toHaveText('Sauce Labs Backpack');
});

test('remove backpack from cart', async ({ page }) => {
 

// Add Backpack to cart

  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  
  await inventoryPage.addBackpackToCart();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');


  //open cart
  await cartPage.openCart();

  //remove backpack from cart
  await cartPage.removeBackpack();

  // Verify product is removed
  await expect(page.locator('.inventory_item_name')).toHaveCount(0);

  // Verify cart badge disappeared
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});


test('add multiple products to cart', async ({ page }) => {
 

  // Add multiple products to cart
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.addBikeLightToCart();
  await inventoryPage.addBoltTShirtToCart();

  // Verify cart badge
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
});

test('continue shopping from cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await cartPage.continueShopping();

  await expect(page).toHaveURL(/inventory/);
});

test('reset app state clears cart', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addBackpackToCart();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await inventoryPage.resetAppState();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});
});
