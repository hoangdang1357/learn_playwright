import { test, expect, Locator, Page, request } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderComplete from '../pages/OrderComplete';
import MyOrder from '../pages/MyOrderPage';
import { log } from 'console';
import { CLIENT_RENEG_LIMIT } from 'tls';

let EMAIL: string = "donottrackmeplz@gmail.com"
let PASSWORD: string = "123123@Ab"
let loginPayload = { userEmail: EMAIL, userPassword: PASSWORD }

test.beforeAll(async ({ browser }) => {
    const apiContext = await request.newContext();
    // make api call to login
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload })
    expect((loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
})

test.only("Calendar", async ({ page }) => {
    const monthNumber = "6";
    const dateNumber = "15";
    const yearNumber = "2026";
    const expectedList = [monthNumber, dateNumber, yearNumber];
    // link: https://rahulshettyacademy.com/seleniumPractise/#/offers
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(yearNumber).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("abbr", { hasText: dateNumber }).click();
    // react-date-picker__inputGroup__input react-date-picker__inputGroup__month
    const inputs = page.locator(".react-date-picker__inputGroup__input");
    for (let index = 0; index < expectedList.length; index++) {
        const value = await inputs.nth(index).inputValue();
        expect(value).toEqual(expectedList[index]);

    }

})


