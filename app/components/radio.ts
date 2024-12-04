import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { ClickOptions, GetByRoleOptions } from "./support/types/OptionsTypes";
import { Clickable } from "./support/interfaces/interfaces";

export class Radio extends Component implements Clickable {
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
