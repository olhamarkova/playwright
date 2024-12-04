import { expect, Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Textual } from "./support/interfaces/interfaces";
import { TextOptions } from "./support/types/OptionsTypes";

export class Text extends Component implements Textual {
  constructor(page: Page) {
    super(page);
  }

  async hasText(
    element: Locator,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element).toHaveText(text, options);
  }

  async containText(
    element: Locator,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element).toContainText(text, options);
  }
}
