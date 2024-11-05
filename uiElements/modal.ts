import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { GetByRoleOptions } from "../utils/types/Options";

export class Modal extends UiElement {
  constructor(page: Page) {
    super(page);
  }

  getModal(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("dialog", options);
  }
}
