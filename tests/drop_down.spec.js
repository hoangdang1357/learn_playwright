const { test, expect } = require("@playwright/test");
const LINK_WEBSITE = "https://rahulshettyacademy.com/loginpagePractise/"

test("drop down", async ({ page }) => {
  await page.goto(LINK_WEBSITE);
  const emailField = page.locator("#userEmail");
  const passwordField = page.locator("#userPassword");
  const submitButton = page.locator("#login");
  const productTitle = page.locator("h5 b");
  const dropDown = page.locator("select.form-control");
  const blinkingText = page.locator("[href*='qasummit']")

  await page.locator("#okayBtn").first().click();
  await dropDown.selectOption("consult");
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await expect(blinkingText).toHaveAttribute("class", "blinkingText")
  await page.pause();

})

test.only("child window handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LINK_WEBSITE);
  const documentLink = page.locator("[href*='documents-request']");
  const usernameField = page.locator("#username")

  // wait for event of a new page
  const [newPage] = await Promise.all(
    [
      context.waitForEvent("page"),
      documentLink.click(),
    ]
  )

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split('@');
  const domain = arrayText[1].split(" ")[0];
  await usernameField.fill(domain);


})