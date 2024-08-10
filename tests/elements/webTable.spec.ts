import { test } from "@playwright/test";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  columnHeaders,
  elementPagesHeadings as headings,
  recordData,
} from "../../pages/elements/elementsData.ts";
import { WebTablesPage } from "../../pages/elements/pages/webTables/WebTablesPage.ts";
import { AddRecordInputs } from "../../pages/elements/ElementsTypes.ts";
import AddNewRecordForm from "../../pages/elements/pages/webTables/AddNewRecordForm.ts";

let tablePage: WebTablesPage;
let form: AddNewRecordForm;

test.beforeEach(async ({ page }) => {
  tablePage = new WebTablesPage(page, subCategoriesUrls.elements.webTables);
  form = tablePage.addNewRecord;
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
    await test.step("Step 1: Open The Form", async () => {
      await tablePage.clickButton(tablePage.addNewRecordButton);
      await tablePage.validateElementVisibility(form.form);
      await tablePage.validateTextElement("Registration Form");
    });

    await test.step("Step 2: Fill The Form", async () => {
      await tablePage.fillInput(
        form.input(AddRecordInputs.First_Name),
        recordData.firstName
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.First_Name),
        recordData.firstName
      );
      await tablePage.fillInput(
        form.input(AddRecordInputs.Last_Name),
        recordData.lastName
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.Last_Name),
        recordData.lastName
      );
      await tablePage.fillInput(
        form.input(AddRecordInputs.Email),
        recordData.email
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.Email),
        recordData.email
      );
      await tablePage.fillInput(
        form.input(AddRecordInputs.Age),
        recordData.age
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.Age),
        recordData.age
      );
      await tablePage.fillInput(
        form.input(AddRecordInputs.Salary),
        recordData.salary
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.Salary),
        recordData.salary
      );
      await tablePage.fillInput(
        form.input(AddRecordInputs.Department),
        recordData.department
      );
      await tablePage.validateInputValue(
        form.input(AddRecordInputs.Department),
        recordData.department
      );
    });

    await test.step("Step 3: Submit The Form", async () => {
      await tablePage.clickButton(form.submitButton);
      await tablePage.validateCellContent(4, 1, recordData.firstName);
      await tablePage.validateCellContent(4, 2, recordData.lastName);
      await tablePage.validateCellContent(4, 3, recordData.age);
      await tablePage.validateCellContent(4, 4, recordData.email);
      await tablePage.validateCellContent(4, 5, recordData.salary);
      await tablePage.validateCellContent(4, 6, recordData.department);
    });
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
