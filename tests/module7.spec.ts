import { test, expect, Locator, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderComplete from '../pages/OrderComplete';
import MyOrder from '../pages/MyOrderPage';
test.only('module 7', async ({ page }) => {
  let EMAIL: string = "donottrackmeplz@gmail.com"

  const loginPageObject = new LoginPage(page);
  const dashboardPageObject = new DashboardPage(page);
  const cartPageObject = new CartPage(page);
  const checkoutPageObject = new CheckoutPage(page);
  const orderComplete = new OrderComplete(page);
  const myOrderObject = new MyOrder(page);

  await loginPageObject.gotoLink();
  await loginPageObject.fillEmail(EMAIL);
  await loginPageObject.fillPassword("123123@Ab");
  await loginPageObject.clickSubmitButton();
  await dashboardPageObject.clickAddToCart("ZARA COAT 3");
  await dashboardPageObject.navigateCartPage();
  await page.locator("div li").first().waitFor();
  await cartPageObject.expectProductName("ZARA COAT 3");
  await cartPageObject.clickCheckout();
  await checkoutPageObject.expectEmail(EMAIL);
  await checkoutPageObject.typeCountry("viet");
  await checkoutPageObject.clickPlaceOrder();
  await orderComplete.expectTitle();
  let orderID: string = await orderComplete.logCode();
  await page.pause();
  await orderComplete.navigateOrderPage();

  const rows = await page.locator("tbody tr");

  for (let index = 0; index < await rows.count(); index++) {
    const rowOrderID = (await rows.nth(index).locator("th").textContent())?.trim() || "";
    if (orderID.includes(rowOrderID)) {
      await rows.nth(index).locator("button", { hasText: 'View' }).click();
    }
  }


});

