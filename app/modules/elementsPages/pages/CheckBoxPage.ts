import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Button, Checkbox } from "../../../components/support/uiService";
import { CheckboxLabels } from "../../elementsPages/support/types";

export class CheckBoxPage extends BasePage {
  readonly button: Button;
  readonly checkbox: Checkbox;
  readonly checkboxes: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.checkbox = new Checkbox(this.page);

    this.checkboxes = this.checkbox.getByType();
  }

  expandButton(buttonName: "Expand" | "Collapse"): Locator {
    return this.button.getByLabel(`${buttonName} all`);
  }

  toggleButton(index: number): Locator {
    return this.button.getElByTitle("Toggle", true).nth(index - 1);
  }

  checkboxLabel(category: CheckboxLabels): Locator {
    return this.checkbox.getLocator("label").filter({ hasText: category });
  }

  getCheckbox(category: CheckboxLabels): Locator {
    return this.checkboxLabel(category).locator("svg").nth(0);
  }

  async check(category: CheckboxLabels): Promise<void> {
    await this.checkbox.clickElement(this.checkboxLabel(category));
  }

  async validateAllCheckboxes(toBeChecked: boolean = false): Promise<void> {
    const checkboxes = this.checkbox.getByType();
    for (let i = 0; i < (await checkboxes.count()); i++)
      if (!toBeChecked) {
        await expect(checkboxes.nth(i)).not.toBeChecked();
      } else {
        await expect(checkboxes.nth(i)).toBeChecked();
      }
  }
}
