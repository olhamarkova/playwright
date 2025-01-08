import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { ClickOptions, GetByRoleOptions } from "./support/types/options";
import { Clickable } from "./support/interfaces/interfaces";

export class Radio extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  radio(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("radio", options);
  }

  async clickRadioLabel(label: string, options?: ClickOptions): Promise<void> {
    await this.getByLabel(label).click(options);
  }
}
