import { Locator, Page, expect } from "@playwright/test";
import { Clickable } from "../utils/interfaces/clickable";
import { UiElement } from "./uiElement";

export class Button extends UiElement implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getButton(name: string): Locator {
    return this.page.getByRole("button", { name: name, exact: true });
  }

  async clickElement(element: Locator | string, options?: {}): Promise<void> {
    await (element as Locator).click(options);
  }

  async dbClick(element: Locator | string, options?: {}): Promise<void> {
    await (element as Locator).dblclick();
  }
}
