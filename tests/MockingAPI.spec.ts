import { test, expect } from "@playwright/test";
import { json } from "stream/consumers";
import tags from "../test-data/tags.json"
import { request } from "http";

test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/tags", async route => {
        await route.fulfill({ body: JSON.stringify(tags) })
    })

    await page.route("**/*.css", route => route.abort());
    // page.on("request", request => console.log(request.url()));
    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()));

    await page.route("https://conduit.productionready.io/api/articles?limit=10&offset=0", async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.article[0].title = "test title";
        responseBody.article[0].description = "test description";
        await route.fulfill({ body: JSON.stringify(responseBody) });
    })

    await page.goto("https://angular.realworld.io/");
})

test.skip("has title", async ({ page }) => {
    await expect(page.locator(".navbar-brand")).toHaveText("conduit");
    await page.pause();
})