import { Locator, Page } from "playwright";

export default class DashboardPage {
    readonly page: Page;
    readonly products: Locator;
    readonly cartPageButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartPageButton = page.locator("[routerlink*='cart']");
    }

    async navigateCartPage() {
        await this.cartPageButton.click();
    }

    async clickAddToCart(productName: string) {
        const productCard = this.products.filter({ hasText: productName });
        await productCard.locator("text=Add To Cart").click();
    }

}