import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";

export class Header extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getHeader(): Locator {
    return this.getLocator("header");
  }

  getLogo(): Locator {
    return this.getHeader().getByRole("img");
  }
}
