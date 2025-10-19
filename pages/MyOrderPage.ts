import { expect, Page, Locator } from "@playwright/test";

export default class MyOrder {
    readonly page: Page;
    readonly OrderIDCell: Locator;
    readonly rows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.OrderIDCell = this.rows.locator("[scope*='row']");

    }

    async clickView(orderID: string) {
        await this.rows.first().waitFor({ state: 'visible' });
        const rowProduct = this.rows.locator("th").filter({ hasText: orderID });
        await rowProduct.locator("text=View").click();
    }

}