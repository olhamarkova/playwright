import { Locator, Page, expect } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Textual } from "../utils/interfaces/textual";

export class Footer extends UiElement implements Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }

  async hasText(element: Locator, text: string, options?: {}): Promise<void> {
    await expect(element).toHaveText(text, options);
  }
}
