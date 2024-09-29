import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Link extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getLink(name: string): Locator {
    return this.page.getByRole("link", { name: name, exact: true });
  }

  async clickElement(element: string, options?: {}): Promise<void> {
    await this.getLink(element).click(options);
  }
}
