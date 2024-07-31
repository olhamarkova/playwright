import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import { elementPagesHeadings as headings } from "../../pages/elements/elementsData.ts";
import { CheckBoxPage } from "../../pages/elements/CheckBoxPage.ts";
import { CheckboxLabels } from "../../pages/elements/ElementsTypes.ts";

let checkboxPage: CheckBoxPage;

test.beforeEach(async ({ page }) => {
  checkboxPage = new CheckBoxPage(page, subCategoriesUrls.elements.checkbox);
  await checkboxPage.visit();
});

test.describe("Checkbox Page Tests", () => {
  test("@smoke The Checkbox Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    //qase.id(13);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await checkboxPage.checkHeading(headings.checkbox);
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await checkboxPage.checkElementVisibility(checkboxPage.button("Expand"));
      await checkboxPage.checkElementVisibility(
        checkboxPage.button("Collapse")
      );
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

  test("@functional User Shall Be Able To Open And Close The List By Clicking On Buttons", async ({
    page,
  }) => {
    //qase.id(14);
    qase.title(test.info().title);

    await test.step("Step 1: Expand All Categories", async () => {
      await checkboxPage.clickButton(checkboxPage.button("Expand"));
      await checkboxPage.checkElementsVisibility(
        checkboxPage.folderIcons("open")
      );
      await checkboxPage.checkElementsVisibility(checkboxPage.sheetIcons);
      await checkboxPage.checkElementsCount(
        checkboxPage.folderIcons("open"),
        6
      );
      await checkboxPage.checkElementsCount(checkboxPage.sheetIcons, 11);
      await checkboxPage.checkElementsCount(checkboxPage.checkboxes, 17);
      await checkboxPage.validateAllCheckboxes();
    });

    await test.step("Step 2: Collapse All Categories", async () => {
      await checkboxPage.clickButton(checkboxPage.button("Collapse"));
      await checkboxPage.checkElementsCount(checkboxPage.checkboxes, 1);
      await checkboxPage.checkElementsCount(
        checkboxPage.folderIcons("close"),
        1
      );
      await checkboxPage.validateCheckbox(CheckboxLabels.Home);
    });

    // await screenshot(page, test);
  });
});
