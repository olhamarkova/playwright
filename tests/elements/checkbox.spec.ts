import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import { CheckboxLabels } from "../../app/modules/elements/support/types.ts";
import { halfCheckedBox } from "../../app/modules/elements/support/classes.ts";

test.describe("Checkbox Page Tests", () => {
  test.beforeEach(async ({ checkboxPage }) => {
    await checkboxPage.visit();
  });

  test("@smoke The Checkbox Page Should Have All The Expected Elements", async ({
    checkboxPage,
  }) => {
    await test.step("Step 1: Check The Page Heading", async () => {
      await checkboxPage.heading.hasText(
        checkboxPage.mainHeading(),
        headings.checkbox
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await checkboxPage.button.isVisible(checkboxPage.expandButton("Expand"));
      await checkboxPage.button.isVisible(
        checkboxPage.expandButton("Collapse")
      );
      await checkboxPage.button.isVisible(checkboxPage.toggleButton(1));
    });

    await test.step("Step 3: Check The Categories List", async () => {
      await checkboxPage.checkbox.hasCount(checkboxPage.checkboxes, 1);
      await checkboxPage.checkbox.isVisible(
        checkboxPage.checkboxLabel(CheckboxLabels.Home)
      );
      await checkboxPage.checkbox.isChecked(
        checkboxPage.getCheckbox(CheckboxLabels.Home),
        false
      );
    });
  });

  test("@functional User Shall Be Able To Open And Close The List By Clicking On Buttons", async ({
    checkboxPage,
  }) => {
    await test.step("Step 1: Expand All Categories", async () => {
      await checkboxPage.button.click(checkboxPage.expandButton("Expand"));
      await checkboxPage.checkbox.hasCount(checkboxPage.checkboxes, 17);
      await checkboxPage.areChecked(false);
    });

    await test.step("Step 2: Collapse All Categories", async () => {
      await checkboxPage.button.click(checkboxPage.expandButton("Collapse"));
      await checkboxPage.checkbox.hasCount(checkboxPage.checkboxes, 1);
      await checkboxPage.checkbox.isVisible(
        checkboxPage.getCheckbox(CheckboxLabels.Home)
      );
    });
  });

  test("@functional User Shall Be Able To Check And Uncheck All The Categories", async ({
    checkboxPage,
  }) => {
    await test.step("Step 1: Check All Categories", async () => {
      await checkboxPage.check(CheckboxLabels.Home);
      await checkboxPage.button.click(checkboxPage.expandButton("Expand"));
      await checkboxPage.areChecked();
    });

    await test.step("Step 2: Uncheck All Categories", async () => {
      await checkboxPage.check(CheckboxLabels.Home);
      await checkboxPage.areChecked(false);
    });
  });

  test("@functional User Shall Be Able To Check And Uncheck One Category", async ({
    checkboxPage,
  }) => {
    await test.step("Step 1: Find The Angular Category", async () => {
      await checkboxPage.button.click(checkboxPage.toggleButton(1));
      await checkboxPage.button.click(checkboxPage.toggleButton(3));
      await checkboxPage.button.click(checkboxPage.toggleButton(4));
      await checkboxPage.checkbox.isVisible(
        checkboxPage.checkboxLabel(CheckboxLabels.Angular)
      );
    });

    await test.step("Step 2: Check The Angular Category", async () => {
      await checkboxPage.check(CheckboxLabels.Angular);
      await checkboxPage.checkbox.isChecked(
        checkboxPage.getCheckbox(CheckboxLabels.Angular),
        true
      );
      const parentCategories = [
        CheckboxLabels.Workspace,
        CheckboxLabels.Documents,
        CheckboxLabels.Home,
      ];
      for (let i = 0; i < parentCategories.length; i++) {
        await checkboxPage.checkbox.hasClass(
          checkboxPage.getCheckbox(parentCategories[i]),
          halfCheckedBox
        );
      }
    });

    await test.step("Step 3: Uncheck The Angular Category", async () => {
      await checkboxPage.check(CheckboxLabels.Angular);
      await checkboxPage.checkbox.isChecked(
        checkboxPage.getCheckbox(CheckboxLabels.Angular),
        false
      );
      await checkboxPage.areChecked(false);
    });
  });
});
