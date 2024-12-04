import { test } from "../../fixtures/pagesFixture.ts";
import { title } from "../../app/modules/core/support/data.ts";
import { callToAction } from "../../app/modules/elementsPages/support/data.ts";

test.describe("Elements Page Tests", () => {
  test.beforeEach(async ({ elementsPage }) => {
    await elementsPage.visit();
  });

  test("@smoke User Shall Land To The Correct Page", async ({
    elementsPage,
  }) => {
    await test.step("Step 1: Check The Elements Page Title", async () => {
      await elementsPage.hasTitle(title.mainTitle);
    });

    await test.step("Step 2: The Page Should Have Call To Action", async () => {
      await elementsPage.text.isElementVisible(
        elementsPage.text.getByText(callToAction)
      );
    });
  });
});
