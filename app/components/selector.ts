import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";
import { GetByRoleOptions } from "./support/types/OptionsTypes";

export class Selector extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getByAriaLabel(ariaLabel: string): Locator {
    return this.page.locator(`select[aria-label='${ariaLabel}']`);
  }

  getByClass(className: string): Locator {
    return this.getLocator(`select[class=".${className}"]`);
  }

  getCombobox(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("combobox", options);
  }

  async chooseOption(element: Locator, option: string): Promise<void> {
    await element.selectOption(option);
  }
}
