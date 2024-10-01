import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import { elementPagesHeadings as headings } from "../../data/elementsData.ts";
import { CheckBoxPage } from "../../pages/elementsPages/pages/CheckBoxPage.ts";
import { CheckboxLabels } from "../../utils/types/ElementsTypes.ts";

let checkboxPage: CheckBoxPage;

test.beforeEach(async ({ page }) => {
  checkboxPage = new CheckBoxPage(page, subCategoriesUrls.elements.checkbox);
  await checkboxPage.visit();
});

test.describe("Checkbox Page Tests", () => {
  test("@smoke The Checkbox Page Should Have All The Expected Elements", async () => {
    // qase.id(7);
    // qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await checkboxPage.heading.hasText(
        checkboxPage.pageTitle("h1"),
        headings.checkbox
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await checkboxPage.button.isElVisible(
        checkboxPage.expandButton("Expand")
      );
      await checkboxPage.button.isElVisible(
        checkboxPage.expandButton("Collapse")
      );
      await checkboxPage.button.isElVisible(checkboxPage.toggleButton(1));
    });

    await test.step("Step 3: Check The Categories List", async () => {
      await checkboxPage.checkbox.hasCount(checkboxPage.checkboxes(), 1);
      await checkboxPage.icon.hasCount(checkboxPage.folderIcons("close"), 1);
      await checkboxPage.checkbox.isElVisible(
        checkboxPage.checkboxLabel(CheckboxLabels.Home)
      );
    });

    // await screenshot(page, test);
  });

  // test("@functional User Shall Be Able To Open And Close The List By Clicking On Buttons", async () => {
  //   qase.id(10);
  //   qase.title(test.info().title);

  //   await test.step("Step 1: Expand All Categories", async () => {
  //     await checkboxPage.clickButton(checkboxPage.button("Expand"));
  //     await checkboxPage.validateElementsVisibility(
  //       checkboxPage.folderIcons("open")
  //     );
  //     await checkboxPage.validateElementsVisibility(checkboxPage.sheetIcons);
  //     await checkboxPage.validateElementsCount(
  //       checkboxPage.folderIcons("open"),
  //       6
  //     );
  //     await checkboxPage.validateElementsCount(checkboxPage.sheetIcons, 11);
  //     await checkboxPage.validateElementsCount(checkboxPage.checkboxes, 17);
  //     await checkboxPage.validateAllCheckboxes();
  //   });

  //   await test.step("Step 2: Collapse All Categories", async () => {
  //     await checkboxPage.clickButton(checkboxPage.button("Collapse"));
  //     await checkboxPage.validateElementsCount(checkboxPage.checkboxes, 1);
  //     await checkboxPage.validateElementsCount(
  //       checkboxPage.folderIcons("close"),
  //       1
  //     );
  //     await checkboxPage.validateCheckbox(CheckboxLabels.Home);
  //   });
  // });

  // test("@functional User Shall Be Able To Check And Uncheck All The Categories", async () => {
  //   qase.id(8);
  //   qase.title(test.info().title);

  //   await test.step("Step 1: Check All Categories", async () => {
  //     await checkboxPage.check(CheckboxLabels.Home);
  //     await checkboxPage.clickButton(checkboxPage.button("Expand"));
  //     await checkboxPage.validateAllCheckboxes(true);
  //   });

  //   await test.step("Step 2: Uncheck All Categories", async () => {
  //     await checkboxPage.check(CheckboxLabels.Home, false);
  //     await checkboxPage.validateAllCheckboxes();
  //   });
  // });

  // test("@functional User Shall Be Able To Check And Uncheck One Category", async () => {
  //   qase.id(9);
  //   qase.title(test.info().title);

  //   await test.step("Step 1: Find The Angular Category", async () => {
  //     await checkboxPage.clickButton(checkboxPage.toggleButton(1));
  //     await checkboxPage.clickButton(checkboxPage.toggleButton(3));
  //     await checkboxPage.clickButton(checkboxPage.toggleButton(4));
  //     await checkboxPage.validateElementVisibility(
  //       checkboxPage.checkboxLabel("Angular")
  //     );
  //   });

  //   await test.step("Step 2: Check The Angular Category", async () => {
  //     await checkboxPage.check(CheckboxLabels.Angular);
  //     await checkboxPage.validateCheckbox(CheckboxLabels.Angular, true);
  //     await checkboxPage.validateParentCategories(CheckboxLabels.Workspace);
  //     await checkboxPage.validateParentCategories(CheckboxLabels.Documents);
  //     await checkboxPage.validateParentCategories(CheckboxLabels.Home);
  //   });

  //   await test.step("Step 3: Uncheck The Angular Category", async () => {
  //     await checkboxPage.check(CheckboxLabels.Angular, false);
  //     await checkboxPage.validateCheckbox(CheckboxLabels.Angular);
  //     await checkboxPage.validateAllCheckboxes();
  //   });
  // });
});
