import { expect } from '@playwright/test';
import { Locator, Page } from "playwright";
import { execPath } from 'process';

export default class CartPage {
    readonly page: Page;
    readonly products: Locator;
    readonly productName: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productName = page.locator(".cartSection h3");
        this.checkoutButton = page.locator("button", { hasText: 'Checkout' });
    }

    async expectProductName(productName: string) {
        await expect(this.productName).toHaveText(productName);
    }

    async clickAddToCart(productName: string) {
        const productCard = this.products.filter({ hasText: productName });
        await productCard.locator("text=Add To Cart").click();
    }

    async clickCheckout() {
        this.checkoutButton.click();
    }



}