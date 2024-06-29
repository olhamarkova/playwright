import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";

export default class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly heading: Locator;
  readonly header: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = process.env.URL!;
    this.heading = this.page.locator("h1");
    this.header = this.page.locator("header");
    this.logo = this.header.locator("img[src='/images/Toolsqa.jpg']");
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async checkTitle(titleText: string) {
    await expect(this.page).toHaveTitle(titleText);
  }

  async checkHeading(headingText: string) {
    await expect(this.heading).toHaveText(headingText);
  }

  async checkHeader() {
    await expect(this.header).toBeVisible();
  }

  async checkLogo() {
    await expect(this.logo).toBeVisible();
  }
}
