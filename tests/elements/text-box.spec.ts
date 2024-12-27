import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Text Box Page Tests", () => {
  test.beforeEach(async ({ app: { textbox }, heading }) => {
    await textbox.visit();
    await textbox.verifyHeading(heading.textBox);
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async ({
    app: { textbox },
    person,
  }) => {
    const user = person
      .withFullName("John Doe")
      .withEmail("email@test.com")
      .withCurrentAdress("address")
      .withPermanentAddress("address2");
    const data = user.person;
    await test.step("Step 1: Fill Out The Form", async () => {
      await textbox.enterData("userName", data.fullName!);
      await textbox.enterData("userEmail", data.email!);
      await textbox.enterData("currentAddress", data.currentAddress!);
      await textbox.enterData("permanentAddress", data.permanentAddress!);
      await textbox.submitForm();
    });

    await test.step("Step 2: Verify the Output", async () => {
      await textbox.verifyOutput("name", data.fullName!);
      await textbox.verifyOutput("email", data.email!);
      await textbox.verifyOutput("currentAddress", data.currentAddress!);
      await textbox.verifyOutput("permanentAddress", data.permanentAddress!);
    });
  });

  test("@negative User Shall See An Error When Submit The Form With Invalid Email", async ({
    app: { textbox },
    person,
  }) => {
    const user = person
      .withFullName("John Doe")
      .withEmail("foo")
      .withCurrentAdress("address")
      .withPermanentAddress("address2");
    const data = user.person;
    await test.step("Step 1: Fill The Form", async () => {
      await textbox.enterData("userName", data.fullName!);
      await textbox.enterData("userEmail", data.email!);
      await textbox.enterData("currentAddress", data.currentAddress!);
      await textbox.enterData("permanentAddress", data.permanentAddress!);
      await textbox.submitForm();
    });

    await test.step("Step 2: Verify The Form", async () => {
      await textbox.verifyInputBorder("userEmail", textbox.errorBorderCss);
    });
  });
});
