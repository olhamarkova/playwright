import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Checkable } from "./support/interfaces/interfaces";
import { CheckOptions, GetLocatorOptions } from "./support/types/OptionsTypes";

export class Checkbox extends Component implements Checkable {
  constructor(page: Page) {
    super(page);
  }

  getByType(options?: GetLocatorOptions): Locator {
    return this.page.locator("input[type='checkbox']", options);
  }

  async check(element: Locator, options?: CheckOptions): Promise<void> {
    await element.check(options);
  }

  async uncheck(element: Locator, options?: CheckOptions): Promise<void> {
    await element.uncheck(options);
  }

  async isChecked(element: Locator, isChecked: boolean): Promise<void> {
    isChecked
      ? await expect(element).toBeChecked()
      : await expect(element).not.toBeChecked();
  }
}
