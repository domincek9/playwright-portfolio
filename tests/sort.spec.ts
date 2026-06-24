import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sort tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('sort products by name A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortAToZ();

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

  //Sort products by name Z to A
  test('sort products by name Z to A', async ({ page }) => {
    
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortZToA();

    // Verify first product is Test.allTheThings() T-Shirt (Red)
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // Verify last product is Sauce Labs Backpack
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Sauce Labs Backpack');
  });


  //Sort products by price low to high
  test('sort products by price low to high', async ({ page }) => {
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortLowToHigh();

    // Verify first product is Sauce Labs Onesie
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Onesie');

    // Verify last product is Sauce Labs Fleece Jacket
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Sauce Labs Fleece Jacket');
  });


     //Sort products by price high to low
  test('sort products by price high to low', async ({ page }) => {
    

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortHighToLow();

    // Verify first product is Sauce Labs Fleece Jacket
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Fleece Jacket');

    // Verify last product is Sauce Labs Onesie
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Sauce Labs Onesie');

    
  });
  });
  

