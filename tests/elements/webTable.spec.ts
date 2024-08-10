import { test } from "@playwright/test";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  columnHeaders,
  elementPagesHeadings as headings,
} from "../../pages/elements/elementsData.ts";
import { WebTablesPage } from "../../pages/elements/pages/webTables/WebTablesPage.ts";

let tablePage: WebTablesPage;

test.beforeEach(async ({ page }) => {
  tablePage = new WebTablesPage(page, subCategoriesUrls.elements.webTables);
  await tablePage.visit();
});

test.describe("Web Table Page Tests", () => {
  test("@smoke The Web Tables Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await tablePage.validateHeading(headings.webTables);

      //await screenshot(page, test);
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await tablePage.validateElementVisibility(tablePage.addNewRecordButton);
      await tablePage.validateElementVisibility(tablePage.searchField);
      await tablePage.validateElementVisibility(tablePage.rowsSelector);
      await tablePage.validateDisabledElement(tablePage.previousButton);
      await tablePage.validateDisabledElement(tablePage.nextButton);
    });

    await test.step("Step 3: Check The Table", async () => {
      await tablePage.validateElements(columnHeaders);
      await tablePage.validateElementsCount(tablePage.rows, 11);
    });
  });

  test("@functional The User Shall Be Able To Add A New Row To The Table", async () => {
    await test.step("Step 1: ", async () => {
      await tablePage.clickButton(tablePage.addNewRecordButton);
    });

    await test.step("Step 2: ", async () => {});
  });

  // test("@functional The User Shall Be Able To Change Count Of Rows On The Table", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });

  // test("@functional The User Shall Be Able To Edit Data In A Record", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });

  // test("@functional The User Shall Be Able To Delete A Record", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });

  // test("@functional The User Shall Be Able To Find A Record Using Search", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });

  // test("@functional The User Shall Be Able To Resize The Columns", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });

  // test("@negative The User Shall See A Message When No Records Found", async () => {

  //   await test.step("Step 1: ", async () => {});

  //   await test.step("Step 2: ", async () => {});
  // });
});
