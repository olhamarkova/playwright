import { Locator, Page, expect } from "@playwright/test";
import { Clickable } from "./support/interfaces/clickable";
import { UiElement } from "./uiElement";
import { TextOptions } from "./support/types/OptionsTypes";

export class Chicklet extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  async hasText(
    element: Locator,
    text: string | string[],
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }
}
