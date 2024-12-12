import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import {
  alertMessage,
  resultMessage,
} from "../../app/modules/alerts-and-iframes/support/data.ts";

test.describe("Handling Alerts", async () => {
  test.beforeEach(async ({ app: { alerts } }) => {
    await alerts.visit();
  });

  test("@smoke A User Should Land To The Correct Page", async ({
    app: { alerts },
  }) => {
    test.step("Step 1: The Page Should Have The Correct Heading", async () => {
      await alerts.heading.hasText(alerts.mainHeading(), headings.alerts);
    });

    test.step("Step 2: All Buttons Should Be Visible", async () => {
      await alerts.button.hasCount(alerts.buttons, 4);
    });
  });

  // test("@functional User Shall Be Able To Handle An Alert", async ({
  //   app: { alerts },
  // }) => {
  //   await alerts.confirmAlert(
  //     alerts.clickMeButton("alert"),
  //     alertMessage.alert
  //   );
  // });

  // test("@functional User Shall See An Alert In 5 Seconds", async ({
  //   app: { alerts },
  // }) => {
  //   await alerts.confirmDelayedAlert(
  //     alerts.clickMeButton("timerAlert"),
  //     alertMessage.delayedAlert
  //   );
  // });

  // test("@functional User Shall Dismiss An Alert", async ({
  //   app: { alerts },
  // }) => {
  //   await alerts.dismsissAlert(
  //     alerts.clickMeButton("confirm"),
  //     alertMessage.confirmAlert
  //   );
  //   await alerts.text.hasText(
  //     alerts.resultMessage("confirm"),
  //     resultMessage.confirm("Cancel")
  //   );
  // });

  // test("@functional User Shall Be Able To See A Prompt Box", async ({
  //   app: { alerts },
  // }) => {
  //   await alerts.confirmAlert(
  //     alerts.clickMeButton("promt"),
  //     alertMessage.prompt,
  //     "something"
  //   );
  //   await alerts.text.hasText(
  //     alerts.resultMessage("prompt"),
  //     resultMessage.prompt
  //   );
  // });
});
