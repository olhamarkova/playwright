import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { MainPage } from "../pages/mainPage/MainPage.ts";
import { screenshot } from "../utils/screenshot.ts";
import { copyRightText } from "../data/footerText.ts";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.visit();
});

test.describe("Main Page Smoke Tests", () => {
  test("The Main Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    qase.id(4);
    qase.title(test.info().title);
    await test.step("Step 1: Check The Page Title", async () => {
      await mainPage.checkTitle("DEMOQA");
    });

    await test.step("Step 2: The Page Should Have A Header", async () => {
      await mainPage.checkHeader();
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await mainPage.checkLogo();
    });

    await test.step("Step 4: The Navigation Cards Should Be Presented On The Page", async () => {
      await mainPage.checkElementsVisibility(mainPage.cards);
      await mainPage.checkElementsVisibility(mainPage.cardLogos);
      await mainPage.checkElementsVisibility(mainPage.cardTitles);
    });

    await test.step("Step 5: The Footer Be Visible And Contain Copyright Info", async () => {
      await mainPage.checkFooter(copyRightText);
    });

    await screenshot(page, test);
  });
});
