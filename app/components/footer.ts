import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";

export class Footer extends Component {
  constructor(page: Page) {
    super(page);
  }

  getFooter(): Locator {
    return this.getLocator("footer");
  }

  getCopyrightText(text: string): Locator {
    return this.getFooter().getByText(text);
  }
}
