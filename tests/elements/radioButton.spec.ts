import { test } from "@playwright/test";
import { qase } from "playwright-qase-reporter";
import { screenshot } from "../../utils/screenshot.ts";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  questionText,
} from "../../pages/elements/elementsData.ts";
import { RadioButtonPage } from "../../pages/elements/pages/RadioButtonPage.ts";

let radioButtonPage: RadioButtonPage;

test.beforeEach(async ({ page }) => {
  radioButtonPage = new RadioButtonPage(
    page,
    subCategoriesUrls.elements.radioButton
  );
  await radioButtonPage.visit();
});

test.describe("Radio Buttons Page Tests", () => {
  test("@smoke The Radio Button Page Should Have All The Expected Elements", async ({
    page,
  }) => {
    qase.id(12);
    qase.title(test.info().title);

    await test.step("Step 1: Check The Page Heading", async () => {
      await radioButtonPage.validateHeading(headings.radioButton);
    });

    await test.step("Step 2: Check The Question", async () => {
      await radioButtonPage.validateTextElement(questionText);
    });

    await test.step("Step 3: Check The Buttons", async () => {
      await radioButtonPage.validateElementsVisibility(
        radioButtonPage.radioButtons
      );
      await radioButtonPage.validateDisabledElement("no");
      await radioButtonPage.validateEnabledRadioBtns();
    });

    await screenshot(page, test);
  });

  test("@functional The User Shall Be Able To Choose Any Option", async () => {
    qase.id(16);
    qase.title(test.info().title);

    await test.step("Step 1: Choose 'Yes'", async () => {
      await radioButtonPage.clickButton(radioButtonPage.labelForRadio("Yes"));
      await radioButtonPage.validateSuccessMessage("Yes");
    });

    await test.step("Step 2: Choose 'Impressive'", async () => {
      await radioButtonPage.clickButton(
        radioButtonPage.labelForRadio("Impressive")
      );
      await radioButtonPage.validateSuccessMessage("Impressive");
    });
  });
});
