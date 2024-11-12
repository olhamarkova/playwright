import { Locator, Page } from "@playwright/test";
import { Clickable } from "./support/interfaces/clickable";
import { UiElement } from "./uiElement";

export class Button extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getButton(name: string): Locator {
    return this.page.getByRole("button", { name: name, exact: true });
  }
}
