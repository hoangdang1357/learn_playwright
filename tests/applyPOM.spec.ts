import { Page, test } from "@playwright/test";
import PageManager from "../pages/PageManager";

let EMAIL: string = "donottrackmeplz@gmail.com"
let PASSWORD: string = "123123@Ab"

test.only('apply POM design pattern', async ({ page }) => {
    const pageManager = new PageManager(page);

    await pageManager.onLoginPage().gotoLink();
    await pageManager.onLoginPage().fillEmailAndPasswordAndSubmit(EMAIL, PASSWORD);
    await pageManager.onDashboardPage().clickAddToCart("ZARA COAT 3");
    await pageManager.onDashboardPage().navigateCartPage();
    await page.locator("div li").first().waitFor();
    await pageManager.onCartPage().expectProductName("ZARA COAT 3");
    await pageManager.onCartPage().clickCheckout();
    await pageManager.onCheckoutPage().expectEmail(EMAIL);
    await pageManager.onCheckoutPage().typeCountry("viet");
    await pageManager.onCheckoutPage().clickPlaceOrder();
    await pageManager.onOrderCompletePage().expectTitle();

});