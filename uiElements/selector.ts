import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";

export class Selector extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getByAriaLabel(ariaLabel: string): Locator {
    return this.page.locator(`select[aria-label='${ariaLabel}']`);
  }
}
