import { expect, type Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";
import LeftPannel from "../leftPanel/LeftPannel";
import { CheckboxLabels } from "../elements/ElementsTypes";
import { Button } from "../../uiElements/button";

export class InnerPage extends BasePage {
  readonly sidebar: LeftPannel;
  readonly button: Button;

  constructor(page: Page, url: string) {
    super(page, url);
    this.sidebar = new LeftPannel(page);
    this.button = new Button(page);
  }

  async fillInput(
    input: Locator,
    value: string,
    pressSequentially: boolean = false
  ) {
    if (!pressSequentially) {
      await input.fill(value);
    } else {
      input.pressSequentially(value);
    }
  }

  async clearInput(input: Locator) {
    await input.clear();
  }

  async validateEmptyInput(input: Locator) {
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await expect(input).toBeEmpty();
  }

  async validatePlaceholder(input: Locator, placeholder: string) {
    await expect(input).toHaveAttribute("placeholder", placeholder);
  }

  async validateInputValue(input: Locator, value: string) {
    await expect(input).toHaveValue(value);
  }

  /**
   * Check/uncheck checkboxes
   */
  async check(checkbox: Locator | CheckboxLabels, check: boolean = true) {
    let checkboxElement = checkbox as Locator;
    if (!check) {
      await checkboxElement.uncheck();
    } else {
      await checkboxElement.check();
    }
  }

  async validateCheckbox(
    checkbox: Locator | CheckboxLabels,
    toBeChecked: boolean = false
  ) {
    if (!toBeChecked) {
      await expect(checkbox as Locator).not.toBeChecked();
    } else {
      await expect(checkbox as Locator).toBeChecked();
    }
  }

  async validateDisabledElement<T extends string | Locator>(element: T) {
    await expect(element as Locator).toBeDisabled();
  }

  async validateEnabledElement<T extends string | Locator>(element: T) {
    await expect(element as Locator).toBeEnabled();
  }
}
