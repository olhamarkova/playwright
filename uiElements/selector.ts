import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";
import { GetByRoleOptions } from "../utils/types/Options";

export class Selector extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getByAriaLabel(ariaLabel: string): Locator {
    return this.page.locator(`select[aria-label='${ariaLabel}']`);
  }

  getCombobox(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("combobox", options);
  }

  async chooseOption(element: Locator, option: string): Promise<void> {
    await element.selectOption(option);
  }
}
