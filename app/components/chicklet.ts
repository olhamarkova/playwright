import { Locator, Page, expect } from "@playwright/test";
import { Clickable, Textual } from "./support/interfaces/interfaces";
import { Component } from "./core/component";
import { TextOptions } from "./support/types/OptionsTypes";

export class Chicklet extends Component implements Clickable, Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }

  async hasText(
    element: Locator,
    text: string | string[],
    options?: TextOptions
  ): Promise<void> {
    await expect(element).toHaveText(text, options);
  }
}
