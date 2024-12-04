import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";

export class Footer extends Component {
  constructor(page: Page) {
    super(page);
  }

  footer(): Locator {
    return this.getByLocator("footer");
  }

  copyrightText(text: string): Locator {
    return this.footer().getByText(text);
  }
}
