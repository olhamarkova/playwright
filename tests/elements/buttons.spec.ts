import { test } from "../../fixtures/pagesFixture.ts";
import { successMessages } from "../../app/modules/elementsPages/support/data.ts";
import { headings } from "../../app/modules/core/support/data.ts";

test.describe("Buttons Page Tests", () => {
  test.beforeEach(async ({ buttonPage }) => {
    await buttonPage.visit();
  });
  test("@smoke The Buttons Page Should Have All The Expected Elements", async ({
    buttonPage,
  }) => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await buttonPage.heading.hasText(
        buttonPage.pageTitle("h1"),
        headings.buttons
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await buttonPage.button.areElementsVisible(buttonPage.buttons);
    });
  });

  test("@functional User Shall Have The Ability To Click The Buttons", async ({
    buttonPage,
  }) => {
    await test.step("Step 1: Click The 'Double Click Me' button", async () => {
      await buttonPage.button.dbClick(buttonPage.dbClickButton);
      await buttonPage.textMessage.isElementVisible(
        buttonPage.successMsg(successMessages.doubleClick)
      );
    });

    await test.step("Step 2: Click The 'Right Click Me' button", async () => {
      await buttonPage.button.clickElement(buttonPage.rightClickButton, {
        button: "right",
      });
      await buttonPage.textMessage.isElementVisible(
        buttonPage.successMsg(successMessages.rightClick)
      );
    });

    await test.step("Step 3: Click The 'Click Me' button", async () => {
      await buttonPage.button.clickElement(buttonPage.clickMeButton);
      await buttonPage.textMessage.isElementVisible(
        buttonPage.successMsg(successMessages.dynamicClick)
      );
    });
  });
});
