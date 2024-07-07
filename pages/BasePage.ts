import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";

export default class BasePage {
  protected page: Page;
  protected url: string;
  readonly heading: Locator;
  readonly header: Locator;
  readonly logo: Locator;
  readonly footer: Locator;
  readonly copyRightInfo: Locator;

  constructor(page: Page, url: string = "") {
    this.page = page;
    this.url = `${process.env.URL!}${url}`;
    this.heading = this.page.locator("h1");
    this.header = this.page.locator("header");
    this.logo = this.header.locator("img[src='/images/Toolsqa.jpg']");
    this.footer = this.page.locator("footer");
    this.copyRightInfo = this.footer.locator("span");
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

  async checkFooter(copyRightText: string) {
    await expect(this.footer).toBeVisible();
    await expect(this.copyRightInfo).toHaveText(copyRightText);
  }

  async checkElementsVisibility(elements: Locator) {
    for (let i = 0; i < (await elements.count()); i++) {
      expect(elements.nth(i)).toBeVisible();
    }
  }
}
