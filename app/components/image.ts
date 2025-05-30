import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";
import { GetByRoleOptions, GetLocatorOptions } from "./support/types/options";

export class Image extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  image(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("img", options);
  }

  imageBySrc(value: string): Locator {
    return this.page.locator(`img[src='${value}']`);
  }

  imageByAltText(text: string): Locator {
    return this.page.getByAltText(text, { exact: true });
  }

  svg(options?: GetLocatorOptions): Locator {
    return this.getByLocator("svg", options);
  }
}
