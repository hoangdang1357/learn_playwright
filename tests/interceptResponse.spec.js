const { test, expect, request } = require('@playwright/test');
import { APiUtils } from './utils/APIUtils';
const loginPayLoad = { userEmail: "donottrackmeplz@gmail.com", userPassword: "123123@Ab" };
const orderPayLoad = { orders: [{ country: "Vietnam", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});


//create order is success
test('@SP Place the order', async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/68e4e1cef669d6cb0a02a4ef",)




});