import { Page } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

    async addBackpackToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async addBikeLightToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    }

    async addBoltTShirtToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    }

    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async sortAToZ() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
    }

    async sortZToA() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('za');
    }

    async sortLowToHigh() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    }

    async sortHighToLow() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    }

    async logout() {
        await this.page.locator('#react-burger-menu-btn').click();
        await this.page.locator('#logout_sidebar_link').click();
    }
    async resetAppState() {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#reset_sidebar_link').click();
    }
}