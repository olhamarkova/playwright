import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Radio extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getRadio(index: number, options?: {}): Locator {
    return this.page.getByRole("radio", options).nth(index - 1);
  }

  async clickElement(
    element: Locator,
    label?: string,
    options?: {}
  ): Promise<void> {
    if (label) {
      await this.getByLabel(label).click(options);
    } else {
      await element.click(options);
    }
  }
}
