import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Textual } from "../utils/interfaces/textual";
import { TextOptions } from "./support/types/OptionsTypes";

export class Text extends UiElement implements Textual {
  constructor(page: Page) {
    super(page);
  }

  async hasText(
    element: Locator | string,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }

  async containText(
    element: Locator | string,
    text: string,
    options?: TextOptions
  ): Promise<void> {
    await expect(element as Locator).toContainText(text, options);
  }
}
