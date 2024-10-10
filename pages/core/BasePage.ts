import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { Header } from "../../uiElements/header";
import { Footer } from "../../uiElements/footer";
import { Heading } from "../../uiElements/heading";
import { Menubar } from "../../uiElements/menubar";

export default class BasePage {
  protected page: Page;
  protected url: string;
  readonly header: Locator;
  readonly logo: Locator;
  readonly footer: Locator;
  readonly navbar: Menubar;
  readonly heading: Heading;

  constructor(page: Page, url: string = "") {
    this.page = page;
    this.url = `${process.env.URL!}${url}`;
    this.heading = new Heading(this.page);
    this.header = new Header(this.page).getHeader();
    this.logo = new Header(this.page).getLogo();
    this.footer = new Footer(this.page).getFooter();
    this.navbar = new Menubar(this.page);
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async goToMainPage(): Promise<void> {
    await this.logo.click();
  }

  async hasUrl(url: string) {
    await expect(this.page.url()).toContain(url);
  }

  async hasTitle(titleText: string): Promise<void> {
    await expect(this.page).toHaveTitle(titleText);
  }

  pageTitle(
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    options?: {}
  ): Locator {
    return this.heading.getHeading(heading, options);
  }

  /**
   * Check the visibility of group of elements by locator
   * @param elements - locator that returns a group of elements
   */
  async validateElementsVisibility(elements: Locator) {
    for (let i = 0; i < (await elements.count()); i++) {
      expect(elements.nth(i)).toBeVisible();
    }
  }

  /**
   * Check the visibility of group of elements by their name
   * @param elementNames - array of strings
   */
  async validateElementsByName(elementNames: string[]) {
    for (let i = 0; i < elementNames.length; i++) {
      const element = this.page.locator(elementNames[i]);
      await expect(element).toBeVisible();
    }
  }
}
