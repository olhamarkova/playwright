import { test } from "@playwright/test";
import { TextBoxPage } from "../../app/modules/elementsPages/pages/TextBoxPage.ts";
import { subCategoriesUrls } from "../../app/modules/core/support/data.ts";
import {
  elementPagesHeadings as headings,
  textBoxPlaceholders,
  userData,
} from "../../app/modules/elementsPages/support/data.ts";

let textBox: TextBoxPage;

test.beforeEach(async ({ page }) => {
  textBox = new TextBoxPage(page, subCategoriesUrls.elements.textBox);
  await textBox.visit();
});

test.describe("Text Box Page Tests", () => {
  test("@smoke The TextBox Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await textBox.heading.hasText(textBox.pageTitle("h1"), headings.textBox);
    });

    await test.step("Step 2: Check The Form", async () => {
      await textBox.input.isEmpty(textBox.fullNameInput);
      await textBox.input.hasPlaceholder(
        textBox.fullNameInput,
        textBoxPlaceholders.fullName
      );
      await textBox.input.isEmpty(textBox.emailInput);
      await textBox.input.hasPlaceholder(
        textBox.emailInput,
        textBoxPlaceholders.email
      );
      await textBox.input.isEmpty(textBox.currentAddressInput);
      await textBox.input.hasPlaceholder(
        textBox.currentAddressInput,
        textBoxPlaceholders.currentAddress
      );
      await textBox.input.isEmpty(textBox.permanentAddress);
      await textBox.textBox.isElementVisible(textBox.submitButton);
    });
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async () => {
    await test.step("Step 1: Fill The Full Name Input", async () => {
      await textBox.input.fillOut(textBox.fullNameInput, userData.fullName);
      await textBox.input.hasValue(textBox.fullNameInput, userData.fullName);
    });

    await test.step("Step 2: Fill The Email Input", async () => {
      await textBox.input.fillOut(textBox.emailInput, userData.email);
      await textBox.input.hasValue(textBox.emailInput, userData.email);
    });

    await test.step("Step 3: Fill The Current Address Input", async () => {
      await textBox.input.fillOut(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.input.hasValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
    });

    await test.step("Step 4: Fill The Permanent Address Input", async () => {
      await textBox.input.fillOut(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.input.hasValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );
    });

    await test.step("Step 5: Submit The Form", async () => {
      await textBox.button.clickElement(textBox.submitButton);
      await textBox.textBox.isElementVisible(textBox.output);
      await textBox.validateUserInfoOutput("name", userData.fullName);
      await textBox.validateUserInfoOutput("email", userData.email);
      await textBox.validateUserInfoOutput(
        "currentAddress",
        userData.currentAddress
      );
      await textBox.validateUserInfoOutput(
        "permanentAddress",
        userData.permanentAddress
      );
    });
  });

  test("@negative User Shall See An Error When Submit The Form With Invalid Email", async () => {
    const inputBorderCss = {
      property: "border",
      value: textBox.emailBorderCss,
    };
    await test.step("Step 1: Fill The Form", async () => {
      await textBox.input.fillOut(textBox.fullNameInput, userData.fullName);
      await textBox.input.hasValue(textBox.fullNameInput, userData.fullName);
      await textBox.input.fillOut(textBox.emailInput, "foo");
      await textBox.input.hasValue(textBox.emailInput, "foo");
      await textBox.input.fillOut(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.input.hasValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.input.fillOut(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.input.hasValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );

      await test.step("Step 2: Submit The Form", async () => {
        await textBox.button.clickElement(textBox.submitButton);
        await textBox.textBox.hasCSS(textBox.emailInput, inputBorderCss);
      });
    });
  });
});
