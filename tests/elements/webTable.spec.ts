import { test, expect } from "../../fixtures/pagesFixture.ts";
import {
  columnHeaders,
  elementPagesHeadings as headings,
  recordData,
} from "../../app/modules/elementsPages/support/data.ts";
import { AddRecordInputs } from "../../app/modules/elementsPages/support/types.ts";

test.describe("Web Table Page Tests", () => {
  test.beforeEach(async ({ tablePage }) => {
    await tablePage.visit();
  });

  test("@smoke The Web Tables Page Should Have All The Expected Elements", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await tablePage.heading.hasText(
        tablePage.pageTitle("h1"),
        headings.webTables
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await tablePage.table.isElementVisible(tablePage.addNewRecordButton);
      await tablePage.table.isElementVisible(tablePage.searchField);
      await tablePage.table.isElementVisible(tablePage.rowsSelector);
      await tablePage.button.isElementEnabled(tablePage.previousButton, false);
      await tablePage.button.isElementEnabled(tablePage.nextButton, false);
    });

    await test.step("Step 3: Check The Table", async () => {
      await tablePage.validateElementsByName(columnHeaders);
      await tablePage.table.hasCount(tablePage.rows, 11);
    });
  });

  test("@functional The User Shall Be Able To Add A New Row To The Table", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Open The Form", async () => {
      await tablePage.button.clickElement(tablePage.addNewRecordButton);
      await tablePage.addNewRecord.heading.hasText(
        tablePage.addNewRecord.modalTitle,
        "Registration Form"
      );
    });

    await test.step("Step 2: Fill The Form", async () => {
      await tablePage.addNewRecord.fillForm(recordData);
    });

    await test.step("Step 3: Submit The Form", async () => {
      await tablePage.button.clickElement(tablePage.addNewRecord.submitButton);
      await tablePage.validateCellContent(5, 1, recordData.firstName);
      await tablePage.validateCellContent(5, 2, recordData.lastName);
      await tablePage.validateCellContent(5, 3, recordData.age);
      await tablePage.validateCellContent(5, 4, recordData.userEmail);
      await tablePage.validateCellContent(5, 5, recordData.salary);
      await tablePage.validateCellContent(5, 6, recordData.department);
    });
  });

  test("@functional The User Shall Be Able To Change Count Of Rows On The Table", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Change Count To 5", async () => {
      await tablePage.selector.chooseOption(tablePage.rowsSelector, "5");
      await tablePage.table.hasCount(tablePage.rows, 6);
    });

    await test.step("Step 2: Change Count To 25", async () => {
      await tablePage.selector.chooseOption(tablePage.rowsSelector, "25");
      await tablePage.table.hasCount(tablePage.rows, 26);
    });
  });

  test("@functional The User Shall Be Able To Edit Data In A Record", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Open The form", async () => {
      await tablePage.validateCellContent(2, 5, "10000");
      await tablePage.button.clickElement(tablePage.actionButton("edit", 1));
      await tablePage.addNewRecord.input.hasValue(
        tablePage.addNewRecord.formInput(AddRecordInputs.Salary),
        "10000"
      );
    });

    await test.step("Step 2: Enter A New Value", async () => {
      await tablePage.addNewRecord.input.clear(
        tablePage.addNewRecord.formInput(AddRecordInputs.Salary)
      );
      await tablePage.addNewRecord.input.fillOut(
        tablePage.addNewRecord.formInput(AddRecordInputs.Salary),
        "20000"
      );
      await tablePage.addNewRecord.input.hasValue(
        tablePage.addNewRecord.formInput(AddRecordInputs.Salary),
        "20000"
      );
    });

    await test.step("Step 3: Submit The Form", async () => {
      await tablePage.addNewRecord.button.clickElement(
        tablePage.addNewRecord.submitButton
      );
      await tablePage.validateCellContent(2, 5, "20000");
    });
  });

  test("@functional The User Shall Be Able To Delete A Record", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Delete A Record", async () => {
      await tablePage.button.clickElement(tablePage.actionButton("delete", 3));
      await tablePage.validateRowContent(4);
    });
  });

  test("@functional The User Shall Be Able To Find A Record Using Search", async ({
    tablePage,
  }) => {
    let search: string | null;
    await test.step("Step 1: Type A Search Value", async () => {
      search = await tablePage.table.getCellByRowNumber(2, 2).textContent();
      await tablePage.input.fillOut(tablePage.searchField, search!);
      await tablePage.validateCellContent(2, 2, search!);
      await tablePage.validateRowContent(3);
    });
  });

  test("@functional The User Shall Be Able To Sort Data In Columns", async ({
    tablePage,
  }) => {
    let salaries: string[] = [];
    await test.step("Step 1: Sort Data By Salary", async () => {
      await tablePage.button.clickElement(
        tablePage.table.getColumnheader("Salary")
      );
      for (let i = 2; i < 5; i++) {
        let salary = await tablePage.table
          .getCellByRowNumber(i, 5)
          .textContent();
        salaries.push(salary as string);
      }
      for (let i = 2; i < salaries.length; i++) {
        expect(Number(salaries[i])).toBeGreaterThan(Number(salaries[i - 1]));
      }
    });
  });

  test("@negative The User Shall See A Message When No Records Found", async ({
    tablePage,
  }) => {
    await test.step("Step 1: Type An Invalid Search Value", async () => {
      await tablePage.input.fillOut(tablePage.searchField, "foo");
      await tablePage.text.isElementVisible(
        tablePage.text.getByText("No rows found")
      );
    });
  });
});
