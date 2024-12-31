import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { copyRightText } from "../modules/core/support/data";

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

  async verify() {
    await this.isVisible(this.footer());
    await this.isVisible(this.copyrightText(copyRightText));
  }
}
