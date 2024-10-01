import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../utils/services/dataService.ts";
import {
  elementPagesHeadings as headings,
  successMessages,
} from "../../data/elementsData.ts";
import { ButtonsPage } from "../../pages/elementsPages/pages/ButtonsPage.ts";

let buttonsPage: ButtonsPage;

test.beforeEach(async ({ page }) => {
  buttonsPage = new ButtonsPage(page, subCategoriesUrls.elements.buttons);
  await buttonsPage.visit();
});

test.describe("Buttons Page Tests", () => {
  test("@smoke The Buttons Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await buttonsPage.heading.hasText(
        buttonsPage.pageTitle("h1"),
        headings.buttons
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await buttonsPage.validateElementsVisibility(buttonsPage.buttons);
    });
  });

  test("@functional User Shall Have The Ability To Click The Buttons", async () => {
    await test.step("Step 1: Click The 'Double Click Me' button", async () => {
      await buttonsPage.button.dbClick(buttonsPage.dbClickButton);
      await buttonsPage.textMessage.isElVisible(
        buttonsPage.successMsg(successMessages.doubleClick)
      );
    });

    await test.step("Step 2: Click The 'Right Click Me' button", async () => {
      await buttonsPage.button.clickElement(buttonsPage.rightClickButton, {
        button: "right",
      });
      await buttonsPage.textMessage.isElVisible(
        buttonsPage.successMsg(successMessages.rightClick)
      );
    });

    await test.step("Step 3: Click The 'Click Me' button", async () => {
      await buttonsPage.button.clickElement(buttonsPage.clickMeButton);
      await buttonsPage.textMessage.isElVisible(
        buttonsPage.successMsg(successMessages.dynamicClick)
      );
    });
  });
});
