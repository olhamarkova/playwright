import { expect, Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Textual } from "../utils/interfaces/textual";

export class Span extends UiElement implements Textual {
  constructor(page: Page) {
    super(page);
  }

  getByText(text: string, options?: {}): Locator {
    return this.page.getByText(text, options);
  }

  async hasText(
    element: Locator | string,
    text: string,
    options?: {}
  ): Promise<void> {
    await expect(element as Locator).toHaveText(text, options);
  }

  async containText(
    element: Locator | string,
    text: string,
    options: {}
  ): Promise<void> {
    await expect(element as Locator).toContainText(text, options);
  }
}
