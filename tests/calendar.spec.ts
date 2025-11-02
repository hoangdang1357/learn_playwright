import { expect, test } from "playwright/test"
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


