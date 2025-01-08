import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";

export class Header extends Component implements Clickable {
  constructor(page: Page) {
    super(page);
  }

  header(): Locator {
    return this.getByLocator("header");
  }

  logo(): Locator {
    return this.header().getByRole("img");
  }

  async goToMainPage(): Promise<void> {
    await this.click(this.logo());
  }

  async verify(): Promise<void> {
    await this.isVisible(this.header());
  }

  async verifyLogo(): Promise<void> {
    await this.isVisible(this.logo());
  }
}
