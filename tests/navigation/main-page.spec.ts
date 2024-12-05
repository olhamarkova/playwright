import { test } from "../../fixtures/pages-fixture";
import {
  copyRightText,
  title,
  categories,
} from "../../app/modules/core/support/data";

test.describe("Main Page Smoke Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    await mainPage.visit();
  });

  test("@smoke The Main Page Should Have All The Expected Elements", async ({
    mainPage,
  }) => {
    await test.step("Step 1: Check The Page Title", async () => {
      await mainPage.hasTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Header", async () => {
      await mainPage.header.isVisible(mainPage.header.header());
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await mainPage.header.isVisible(mainPage.logo);
    });

    await test.step("Step 4: The Navigation Cards Should Be Presented On The Page", async () => {
      await mainPage.icon.areVisible(mainPage.cardLogos);
      await mainPage.heading.areVisible(mainPage.cardTitles);
    });

    await test.step("Step 5: The Footer Be Visible And Contain Copyright Info", async () => {
      await mainPage.footer.isVisible(mainPage.footer.footer());
      await mainPage.footer.isVisible(
        mainPage.footer.copyrightText(copyRightText)
      );
    });
  });

  test("@smoke The Cards On Main Page Should Lead To Corresponding Pages", async ({
    mainPage,
  }) => {
    const pages = Object.entries(categories);
    let step = 1;

    for (const [key, value] of pages) {
      await test.step(`Step ${step}: Check The Page ${value} Link`, async () => {
        await mainPage.goToCategory(value);
        await mainPage.hasUrl(key);
        await mainPage.goToMainPage();

        step++;
      });
    }
  });
});