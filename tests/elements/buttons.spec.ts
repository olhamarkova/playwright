import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  successMessages,
} from "../../pages/elements/elementsData.ts";
import { ButtonsPage } from "../../pages/elements/pages/ButtonsPage.ts";

let buttonsPage: ButtonsPage;

test.beforeEach(async ({ page }) => {
  buttonsPage = new ButtonsPage(page, subCategoriesUrls.elements.buttons);
  await buttonsPage.visit();
});

test.describe("Buttons Page Tests", () => {
  test("@smoke The Buttons Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await buttonsPage.validateHeading(headings.buttons);
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await buttonsPage.validateElementsVisibility(buttonsPage.buttons);
    });
  });

  test("@functional User Shall Have The Ability To Click The Buttons", async () => {
    await test.step("Step 1: Click The 'Double Click Me' button", async () => {
      await buttonsPage.dbClickButton.dblclick();
      await buttonsPage.validateTextElement(successMessages.doubleClick);
    });

    await test.step("Step 2: Click The 'Right Click Me' button", async () => {
      await buttonsPage.rightClickButton.click({ button: "right" });
      await buttonsPage.validateTextElement(successMessages.rightClick);
    });

    await test.step("Step 3: Click The 'Click Me' button", async () => {
      await buttonsPage.clickMeButton.click();
      await buttonsPage.validateTextElement(successMessages.dynamicClick);
    });
  });
});
