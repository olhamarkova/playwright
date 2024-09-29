import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Image extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getImage(options?: {}): Locator {
    return this.page.getByRole("img", options);
  }

  getImageByAltText(text: string): Locator {
    return this.page.getByAltText(text, { exact: true });
  }

  getSvg(index: number): Locator {
    return this.getLocator("svg").nth(index - 1);
  }

  async clickElement(element: Locator, options?: {}): Promise<void> {
    await element.click(options);
  }
}
