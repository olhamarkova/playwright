import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  dynamicText,
  elementPagesHeadings as headings,
} from "../../pages/elements/elementsData.ts";
import { DynamicPage } from "../../pages/elements/pages/DynamicPage.ts";

let dynamicPage: DynamicPage;

test.beforeEach(async ({ page }) => {
  dynamicPage = new DynamicPage(
    page,
    subCategoriesUrls.elements.dynamicProperties
  );
  await dynamicPage.visit();
});

test.describe("Dynamic Properties Page Tests", () => {
  test("@smoke The Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await dynamicPage.validateHeading(headings.dynamic);
      await dynamicPage.validateTextElement(dynamicText);
    });

    await test.step("Step 2: Check The Disabled Button", async () => {
      await dynamicPage.validateElementVisibility(dynamicPage.disabledButton);
      await dynamicPage.validateDisabledElement(dynamicPage.disabledButton);
      await dynamicPage.validateElementVisibility(
        dynamicPage.changeColorButton
      );
      await dynamicPage.validateButtonClass("before");
      await page.waitForTimeout(5000);
      await dynamicPage.validateEnabledElement(dynamicPage.disabledButton);
      await dynamicPage.validateButtonClass("after");
    });
  });

  test("@smoke Validate The Invisible Button", async () => {
    await test.step("Step 1: Check The Invisible Button", async () => {
      await dynamicPage.invisibleButton.waitFor();
      await dynamicPage.validateElementVisibility(dynamicPage.invisibleButton);
    });
  });
});
