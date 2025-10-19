import { expect } from '@playwright/test';
import { Locator, Page } from "playwright";
import { execPath } from 'process';

export default class CheckoutPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly cvvCode: Locator;
    readonly countryDropDown: Locator;
    readonly dropDown: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator(".user__name input[type='text']");
        this.dropDown = page.locator(".ta-results");
        this.countryDropDown = page.locator("[placeholder*='Country']");
        this.cvvCode = page.locator("div", { hasText: "CVV" }).locator("input");
        this.placeOrderButton = page.locator("a", { hasText: 'Place Order' });
    }


    async fillCvvCode(cvvCode: string) {
        await this.cvvCode.fill(cvvCode);
    }

    async typeCountry(country: string) {
        await this.countryDropDown.pressSequentially(country, { delay: 150 });
        await this.waitDropDown();
        await this.dropDown.locator("button").filter({ hasText: country }).click();
    }

    async expectEmail(email: string) {
        await expect(this.emailField).toHaveValue(email);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }

    async waitDropDown() {
        await this.dropDown.waitFor();
    }





}