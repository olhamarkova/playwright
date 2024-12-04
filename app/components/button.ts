import { Locator, Page, expect } from "@playwright/test";
import { Clickable } from "./support/interfaces/interfaces";
import { Component } from "./core/component";
import { TextOptions } from "./support/types/OptionsTypes";

export class Button extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getByName(name: string): Locator {
    return this.page.getByRole("button", { name: name, exact: true });
  }

  getByType(type: "submit" | "button"): Locator {
    return this.page.locator(`button[type="${type}"]`);
  }

  async hasText(
    element: Locator,
    text: string | string[],
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }
}
