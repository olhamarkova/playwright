import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";
import { Textual } from "../utils/interfaces/textual";

export class Link extends UiElement implements Clickable, Partial<Textual> {
  constructor(page: Page) {
    super(page);
  }

  getLinks(): Locator {
    return this.page.getByRole("link");
  }

  getByName(name: string, isExact: boolean = true): Locator {
    return this.page.getByRole("link", { name: name, exact: isExact });
  }
}
