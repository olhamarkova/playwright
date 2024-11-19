import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../app/modules/core/support/data.ts";
import {
  dynamicText,
  elementPagesHeadings as headings,
} from "../../app/modules/elementsPages/support/data.ts";
import { DynamicPage } from "../../app/modules/elementsPages/pages/DynamicPage.ts";
import { dynamicButtonsColor } from "../../app/modules/elementsPages/support/classes.ts";

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
      await dynamicPage.heading.hasText(
        dynamicPage.pageTitle("h1"),
        headings.dynamic
      );
      await dynamicPage.text.isElementVisible(
        dynamicPage.text.getByText(dynamicText)
      );
    });

    await test.step("Step 2: Check The Disabled Button", async () => {
      await dynamicPage.button.isElementEnabled(
        dynamicPage.disabledButton,
        false
      );
      await dynamicPage.button.hasCSS(dynamicPage.changeColorButton, {
        property: "color",
        value: dynamicButtonsColor.before,
      });
      await page.waitForTimeout(5000);
      await dynamicPage.button.isElementEnabled(dynamicPage.disabledButton);
      await dynamicPage.button.hasCSS(dynamicPage.changeColorButton, {
        property: "color",
        value: dynamicButtonsColor.after,
      });
    });
  });

  test("@smoke Validate The Invisible Button", async () => {
    await test.step("Step 1: Check The Invisible Button", async () => {
      await dynamicPage.invisibleButton.waitFor();
      await dynamicPage.button.isElementVisible(dynamicPage.invisibleButton);
    });
  });
});
