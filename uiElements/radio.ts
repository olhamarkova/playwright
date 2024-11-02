import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { GetByRoleOptions } from "../utils/types/Options";

export class Radio extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getRadio(options?: GetByRoleOptions) {
    return this.page.getByRole("radio", options);
  }

  getRadioByIndex(index: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("radio", options).nth(index - 1);
  }

  async clickRadio(
    element: Locator,
    label?: string,
    options?: {}
  ): Promise<void> {
    if (label) {
      await this.getByLabel(label).click(options);
    } else {
      await element.click(options);
    }
  }
}
