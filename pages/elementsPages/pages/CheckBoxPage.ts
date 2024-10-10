import { expect, type Locator, type Page } from "@playwright/test";
import { CheckboxLabels } from "../../../utils/types/ElementsTypes";
import BasePage from "../../core/BasePage";
import { Button } from "../../../uiElements/button";
import { Checkbox } from "../../../uiElements/checkbox";
import { Image } from "../../../uiElements/image";

export class CheckBoxPage extends BasePage {
  readonly checkboxLabels: Locator;
  //readonly sheetIcons: Locator;
  readonly icon: Image;
  readonly button: Button;
  readonly checkbox: Checkbox;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.checkbox = new Checkbox(this.page);
    this.icon = new Image(this.page);
  }

  toggleButtons() {
    return this.button.getElByTitle("Toggle");
  }

  expandButton(buttonName: "Expand" | "Collapse") {
    return this.button.getByLabel(`${buttonName} all`);
  }

  toggleButton(index: number) {
    return this.toggleButtons().nth(index - 1);
  }

  checkboxLabel(category: CheckboxLabels) {
    return this.checkbox.getLocator("label").filter({ hasText: category });
  }

  folderIcon(category: CheckboxLabels) {
    return this.checkboxLabel(category).locator("svg").nth(1);
  }

  folderIcons() {
    return this.icon.getLocator("label svg").nth(1);
  }

  sheetIcon(category: CheckboxLabels) {
    return this.icon.getByLabel(category).nth(1);
  }

  getCheckbox(category: CheckboxLabels) {
    return this.checkboxLabel(category).locator("svg").nth(0);
  }

  checkboxes() {
    return this.checkbox.getLocator("input[type='checkbox']");
  }

  async check(category: CheckboxLabels) {
    await this.checkbox.clickElement(this.checkboxLabel(category));
  }

  async validateAllCheckboxes(toBeChecked: boolean = false) {
    const checkboxes = this.checkboxes();
    for (let i = 0; i < (await checkboxes.count()); i++)
      if (!toBeChecked) {
        await expect(checkboxes.nth(i)).not.toBeChecked();
      } else {
        await expect(checkboxes.nth(i)).toBeChecked();
      }
  }
}
