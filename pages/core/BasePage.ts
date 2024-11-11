import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import {
  Navbar,
  Header,
  Footer,
  Heading,
} from "../../utils/services/uiService";

export default class BasePage {
  protected page: Page;
  protected url: string;
  readonly header: Header;
  readonly logo: Locator;
  readonly footer: Footer;
  readonly navbar: Navbar;
  readonly heading: Heading;

  constructor(page: Page, url: string = "") {
    this.page = page;
    this.url = `${process.env.URL!}${url}`;
    this.heading = new Heading(this.page);
    this.header = new Header(this.page);
    this.logo = new Header(this.page).getLogo();
    this.footer = new Footer(this.page);
    this.navbar = new Navbar(this.page);
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async goToMainPage(): Promise<void> {
    await this.logo.click();
  }

  async hasUrl(url: string): Promise<void> {
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
}
