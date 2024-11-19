import { Locator, Page, expect } from "@playwright/test";
import { Clickable } from "./support/interfaces/clickable";
import { Textual } from "./support/interfaces/textual";
import { UiElement } from "./core/component";
import { TextOptions } from "./support/types/OptionsTypes";

export class Chicklet extends UiElement implements Clickable, Partial<Textual> {
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
