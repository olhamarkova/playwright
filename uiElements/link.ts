import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";
import { Textual } from "../utils/interfaces/textual";

export class Link
  extends UiElement
  implements Partial<Clickable>, Partial<Textual>
{
  constructor(page: Page) {
    super(page);
  }

  getLinks() {
    return this.page.getByRole("link");
  }

  getLink(name: string, isExact: boolean = true): Locator {
    return this.page.getByRole("link", { name: name, exact: isExact });
  }

  getByText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
