import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";

export class Header extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  header(): Locator {
    return this.getLocator("header");
  }

  logo(): Locator {
    return this.header().getByRole("img");
  }
}
