import { test } from "../../fixtures/pages-fixture.ts";
import { dynamicText } from "../../app/modules/elements/support/data.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import { dynamicButtonsColor } from "../../app/modules/elements/support/classes.ts";

test.describe("Dynamic Properties Page Tests", () => {
  test.beforeEach(async ({ dynamicPage }) => {
    await dynamicPage.visit();
  });

  test("@smoke The Page Should Have All The Expected Elements", async ({
    dynamicPage,
  }) => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await dynamicPage.heading.hasText(
        dynamicPage.mainHeading(),
        headings.dynamic
      );
      await dynamicPage.text.isVisible(dynamicPage.text.getByText(dynamicText));
    });

    await test.step("Step 2: Check The Disabled Button", async () => {
      await dynamicPage.button.isEnabled(dynamicPage.disabledButton, false);
      await dynamicPage.button.hasCSS(dynamicPage.changeColorButton, {
        property: "color",
        value: dynamicButtonsColor.before,
      });
      await dynamicPage.wait(5000);
      await dynamicPage.button.isEnabled(dynamicPage.disabledButton);
      await dynamicPage.button.hasCSS(dynamicPage.changeColorButton, {
        property: "color",
        value: dynamicButtonsColor.after,
      });
    });
  });

  test("@smoke Validate The Invisible Button", async ({ dynamicPage }) => {
    await test.step("Step 1: Check The Invisible Button", async () => {
      await dynamicPage.invisibleButton.waitFor();
      await dynamicPage.button.isVisible(dynamicPage.invisibleButton);
    });
  });
});
