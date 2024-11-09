import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";

export class Footer extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getFooter(): Locator {
    return this.getLocator("footer");
  }

  getCopyrightText(text: string): Locator {
    return this.getFooter().getByText(text);
  }
}
