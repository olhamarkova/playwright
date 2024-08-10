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

  async goToMainPage() {
    await this.logo.click();
  }

  async clickButton(button: Locator) {
    await button.click();
  }

  async validateTextElement(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async validateTitle(titleText: string) {
    await expect(this.page).toHaveTitle(titleText);
  }

  async validateHeading(headingText: string) {
    await expect(this.heading).toHaveText(headingText);
  }

  async validateFooter(copyRightText: string) {
    await expect(this.footer).toBeVisible();
    await expect(this.copyRightInfo).toHaveText(copyRightText);
  }

  async validateElementsVisibility(elements: Locator) {
    for (let i = 0; i < (await elements.count()); i++) {
      expect(elements.nth(i)).toBeVisible();
    }
  }

  async validateElementVisibility(element: Locator) {
    await expect(element).toBeVisible();
  }

  async validateElements(elementNames: string[]) {
    for (let i = 0; i < elementNames.length; i++) {
      const element = this.page.locator(elementNames[i]);
      await this.validateElementVisibility(element);
    }
  }

  async validateElementsCount(element: Locator, count: number) {
    await expect(element).toHaveCount(count);
  }

  async validatePageUrl(url: string) {
    await expect(this.page.url()).toContain(url);
  }
}
