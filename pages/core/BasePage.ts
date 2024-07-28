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

  async fillInput(
    input: Locator,
    value: string,
    pressSequentially: boolean = false
  ) {
    if (!pressSequentially) {
      await input.fill(value);
    } else {
      input.pressSequentially(value);
    }
  }

  async checkTextElement(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async checkTitle(titleText: string) {
    await expect(this.page).toHaveTitle(titleText);
  }

  async checkHeading(headingText: string) {
    await expect(this.heading).toHaveText(headingText);
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

  async checkElementVisibility(element: Locator) {
    await expect(element).toBeVisible();
  }

  async checkEmptyInput(input: Locator) {
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await expect(input).toBeEmpty();
  }

  async checkElementsCount(element: Locator, count: number) {
    await expect(element).toHaveCount(count);
  }

  async checkPlaceholder(input: Locator, placeholder: string) {
    await expect(input).toHaveAttribute("placeholder", placeholder);
  }

  async checkInputValue(input: Locator, value: string) {
    await expect(input).toHaveValue(value);
  }

  async checkPageUrl(url: string) {
    await expect(this.page.url()).toContain(url);
  }
}
