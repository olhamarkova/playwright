import { test } from "@playwright/test";
//import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import { elementPagesHeadings as headings } from "../../pages/elements/elementsData.ts";
import { WebTablesPage } from "../../pages/elements/WebTablesPage.ts";

let tablePage: WebTablesPage;

test.beforeEach(async ({ page }) => {
  tablePage = new WebTablesPage(page, subCategoriesUrls.elements.webTables);
  await tablePage.visit();
});

test.describe("Web Table Page Tests", () => {
  test("@smoke The Web Tables Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    // qase.id(12);
    // qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await tablePage.validateHeading(headings.webTables);

      // await screenshot(page, test);
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await tablePage.validateElementVisibility(tablePage.addNewRecordButton);
      await tablePage.validateElementVisibility(tablePage.searchField);
      await tablePage.validateElementsCount(tablePage.rows, 11);
      await tablePage.validateDisabledElement(tablePage.previousButton);
      await tablePage.validateDisabledElement(tablePage.nextButton);
      const columnHeaders = [
        "First Name",
        "Last Name",
        "Age",
        "Email",
        "Salary",
        "Department",
        "Action",
      ];
      for (let i = 0; i < columnHeaders.length; i++) {
        await tablePage.validateElementVisibility(
          tablePage.columnHeader(columnHeaders[i])
        );
      }
    });
  });

  // test("@functional The User Shall Be Able To Add A New Row To The Table", async () => {
  //   // qase.id(16);
  //   // qase.title(test.info().title);

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });
});
