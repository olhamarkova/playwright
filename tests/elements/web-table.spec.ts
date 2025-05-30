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
      await table.addRecordForm.verifyOpened();
    });

    await test.step("Step 2: Fill The Form", async () => {
      await table.addRecordForm.fillForm(recordData);
    });

    await test.step("Step 3: Submit The Form", async () => {
      await table.addRecordForm.submitForm();
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
      await table.addRecordForm.verifyValue(AddRecordInputs.Salary, "10000");
    });

    await test.step("Step 2: Enter A New Value", async () => {
      await table.addRecordForm.clearInput(AddRecordInputs.Salary);
      await table.addRecordForm.fill(AddRecordInputs.Salary, "20000");
      await table.addRecordForm.verifyValue(AddRecordInputs.Salary, "20000");
    });

    await test.step("Step 3: Submit The Form", async () => {
      await table.addRecordForm.submitForm();
      await table.verifyCellByContent("20000");
    });
  });

  test("@functional The User Shall Be Able To Delete A Record", async ({
    app: { table },
  }) => {
    await table.verifyCellByContent("Kierra");
    await table.deleteRow(3);
    await table.verifyCellByContent("Kierra", false);
  });

  test("@functional The User Shall Be Able To Sort Data In Columns", async ({
    app: { table },
  }) => {
    let salaries: string[] = [];
    await test.step("Step 1: Sort Salaries By Ascending", async () => {
      await table.sortColumn("Salary");
      salaries = await table.getSalaries(3);
      await table.verifySorted(salaries);
    });

    await test.step("Step 2: Sort Salaries By Descending", async () => {
      await table.sortColumn("Salary");
      salaries = await table.getSalaries(3);
      await table.verifySorted(salaries, false);
    });
  });

  test("@negative The User Shall See A Message When No Records Found", async ({
    app: { table },
  }) => {
    await table.search("foo");
    await table.verifyMessage("No rows found");
  });
});
