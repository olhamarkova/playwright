import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { ElementsPage } from "../../pages/elements/ElementsPage.ts";
import { screenshot } from "../../utils/screenshot.ts";
import {
  copyRightText,
  title,
  categoryUrls,
  subCategoriesUrls,
  sidebarItems,
} from "../../utils/services/dataService.ts";
import { callToAction } from "../../pages/elements/elementsData.ts";

let elements: ElementsPage;

test.beforeEach(async ({ page }) => {
  elements = new ElementsPage(page, categoryUrls.elements);
  await elements.visit();
});

test.describe("Elements Page Tests", () => {
  test("@smoke The Elements Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    qase.id(11);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elements.validateTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Call To Action", async () => {
      await elements.validateTextElement(callToAction);
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await elements.validateElementVisibility(elements.logo);
    });

    await test.step("Step 4: The Footer Be Visible And Contain Copyright Info", async () => {
      await elements.validateFooter(copyRightText);
    });

    await screenshot(page, test);
  });

  test("@smoke The Elements Menu Subitems Should Lead To Corresponding Pages", async () => {
    qase.id(13);
    qase.title(test.info().title);

    const url = Object.values(subCategoriesUrls.elements);
    let step = 1;

    for (let i = 0; i < url.length; i++) {
      await test.step(`Step ${step}: Check The Page ${sidebarItems.elements[i]} Link`, async () => {
        await elements.sidebar.goToPage(sidebarItems.elements[i]);
        await elements.validatePageUrl(url[i]);

        step++;
      });
    }
  });
});
