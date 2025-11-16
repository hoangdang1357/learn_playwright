import { test, expect, Locator, Page, request } from '@playwright/test';


test('module 7', async ({ page }) => {
    await page.goto("https://khaosat.me/survey/sinh-vien-tim-hieu-kien-thuc-phap-luat-nam-2025-0ff5d41")

    for (let index = 0; index < 50; index++) {
        await page.locator(".answer").first().click();
        await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
    }

    await page.pause();

});

