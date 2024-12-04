import { test } from "../../fixtures/pages-fixture.ts";
import {
  textBoxPlaceholders,
  userData,
} from "../../app/modules/elements/support/data.ts";
import { headings } from "../../app/modules/core/support/data.ts";

test.describe("Text Box Page Tests", () => {
  test.beforeEach(async ({ textBoxPage }) => {
    await textBoxPage.visit();
  });

  test("@smoke The TextBox Page Should Have All The Expected Elements", async ({
    textBoxPage,
  }) => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await textBoxPage.heading.hasText(
        textBoxPage.mainHeading(),
        headings.textBox
      );
    });

    await test.step("Step 2: Check The Form", async () => {
      await textBoxPage.input.isEmpty(textBoxPage.fullNameInput);
      await textBoxPage.input.hasPlaceholder(
        textBoxPage.fullNameInput,
        textBoxPlaceholders.fullName
      );
      await textBoxPage.input.isEmpty(textBoxPage.emailInput);
      await textBoxPage.input.hasPlaceholder(
        textBoxPage.emailInput,
        textBoxPlaceholders.email
      );
      await textBoxPage.input.isEmpty(textBoxPage.currentAddressInput);
      await textBoxPage.input.hasPlaceholder(
        textBoxPage.currentAddressInput,
        textBoxPlaceholders.currentAddress
      );
      await textBoxPage.input.isEmpty(textBoxPage.permanentAddress);
      await textBoxPage.textBox.isVisible(textBoxPage.submitButton);
    });
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async ({
    textBoxPage,
  }) => {
    await test.step("Step 1: Fill The Full Name Input", async () => {
      await textBoxPage.input.fillOut(
        textBoxPage.fullNameInput,
        userData.fullName
      );
      await textBoxPage.input.hasValue(
        textBoxPage.fullNameInput,
        userData.fullName
      );
    });

    await test.step("Step 2: Fill The Email Input", async () => {
      await textBoxPage.input.fillOut(textBoxPage.emailInput, userData.email);
      await textBoxPage.input.hasValue(textBoxPage.emailInput, userData.email);
    });

    await test.step("Step 3: Fill The Current Address Input", async () => {
      await textBoxPage.input.fillOut(
        textBoxPage.currentAddressInput,
        userData.currentAddress
      );
      await textBoxPage.input.hasValue(
        textBoxPage.currentAddressInput,
        userData.currentAddress
      );
    });

    await test.step("Step 4: Fill The Permanent Address Input", async () => {
      await textBoxPage.input.fillOut(
        textBoxPage.permanentAddress,
        userData.permanentAddress
      );
      await textBoxPage.input.hasValue(
        textBoxPage.permanentAddress,
        userData.permanentAddress
      );
    });

    await test.step("Step 5: Submit The Form", async () => {
      await textBoxPage.button.click(textBoxPage.submitButton);
      await textBoxPage.textBox.isVisible(textBoxPage.output);
      await textBoxPage.validateUserInfoOutput("name", userData.fullName);
      await textBoxPage.validateUserInfoOutput("email", userData.email);
      await textBoxPage.validateUserInfoOutput(
        "currentAddress",
        userData.currentAddress
      );
      await textBoxPage.validateUserInfoOutput(
        "permanentAddress",
        userData.permanentAddress
      );
    });
  });

  test("@negative User Shall See An Error When Submit The Form With Invalid Email", async ({
    textBoxPage,
  }) => {
    const inputBorderCss = {
      property: "border",
      value: textBoxPage.emailBorderCss,
    };
    await test.step("Step 1: Fill The Form", async () => {
      await textBoxPage.input.fillOut(
        textBoxPage.fullNameInput,
        userData.fullName
      );
      await textBoxPage.input.hasValue(
        textBoxPage.fullNameInput,
        userData.fullName
      );
      await textBoxPage.input.fillOut(textBoxPage.emailInput, "foo");
      await textBoxPage.input.hasValue(textBoxPage.emailInput, "foo");
      await textBoxPage.input.fillOut(
        textBoxPage.currentAddressInput,
        userData.currentAddress
      );
      await textBoxPage.input.hasValue(
        textBoxPage.currentAddressInput,
        userData.currentAddress
      );
      await textBoxPage.input.fillOut(
        textBoxPage.permanentAddress,
        userData.permanentAddress
      );
      await textBoxPage.input.hasValue(
        textBoxPage.permanentAddress,
        userData.permanentAddress
      );

      await test.step("Step 2: Submit The Form", async () => {
        await textBoxPage.button.click(textBoxPage.submitButton);
        await textBoxPage.textBox.hasCSS(
          textBoxPage.emailInput,
          inputBorderCss
        );
      });
    });
  });
});
