import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Auto Complete Inputs", async () => {
  test.beforeEach(async ({ app: { datePicker }, heading }) => {
    await datePicker.visit();
    await datePicker.verifyHeading(heading.datePicker);
  });

  test("@smoke User Shall Be Able to See the Current Date When Open the Page", async ({
    app: { datePicker },
  }) => {
    console.log("Hi!");
  });
});
