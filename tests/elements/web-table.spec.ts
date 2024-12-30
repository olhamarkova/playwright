import { test } from "../../fixtures/pages-fixture.ts";
import { recordData } from "../../app/modules/elements/support/data.ts";
import { AddRecordInputs } from "../../app/modules/elements/support/types.ts";

test.describe("Web Table Page Tests", () => {
  test.beforeEach(async ({ app: { table }, heading }) => {
    await table.visit();
    await table.verifyHeading(heading.webTables);
  });

  test("@functional The User Shall Be Able To Add A New Row To The Table", async ({
    app: { table },
  }) => {
    await test.step("Step 1: Open The Form", async () => {
      await table.openForm();
      await table.addNewRecord.verifyOpened();
    });

    await test.step("Step 2: Fill The Form", async () => {
      await table.addNewRecord.fillForm(recordData);
    });

    await test.step("Step 3: Submit The Form", async () => {
      await table.button.click(table.addNewRecord.submitButton);
      await table.verifyRow(5, Object.values(recordData));
    });
  });

  test("@functional The User Shall Be Able To Change Count Of Rows On The Table", async ({
    app: { table },
  }) => {
    await test.step("Step 1: Change Count To 5", async () => {
      await table.changeRowsCount(5);
      await table.verifyRowsCount(5);
    });

    await test.step("Step 2: Change Count To 25", async () => {
      await table.changeRowsCount(25);
      await table.verifyRowsCount(25);
    });
  });

  test("@functional The User Shall Be Able To Edit Data In A Record", async ({
    app: { table },
  }) => {
    await test.step("Step 1: Open The form", async () => {
      await table.openEditForm(1);
      await table.addNewRecord.verifyInputValue(
        AddRecordInputs.Salary,
        "10000"
      );
    });

    await test.step("Step 2: Enter A New Value", async () => {
      await table.addNewRecord.clearInput(AddRecordInputs.Salary);
      await table.addNewRecord.enterValue(AddRecordInputs.Salary, "20000");
      await table.addNewRecord.verifyInputValue(
        AddRecordInputs.Salary,
        "20000"
      );
    });

    await test.step("Step 3: Submit The Form", async () => {
      await table.addNewRecord.submit();
      await table.verifyCellByContent("20000");
    });
  });

  test("@functional The User Shall Be Able To Delete A Record", async ({
    app: { table },
  }) => {
    await test.step("Step 1: Delete A Record", async () => {
      await table.button.click(table.actionButton("delete", 3));
      //await table.verifyRow(4);
    });
  });

  // test("@functional The User Shall Be Able To Find A Record Using Search", async ({
  //   app: { table },
  // }) => {
  //   let search: string | null;
  //   await test.step("Step 1: Type A Search Value", async () => {
  //     search = await table.table.getCellByRowNumber(2, 2).textContent();
  //     await table.input.fillOut(table.searchField, search!);
  //     // await table.validateCell(2, 2, search!);
  //     // await table.validateRow(3);
  //   });
  // });

  // test("@functional The User Shall Be Able To Sort Data In Columns", async ({
  //   app: { table },
  // }) => {
  //   let salaries: string[] = [];
  //   await test.step("Step 1: Sort Data By Salary", async () => {
  //     await table.button.click(table.table.getColumnheader("Salary"));
  //     for (let i = 2; i < 5; i++) {
  //       let salary = await table.table.getCellByRowNumber(i, 5).textContent();
  //       salaries.push(salary as string);
  //     }
  //     for (let i = 2; i < salaries.length; i++) {
  //       expect(Number(salaries[i])).toBeGreaterThan(Number(salaries[i - 1]));
  //     }
  //   });
  // });

  // test("@negative The User Shall See A Message When No Records Found", async ({
  //   app: { table },
  // }) => {
  //   await test.step("Step 1: Type An Invalid Search Value", async () => {
  //     await table.input.fillOut(table.searchField, "foo");
  //     await table.text.isVisible(table.text.getByText("No rows found"));
  //   });
  // });
});
