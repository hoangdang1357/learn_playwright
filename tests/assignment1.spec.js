const { test, expect } = require("@playwright/test");
const { log } = require("console");

test("list first title", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const submitButton = page.locator("#login");
    const productTitle = page.locator("h5 b");

    await emailField.fill("donottrackmeplz@gmail.com");
    await passwordField.fill("123123@Ab");
    await submitButton.click();
    await page.locator("h5 b").last().waitFor();
    const allTitle = await productTitle.allTextContents();
    console.log(allTitle);


})