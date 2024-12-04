import { test } from "../../fixtures/pagesFixture";
import { headings } from "../../app/modules/core/support/data.ts";
import {
  alertMessages,
  resultMessage,
} from "../../app/modules/alertsAndFrames/support/data";

test.describe.serial("Handling Alerts", async () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page", async ({
    alertsPage,
  }) => {
    test.step("Step 1: The Page Should Have The Correct Heading", async () => {
      await alertsPage.heading.hasText(
        alertsPage.pageTitle("h1"),
        headings.alerts
      );
    });

    test.step("Step 2: All Buttons Should Be Visible", async () => {
      await alertsPage.button.hasCount(alertsPage.buttons, 4);
    });
  });

  test("@functional User Shall Be Able To Handle An Alert", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmAlert(alertMessages.alert);
    await alertsPage.button.clickElement(alertsPage.clickMeButton("alert"));
  });

  test("@functional User Shall See An Alert In 5 Seconds", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmDelayedAlert(alertMessages.delayedAlert);
  });

  test("@functional User Shall Cancel An Alert", async ({ alertsPage }) => {
    await alertsPage.confirmAlert(alertMessages.confirmAlert, false);
    await alertsPage.button.clickElement(alertsPage.clickMeButton("confirm"));
    await alertsPage.text.hasText(
      alertsPage.resultMsg("confirmResult"),
      resultMessage.confirm("Cancel")
    );
  });

  test("@functional User Shall Be Able To See A Prompt Box", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmPromptBox(alertMessages.prompt);
    await alertsPage.button.clickElement(alertsPage.clickMeButton("promt"));
    await alertsPage.text.hasText(
      alertsPage.resultMsg("promptResult"),
      resultMessage.prompt
    );
  });
});
