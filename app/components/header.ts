import { Locator, Page } from "@playwright/test";
import { UiElement } from "./core/component";
import { Clickable } from "./support/interfaces/clickable";

export class Header extends UiElement implements Clickable {
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
