import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";

export class Modal extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getModal(options?: {}): Locator {
    return this.page.getByRole("dialog");
  }
}
