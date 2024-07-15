import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { ElementsPage } from "../../pages/elements/ElementsPage.ts";
import { screenshot } from "../../utils/screenshot.ts";
import {
  copyRightText,
  title,
  categoryUrls,
  subCategoriesUrls,
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
    //qase.id(7);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elements.checkTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Call To Action", async () => {
      await elements.checkTextElement(callToAction);
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await elements.checkElementVisibility(elements.logo);
    });

    await test.step("Step 4: The Footer Be Visible And Contain Copyright Info", async () => {
      await elements.checkFooter(copyRightText);
    });

    //add assertions for sidebar - Elemets should be active, submenu should be opened, visible elements
    //sub pages should be opened through sidebar - separate suite?

    // await screenshot(page, test);
  });
});
