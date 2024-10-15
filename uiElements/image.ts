import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";
import {
  ClickOptions,
  GetByRoleOptions,
  GetLocatorOptions,
} from "../utils/types/Options";

export class Image extends UiElement implements Partial<Clickable> {
  constructor(page: Page) {
    super(page);
  }

  getImage(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("img", options);
  }

  getImageBySrc(value: string): Locator {
    return this.page.locator(`img[src='${value}']`);
  }

  getImageByAltText(text: string): Locator {
    return this.page.getByAltText(text, { exact: true });
  }

  getSvg(options?: GetLocatorOptions): Locator {
    return this.getLocator("svg", options);
  }
}
