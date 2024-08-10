import { expect, type Locator, type Page } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";
import { CheckboxLabels } from "../ElementsTypes";
import { categories } from "../../../data/categories";

export class CheckBoxPage extends InnerPage {
  readonly toggleButtons: Locator;
  readonly checkboxLabels: Locator;
  readonly sheetIcons: Locator;
  readonly checkboxes: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.toggleButtons = this.page.locator('button[title="Toggle"]');
    this.checkboxLabels = this.page.locator('span[class="rct-title"]');
    this.sheetIcons = this.page.locator("svg.rct-icon-leaf-close");
    this.checkboxes = this.page.locator("input[type='checkbox']");
  }

  button(buttonName: "Expand" | "Collapse") {
    return this.page.getByLabel(`${buttonName} all`);
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
    return this.page.locator(`label[for="tree-node-${category}"] svg`).nth(0);
  }

  async check(checkbox: Locator | CheckboxLabels, check: boolean = true) {
    let checkboxElement = this.checkbox(checkbox as CheckboxLabels);
    if (!check) {
      await checkboxElement.uncheck();
    } else {
      await checkboxElement.check();
    }
  }

  async validateAllCheckboxes(toBeChecked: boolean = false) {
    const checkboxes = this.checkboxes;
    for (let i = 0; i < (await checkboxes.count()); i++)
      if (!toBeChecked) {
        await expect(checkboxes.nth(i)).not.toBeChecked();
      } else {
        await expect(checkboxes.nth(i)).toBeChecked();
      }
  }

  async validateCheckbox(checkbox: CheckboxLabels, toBeChecked?: boolean) {
    let checkboxElement = this.checkbox(checkbox);
    if (!toBeChecked) {
      await expect(checkboxElement).not.toBeChecked();
    } else {
      await expect(checkboxElement).toBeChecked();
    }
  }

  async validateParentCategories(category: CheckboxLabels) {
    await expect(this.checkbox(category)).toHaveClass(
      "rct-icon rct-icon-half-check"
    );
  }
}
