import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";

export class Header extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  getHeader(): Locator {
    return this.getLocator("header");
  }

  getLogo(): Locator {
    return this.getHeader().getByRole("img");
  }
}
