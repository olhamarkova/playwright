import { Locator, Page } from "@playwright/test";
import { UiElement } from "./uiElement";
import { Clickable } from "./support/interfaces/clickable";
import {
  GetByRoleOptions,
  GetLocatorOptions,
} from "./support/types/OptionsTypes";

export class Image extends UiElement implements Clickable {
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
