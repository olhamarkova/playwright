import { test, expect } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { ElementsPage } from "../../pages/elements/ElementsPage.ts";
import { TextBoxPage } from "../../pages/elements/TextBoxPage.ts";
import { screenshot } from "../../utils/screenshot.ts";
import {
  copyRightText,
  title,
  categoryUrls,
  subCategoriesUrls,
} from "../../utils/services/dataService.ts";
import {
  callToAction,
  elementPagesHeadings as headings,
  textBoxPlaceholders,
  userData,
} from "../../pages/elements/elementsData.ts";

let elements: ElementsPage;
let textBox: TextBoxPage;

test.beforeEach(async ({ page }) => {
  elements = new ElementsPage(page, categoryUrls.elements);
  textBox = new TextBoxPage(page, subCategoriesUrls.elements.textBox);
  await elements.visit();
});

test.describe("Elements Page Tests", () => {
  test("@smoke The Elements Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    //qase.id(7);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elements.checkTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have A Call To Action", async () => {
      await elements.checkTextElement(callToAction);
    });

    await test.step("Step 3: The Logo Should Be Visible", async () => {
      await elements.checkElementVisibility(elements.logo);
    });

    await test.step("Step 4: The Footer Be Visible And Contain Copyright Info", async () => {
      await elements.checkFooter(copyRightText);
    });

    // await screenshot(page, test);
  });

  test("@smoke The TextBox Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    //qase.id(8);
    qase.title(test.info().title);

    await test.step("Step 1: The Page Should Be Opened Through Sidebar", async () => {
      await elements.sidebar.goToPage("Text Box");
      await textBox.checkPageUrl(subCategoriesUrls.elements.textBox);
    });

    await test.step("Step 2: Check The Page Heading", async () => {
      await textBox.checkHeading(headings.textBox);
    });

    await test.step("Step 3: Check The Form", async () => {
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

    await test.step("Step 1: The Page Should Be Opened Through Sidebar", async () => {
      await elements.sidebar.goToPage("Text Box");
      await textBox.checkPageUrl(subCategoriesUrls.elements.textBox);
    });

    await test.step("Step 2: Fill The Full Name Input", async () => {
      await textBox.fillInput(textBox.fullNameInput, userData.fullName);
      await textBox.checkInputValue(textBox.fullNameInput, userData.fullName);
    });

    await test.step("Step 3: Fill The Email Input", async () => {
      await textBox.fillInput(textBox.emailInput, userData.email);
      await textBox.checkInputValue(textBox.emailInput, userData.email);
    });

    await test.step("Step 4: Fill The Current Address Input", async () => {
      await textBox.fillInput(
        textBox.currentAddressInput,
        userData.currentAddress
      );
      await textBox.checkInputValue(
        textBox.currentAddressInput,
        userData.currentAddress
      );
    });

    await test.step("Step 5: Fill The Permanent Address Input", async () => {
      await textBox.fillInput(
        textBox.permanentAddress,
        userData.permanentAddress
      );
      await textBox.checkInputValue(
        textBox.permanentAddress,
        userData.permanentAddress
      );
    });

    await test.step("Step 6: Submit The Form", async () => {
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
