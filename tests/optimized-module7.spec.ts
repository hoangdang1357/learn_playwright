import { test, expect, Locator, Page, request } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderComplete from '../pages/OrderComplete';
import MyOrder from '../pages/MyOrderPage';
import APIUtils from './utils/APIUtils';
import { log } from 'console';
import { CLIENT_RENEG_LIMIT } from 'tls';

let EMAIL: string = "donottrackmeplz@gmail.com"
let PASSWORD: string = "123123@Ab"
let loginPayload = { userEmail: EMAIL, userPassword: PASSWORD }
let createOrderPayload = { "orders": [{ "country": "Vietnam", "productOrderedId": "68a961719320a140fe1ca57c" }] }
let token: string = "";
let orderId: string;

test.beforeAll(async ({ browser }) => {
  const apiContext = await request.newContext();
  const APIUtilsObject = new APIUtils(apiContext);

  token = await APIUtilsObject.getToken();
  orderId = await APIUtilsObject.createOrder(createOrderPayload);

})




test.only('module 7', async ({ page }) => {

  const loginPageObject = new LoginPage(page);
  const dashboardPageObject = new DashboardPage(page);
  const cartPageObject = new CartPage(page);
  const checkoutPageObject = new CheckoutPage(page);
  const orderComplete = new OrderComplete(page);
  const myOrderObject = new MyOrder(page);


  await page.addInitScript(value => {
    window.localStorage.setItem("token", value)
  }, token)

  await loginPageObject.gotoLink();

  //   await dashboardPageObject.clickAddToCart("ZARA COAT 3");
  //   await dashboardPageObject.navigateCartPage();
  //   await page.locator("div li").first().waitFor();
  //   await cartPageObject.expectProductName("ZARA COAT 3");
  //   await cartPageObject.clickCheckout();
  //   await checkoutPageObject.expectEmail(EMAIL);
  //   await checkoutPageObject.typeCountry("viet");
  //   await checkoutPageObject.clickPlaceOrder();
  //   await orderComplete.expectTitle();

  //   await page.pause();
  await orderComplete.navigateOrderPage();

  const rows = await page.locator("tbody tr");

  for (let index = 0; index < await rows.count(); index++) {
    const rowOrderID = (await rows.nth(index).locator("th").textContent())?.trim() || "";
    if (orderId.includes(rowOrderID)) {
      await rows.nth(index).locator("button", { hasText: 'View' }).click();
    }
  }


});

