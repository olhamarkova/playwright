import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { ClickOptions, GetByRoleOptions } from "../utils/types/Options";
import { Clickable } from "../utils/interfaces/clickable";

export class Radio extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getRadio(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("radio", options);
  }

  getRadioByIndex(index: number, options?: GetByRoleOptions): Locator {
    return this.page.getByRole("radio", options).nth(index - 1);
  }

  async clickRadioLabel(label: string, options?: ClickOptions): Promise<void> {
    await this.getByLabel(label).click(options);
  }
}
