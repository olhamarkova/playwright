import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import { Folders } from "../../app/modules/elements/support/types.ts";

test.describe("Checkbox Page Tests", () => {
  test.beforeEach(async ({ app: { checkboxes } }) => {
    await checkboxes.visit();
    await checkboxes.verifyHeading(headings.checkbox);
  });

  test("@smoke The Checkbox Page Should Have All The Expected Elements", async ({
    app: { checkboxes },
  }) => {
    await test.step("Step 1: Check The Buttons", async () => {
      await checkboxes.verifyButtonVisible("Expand");
      await checkboxes.verifyButtonVisible("Collapse");
    });

    await test.step("Step 2: Check The Categories List", async () => {
      await checkboxes.verifyCheckboxesCount(1);
      await checkboxes.verifyCheckboxVisible(Folders.Home);
      await checkboxes.verifyChecked(Folders.Home, false);
    });
  });

  test("@functional User Shall Be Able To Open And Close The List By Clicking On Buttons", async ({
    app: { checkboxes },
  }) => {
    await test.step("Step 1: Expand All Categories", async () => {
      await checkboxes.expandFolders();
      await checkboxes.verifyCheckboxesCount(17);
      await checkboxes.verifyAreChecked(false);
    });

    await test.step("Step 2: Collapse All Categories", async () => {
      await checkboxes.collapseFolders();
      await checkboxes.verifyCheckboxesCount(1);
      await checkboxes.verifyCheckboxVisible(Folders.Home);
    });
  });

  test("@functional User Shall Be Able To Check And Uncheck All The Categories", async ({
    app: { checkboxes },
  }) => {
    await test.step("Step 1: Check All Categories", async () => {
      await checkboxes.selectFolder(Folders.Home);
      await checkboxes.expandFolders();
      await checkboxes.verifyAreChecked();
    });

    await test.step("Step 2: Uncheck All Categories", async () => {
      await checkboxes.selectFolder(Folders.Home);
      await checkboxes.verifyAreChecked(false);
    });
  });

  test("@functional User Shall Be Able To Check And Uncheck One Category", async ({
    app: { checkboxes },
  }) => {
    await test.step("Step 1: Find The Angular Category", async () => {
      await checkboxes.clickToggle("Home");
      await checkboxes.clickToggle("Documents");
      await checkboxes.clickToggle("WorkSpace");
      await checkboxes.verifyCheckboxVisible(Folders.Angular);
    });

    await test.step("Step 2: Check The Angular Category", async () => {
      await checkboxes.selectFolder(Folders.Angular);
      await checkboxes.verifyChecked(Folders.Angular);
      await checkboxes.verifyHalfChecked();
    });

    await test.step("Step 3: Uncheck The Angular Category", async () => {
      await checkboxes.selectFolder(Folders.Angular);
      await checkboxes.verifyChecked(Folders.Angular, false);
      await checkboxes.verifyAreChecked(false);
    });
  });
});
