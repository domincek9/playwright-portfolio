import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';


test.describe('Logout tests', () => {
test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);
    

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');


});

test('successful logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    await inventoryPage.logout();


    // Verify logout
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
});
