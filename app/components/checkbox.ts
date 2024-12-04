import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Checkable } from "./support/interfaces/checkable";
import {
  CheckOptions,
  GetByRoleOptions,
  GetLocatorOptions,
} from "./support/types/OptionsTypes";

export class Checkbox extends Component implements Checkable {
  constructor(page: Page) {
    super(page);
  }

  getByType(options?: GetLocatorOptions): Locator {
    return this.page.locator("input[type='checkbox']", options);
  }

  getCheckbox(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("checkbox", options);
  }

  async check(
    element: Locator | string,
    options?: CheckOptions
  ): Promise<void> {
    await (element as Locator).check(options);
  }

  async uncheck(
    element: Locator | string,
    options?: CheckOptions
  ): Promise<void> {
    await (element as Locator).uncheck(options);
  }

  async isChecked(
    element: Locator | string,
    isChecked: boolean
  ): Promise<void> {
    if (!isChecked) {
      await expect(element as Locator).not.toBeChecked();
    } else {
      await expect(element as Locator).toBeChecked();
    }
  }
}
