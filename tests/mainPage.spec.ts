import { test } from "@playwright/test";
import { MainPage } from "../pages/mainPage/MainPage.ts";
import { screenshot } from "../utils/screenshot.ts";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.visit();
});

test.describe("Main Page Smoke Tests", () => {
  test("The page should have a correct title", async ({ page }) => {
    await mainPage.checkTitle("DEMOQA");

    await screenshot(page, test);
  });

  test("The page should have a header", async () => {
    await mainPage.checkHeader();
  });

  test("The logo should be visible", async () => {
    await mainPage.checkLogo();
  });
});
