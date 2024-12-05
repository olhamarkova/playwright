import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import {
  alertMessage,
  resultMessage,
} from "../../app/modules/alerts-and-frames/support/data.ts";

test.describe("Handling Alerts", async () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page", async ({
    alertsPage,
  }) => {
    test.step("Step 1: The Page Should Have The Correct Heading", async () => {
      await alertsPage.heading.hasText(
        alertsPage.mainHeading(),
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
    await alertsPage.confirmAlert(
      alertsPage.clickMeButton("alert"),
      alertMessage.alert
    );
  });

  test("@functional User Shall See An Alert In 5 Seconds", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmDelayedAlert(
      alertsPage.clickMeButton("timerAlert"),
      alertMessage.delayedAlert
    );
  });

  test("@functional User Shall Dismiss An Alert", async ({ alertsPage }) => {
    await alertsPage.dismsissAlert(
      alertsPage.clickMeButton("confirm"),
      alertMessage.confirmAlert
    );
    await alertsPage.text.hasText(
      alertsPage.resultMessage("confirm"),
      resultMessage.confirm("Cancel")
    );
  });

  test("@functional User Shall Be Able To See A Prompt Box", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmAlert(
      alertsPage.clickMeButton("promt"),
      alertMessage.prompt,
      "something"
    );
    await alertsPage.text.hasText(
      alertsPage.resultMessage("prompt"),
      resultMessage.prompt
    );
  });
});
