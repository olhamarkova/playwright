import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Alerts", async () => {
  test.beforeEach(async ({ app: { alerts }, heading }) => {
    await alerts.visit();
    await alerts.verifyHeading(heading.alerts);
  });

  test("@functional User Shall Be Able To Handle An Alert", async ({
    app: { alerts },
  }) => {
    await alerts.confirmAlertMsg();
  });

  test("@functional User Shall See An Alert In 5 Seconds", async ({
    app: { alerts },
  }) => {
    await alerts.confirmDelayed();
  });

  test("@functional User Shall Dismiss An Alert", async ({
    app: { alerts },
  }) => {
    await alerts.dismissAlertMsg();
    await alerts.verifyConfirmResult("Cancel");
  });

  test("@functional User Shall Be Able To See A Prompt Box", async ({
    app: { alerts },
  }) => {
    const prompt = "something";
    await alerts.confirmPromptBox(prompt);
    await alerts.verifyPromptResult(prompt);
  });
});
