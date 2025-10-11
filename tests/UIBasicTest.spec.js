const { test, expect } = require("@playwright/test");

test("First context playwright", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com");

});

test("page playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  expect(page).toHaveTitle("Google");
})
