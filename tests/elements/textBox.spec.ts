import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { TextBoxPage } from "../../pages/elements/TextBoxPage.ts";
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

test.describe("Elements Page Tests", () => {
  test("@smoke The TextBox Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    //qase.id(8);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await textBox.checkHeading(headings.textBox);
    });

    await test.step("Step 2: Check The Form", async () => {
      await textBox.checkEmptyInput(textBox.fullNameInput);
      await textBox.checkPlaceholder(
        textBox.fullNameInput,
        textBoxPlaceholders.fullName
      );
      await textBox.checkEmptyInput(textBox.emailInput);
      await textBox.checkPlaceholder(
        textBox.emailInput,
        textBoxPlaceholders.email
      );
      await textBox.checkEmptyInput(textBox.currentAddressInput);
      await textBox.checkPlaceholder(
        textBox.currentAddressInput,
        textBoxPlaceholders.currentAddress
      );
      await textBox.checkEmptyInput(textBox.permanentAddress);
      await textBox.checkElementVisibility(textBox.submitButton);
    });

    // await screenshot(page, test);
  });

  test("@functional User Shall Be Able To Fill The Form And See The Output", async ({
    page,
  }) => {
    //qase.id(9);
    qase.title(test.info().title);

    await test.step("Step 1: Fill The Full Name Input", async () => {
      await textBox.fillInput(textBox.fullNameInput, userData.fullName);
      await textBox.checkInputValue(textBox.fullNameInput, userData.fullName);
    });

    await test.step("Step 2: Fill The Email Input", async () => {
      await textBox.fillInput(textBox.emailInput, userData.email);
      await textBox.checkInputValue(textBox.emailInput, userData.email);
    });

    await test.step("Step 3: Fill The Current Address Input", async () => {
      await textBox.fillInput(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.checkInputValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
    });

    await test.step("Step 4: Fill The Permanent Address Input", async () => {
      await textBox.fillInput(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.checkInputValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );
    });

    await test.step("Step 5: Submit The Form", async () => {
      await textBox.clickButton(textBox.submitButton);
      await textBox.checkElementVisibility(textBox.output);
      await textBox.checkUserInfoOutput("name", userData.fullName);
      await textBox.checkUserInfoOutput("email", userData.email);
      await textBox.checkUserInfoOutput(
        "currentAddress",
        userData.currentAddress
      );
      await textBox.checkUserInfoOutput(
        "permanentAddress",
        userData.permanentAddress
      );
    });

    // await screenshot(page, test);
  });
});
