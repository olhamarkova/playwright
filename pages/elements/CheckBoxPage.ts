import { expect, type Locator, type Page } from "@playwright/test";
import { InnerPage } from "../core/InnerPage";
import { CheckboxLabels } from "./ElementsTypes";

export class CheckBoxPage extends InnerPage {
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly toggleButtons: Locator;
  readonly checkboxLabels: Locator;
  readonly sheetIcons: Locator;
  readonly checkboxes: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.expandAllButton = this.page.getByLabel("Expand all");
    this.collapseAllButton = this.page.getByLabel("Collapse all");
    this.toggleButtons = this.page.locator('button[title="Toggle"]');
    this.checkboxLabels = this.page.locator('span[class="rct-title"]');
    this.sheetIcons = this.page.locator("svg.rct-icon-leaf-close");
    this.checkboxes = this.page.locator("input[type='checkbox']");
  }

  toggleButton(index: number) {
    return this.toggleButtons.nth(index - 1);
  }

  checkboxLabel(text: string) {
    return this.checkboxLabels.filter({ hasText: text });
  }

  folderIcons(className: "open" | "close") {
    return this.page.locator(`svg.rct-icon-parent-${className}`);
  }

  folderIcon(className: "open" | "close", index: number) {
    return this.folderIcons(className).nth(index - 1);
  }

  sheetIcon(index: number) {
    return this.sheetIcons.nth(index - 1);
  }

  checkbox(category: CheckboxLabels) {
    return this.page.locator(`#tree-node-${category}`);
  }

  async validateCheckbox(
    category: CheckboxLabels,
    toBeChecked: boolean = false
  ) {
    if (!toBeChecked) {
      await expect(this.checkbox(category)).not.toBeChecked();
    } else {
      await expect(this.checkbox(category)).toBeChecked();
    }
  }
}
