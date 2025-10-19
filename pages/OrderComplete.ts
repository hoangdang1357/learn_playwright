import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export default class OrderComplete {
    readonly page: Page;
    readonly titleCongratulation: Locator;
    readonly code: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    readonly orderPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleCongratulation = page.locator("h1");
        this.code = page.locator(".em-spacer-1 .ng-star-inserted");
        this.emailField = this.page.locator("#userEmail");
        this.passwordField = this.page.locator("#userPassword");
        this.submitButton = this.page.locator("#login");
        this.orderPage = page.locator("button[routerlink*='myorders']");
    }


    async navigateOrderPage() {
        await this.orderPage.click();
        await this.page.waitForSelector("tr.ng-star-inserted", { timeout: 10000 });
    }

    async expectTitle() {
        expect(await this.titleCongratulation.textContent()).toContain(" Thankyou for the order. ");
    }

    async cleanOrderID(orderID: string) {
        let cleanedOrderID: string = "";
        for (const char of orderID) {
            if (/[^a-zA-Z0-9]/.test(char) == false) {
                cleanedOrderID += char;
            }
        }
        return cleanedOrderID;
    }

    async logCode() {
        console.log("code goes hereeeeeeeeeee: ", await this.code.textContent());
        let text: string = (await this.code.textContent()) ?? '';
        let cleanedText = await this.cleanOrderID(text?.trim() || "");
        console.log(cleanedText);
        return cleanedText;
    }
}