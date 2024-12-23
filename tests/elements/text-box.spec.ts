import { test } from "../../fixtures/pages-fixture.ts";
import { userData } from "../../app/modules/elements/support/data.ts";

test.describe("Text Box Page Tests", () => {
  test.beforeEach(async ({ app: { textbox }, heading }) => {
    await textbox.visit();
    await textbox.verifyHeading(heading.textBox);
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async ({
    app: { textbox },
  }) => {
    await test.step("Step 1: Fill Out The Form", async () => {
      await textbox.enterData("userName", userData.fullName);
      await textbox.enterData("userEmail", userData.email);
      await textbox.enterData("currentAddress", userData.currentAddress);
      await textbox.enterData("permanentAddress", userData.permanentAddress);
      await textbox.submitForm();
    });

    await test.step("Step 2: Verify the Output", async () => {
      await textbox.verifyOutput("name", userData.fullName);
      await textbox.verifyOutput("email", userData.email);
      await textbox.verifyOutput("currentAddress", userData.currentAddress);
      await textbox.verifyOutput("permanentAddress", userData.permanentAddress);
    });
  });

  test("@negative User Shall See An Error When Submit The Form With Invalid Email", async ({
    app: { textbox },
  }) => {
    await test.step("Step 1: Fill The Form", async () => {
      await textbox.enterData("userName", userData.fullName);
      await textbox.enterData("userEmail", "foo");
      await textbox.enterData("currentAddress", userData.currentAddress);
      await textbox.enterData("permanentAddress", userData.permanentAddress);
      await textbox.submitForm();
    });

    await test.step("Step 2: Verify The Form", async () => {
      await textbox.verifyInputBorder("userEmail", textbox.errorBorderCss);
    });
  });
});
