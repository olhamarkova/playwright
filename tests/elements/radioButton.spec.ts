import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../modules/core/support/data.ts";
import {
  elementPagesHeadings as headings,
  questionText,
} from "../../modules/elementsPages/support/data.ts";
import { RadioButtonPage } from "../../modules/elementsPages/pages/RadioButtonPage.ts";

let radioButtonPage: RadioButtonPage;

test.beforeEach(async ({ page }) => {
  radioButtonPage = new RadioButtonPage(
    page,
    subCategoriesUrls.elements.radioButton
  );
  await radioButtonPage.visit();
});

test.describe("Radio Buttons Page Tests", () => {
  test("@smoke The Radio Button Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await radioButtonPage.heading.hasText(
        radioButtonPage.heading.getHeading("h1"),
        headings.radioButton
      );
    });

    await test.step("Step 2: Check The Question", async () => {
      await radioButtonPage.textBox.hasText(
        radioButtonPage.question,
        questionText
      );
    });

    await test.step("Step 3: Check The Buttons", async () => {
      await radioButtonPage.radio.areElementsVisible(
        radioButtonPage.radioButtons
      );
      await radioButtonPage.radio.isElementEnabled(
        radioButtonPage.radioButton("no"),
        false
      );
      await radioButtonPage.validateEnabledRadioBtns();
    });
  });

  test("@functional The User Shall Be Able To Choose Any Option", async () => {
    await test.step("Step 1: Choose 'Yes'", async () => {
      await radioButtonPage.radio.clickElement(
        radioButtonPage.labelForRadio("Yes")
      );
      await radioButtonPage.validateSuccessMessage("Yes");
    });

    await test.step("Step 2: Choose 'Impressive'", async () => {
      await radioButtonPage.radio.clickElement(
        radioButtonPage.labelForRadio("Impressive")
      );
      await radioButtonPage.validateSuccessMessage("Impressive");
    });
  });
});
