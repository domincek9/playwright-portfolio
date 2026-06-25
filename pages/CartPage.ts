import { Page } from '@playwright/test';

export class CartPage {
    proceedToCheckout: any;

    constructor(private page: Page) {}

    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async removeBackpack() {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click();
    }
    async continueShopping() {
  await this.page.locator('[data-test="continue-shopping"]').click();
    }
}