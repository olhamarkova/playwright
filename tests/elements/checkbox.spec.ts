import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import { elementPagesHeadings as headings } from "../../pages/elements/elementsData.ts";
import { CheckBoxPage } from "../../pages/elements/CheckBoxPage.ts";

let checkboxPage: CheckBoxPage;

test.beforeEach(async ({ page }) => {
  checkboxPage = new CheckBoxPage(page, subCategoriesUrls.elements.checkbox);
  await checkboxPage.visit();
});

test.describe("Checkbox Page Tests", () => {
  test("@smoke The Checkbox Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    //qase.id(8);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await checkboxPage.checkHeading(headings.checkbox);
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await checkboxPage.checkElementVisibility(checkboxPage.expandAllButton);
      await checkboxPage.checkElementVisibility(checkboxPage.collapseAllButton);
      await checkboxPage.checkElementVisibility(checkboxPage.toggleButton(1));
    });

    await test.step("Step 3: Check The Categories List", async () => {
      await checkboxPage.checkElementsCount(checkboxPage.checkboxes, 1);
      await checkboxPage.checkElementsCount(
        checkboxPage.folderIcons("close"),
        1
      );
      await checkboxPage.checkElementVisibility(
        checkboxPage.checkboxLabel("Home")
      );
    });

    // await screenshot(page, test);
  });
});
