import { expect, test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { TextBoxPage } from "../../pages/elements/pages/TextBoxPage.ts";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  textBoxPlaceholders,
  userData,
} from "../../pages/elements/elementsData.ts";

let textBox: TextBoxPage;

test.beforeEach(async ({ page }) => {
  textBox = new TextBoxPage(page, subCategoriesUrls.elements.textBox);
  await textBox.visit();
});

test.describe("Text Box Page Tests", () => {
  test("@smoke The TextBox Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    qase.id(14);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await textBox.validateHeading(headings.textBox);
    });

    await test.step("Step 2: Check The Form", async () => {
      await textBox.validateEmptyInput(textBox.fullNameInput);
      await textBox.validatePlaceholder(
        textBox.fullNameInput,
        textBoxPlaceholders.fullName
      );
      await textBox.validateEmptyInput(textBox.emailInput);
      await textBox.validatePlaceholder(
        textBox.emailInput,
        textBoxPlaceholders.email
      );
      await textBox.validateEmptyInput(textBox.currentAddressInput);
      await textBox.validatePlaceholder(
        textBox.currentAddressInput,
        textBoxPlaceholders.currentAddress
      );
      await textBox.validateEmptyInput(textBox.permanentAddress);
      await textBox.validateElementVisibility(textBox.submitButton);
    });

    await screenshot(page, test);
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async () => {
    qase.id(15);
    qase.title(test.info().title);

    await test.step("Step 1: Fill The Full Name Input", async () => {
      await textBox.fillInput(textBox.fullNameInput, userData.fullName);
      await textBox.validateInputValue(
        textBox.fullNameInput,
        userData.fullName
      );
    });

    await test.step("Step 2: Fill The Email Input", async () => {
      await textBox.fillInput(textBox.emailInput, userData.email);
      await textBox.validateInputValue(textBox.emailInput, userData.email);
    });

    await test.step("Step 3: Fill The Current Address Input", async () => {
      await textBox.fillInput(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.validateInputValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
    });

    await test.step("Step 4: Fill The Permanent Address Input", async () => {
      await textBox.fillInput(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.validateInputValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );
    });

    await test.step("Step 5: Submit The Form", async () => {
      await textBox.clickButton(textBox.submitButton);
      await textBox.validateElementVisibility(textBox.output);
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
    qase.id(17);
    qase.title(test.info().title);

    await test.step("Step 1: Fill The Form", async () => {
      await textBox.fillInput(textBox.fullNameInput, userData.fullName);
      await textBox.validateInputValue(
        textBox.fullNameInput,
        userData.fullName
      );
      await textBox.fillInput(textBox.emailInput, "foo");
      await textBox.validateInputValue(textBox.emailInput, "foo");
      await textBox.fillInput(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.validateInputValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.fillInput(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.validateInputValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );

      await test.step("Step 2: Submit The Form", async () => {
        await textBox.clickButton(textBox.submitButton);
        await expect(textBox.emailInput).toHaveCSS(
          "border",
          textBox.emailBorderCss
        );
      });
    });
  });
});
