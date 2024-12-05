import { expect, type Locator, type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import {
  Button,
  Checkbox,
} from "../../../components/support/component-service";
import { CheckboxLabels } from "../../elements/support/types";

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
    return this.button.getByTitle("Toggle", true).nth(index - 1);
  }

  checkboxLabel(category: CheckboxLabels): Locator {
    return this.checkbox.getByLocator("label").filter({ hasText: category });
  }

  getCheckbox(category: CheckboxLabels): Locator {
    return this.checkboxLabel(category).locator("svg").nth(0);
  }

  async check(category: CheckboxLabels): Promise<void> {
    await this.checkbox.click(this.checkboxLabel(category));
  }

  async areChecked(checked: boolean = true): Promise<void> {
    for (let i = 0; i < (await this.checkboxes.count()); i++)
      checked
        ? await expect(this.checkboxes.nth(i)).toBeChecked()
        : await expect(this.checkboxes.nth(i)).not.toBeChecked();
  }
}
