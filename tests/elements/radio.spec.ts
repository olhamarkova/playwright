import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Radio Buttons Page Tests", () => {
  test.beforeEach(async ({ app: { radio }, heading }) => {
    await radio.visit();
    await radio.verifyHeading(heading.radioButton);
  });

  test("@smoke The Radio Button Page Should Have All The Expected Elements", async ({
    app: { radio },
  }) => {
    await test.step("Step 1: Verify The Question", async () => {
      await radio.verifyQuestion();
    });

    await test.step("Step 2: Verify The Buttons", async () => {
      await radio.verifyDisabledRadio();
      await radio.verifyEnabledRadios();
    });
  });

  test("@functional The User Shall Be Able To Choose Any Option", async ({
    app: { radio },
  }) => {
    await test.step("Step 1: Choose 'Yes'", async () => {
      await radio.checkRadio("Yes");
      await radio.verifySuccessMessage("Yes");
    });

    await test.step("Step 2: Choose 'Impressive'", async () => {
      await radio.checkRadio("Impressive");
      await radio.verifySuccessMessage("Impressive");
    });
  });
});
