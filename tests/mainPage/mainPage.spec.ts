import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { MainPage } from "../../pages/mainPage/MainPage.ts";
import { screenshot } from "../../utils/screenshot.ts";
import {
  copyRightText,
  categories,
  title,
} from "../../utils/services/dataService.ts";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.visit();
});

test.describe("Main Page Smoke Tests", () => {
  test("@smoke The Main Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    qase.id(4);
    qase.title(test.info().title);
    await test.step("Step 1: Check The Page Title", async () => {
      await mainPage.checkTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Header", async () => {
      await mainPage.checkElementVisibility(mainPage.header);
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await mainPage.checkElementVisibility(mainPage.logo);
    });

    await test.step("Step 4: The Navigation Cards Should Be Presented On The Page", async () => {
      await mainPage.checkElementsVisibility(mainPage.cards);
      await mainPage.checkElementsVisibility(mainPage.cardLogos);
      await mainPage.checkElementsVisibility(mainPage.cardTitles);
    });

    await test.step("Step 5: The Footer Be Visible And Contain Copyright Info", async () => {
      await mainPage.checkFooter(copyRightText);
    });

    // await screenshot(page, test);
  });

  test("@smoke The Cards On Main Page Should Lead To Corresponding Pages", async ({
    page,
  }) => {
    qase.id(6);
    qase.title(test.info().title);
    const category = Object.values(categories);
    const url = Object.keys(categories);
    let step = 1;

    for (let i = 0; i < category.length && url.length; i++) {
      await test.step(`Step ${step}: Check The Page ${category[i]} Link`, async () => {
        await mainPage.goToCategory(category[i]);
        await mainPage.checkPageUrl(url[i]);
        // await screenshot(page, test);
        await mainPage.goToMainPage();
        step++;
      });
    }
  });
});
