import { Locator, Page } from "@playwright/test";
import { UiElement } from "./core/component";
import { Clickable } from "./support/interfaces/clickable";
import { Textual } from "./support/interfaces/textual";

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
