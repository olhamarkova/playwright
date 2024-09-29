import { Locator, Page, expect } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Header extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getHeader(): Locator {
    return this.getLocator("header");
  }

  getLogo(): Locator {
    return this.getHeader().getByRole("img");
  }

  async clickElement(element: Locator, options?: {}): Promise<void> {
    await element.click(options);
  }
}
