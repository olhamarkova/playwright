import {
  type Locator,
  type Page,
  expect,
  type BrowserContext,
} from "@playwright/test";
import {
  Navbar,
  Header,
  Footer,
  Heading,
} from "../../components/support/component-service.ts";
import { Headings } from "./support/types.ts";
import { GetLocatorOptions } from "../../components/support/types/options.ts";

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
    this.logo = new Header(this.page).logo();
    this.footer = new Footer(this.page);
    this.navbar = new Navbar(this.page);
  }

  mainHeading(options?: GetLocatorOptions): Locator {
    return this.heading.getHeading("h1", options);
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

  async openNewTab(context: BrowserContext, element: Locator): Promise<Page> {
    const pagePromise = context.waitForEvent("page");
    await element.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }

  async openPopup(element: Locator) {
    const popup = this.page.waitForEvent("popup");
    await element.click();
    const newPopup = await popup;
    await newPopup.waitForLoadState();
    return newPopup;
  }

  async confirmAlert(
    element: Locator,
    message: string,
    prompt?: string
  ): Promise<void> {
    const [dialog] = await Promise.all([
      this.page.waitForEvent("dialog"),
      element.click(),
    ]);
    expect(dialog.message()).toBe(message);
    await dialog.accept(prompt ? prompt : "");
  }

  async dismsissAlert(element: Locator, message?: string) {
    const [dialog] = await Promise.all([
      this.page.waitForEvent("dialog"),
      element.click(),
    ]);
    if (message) expect(dialog.message()).toBe(message);
    await dialog.dismiss();
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async bringToFront() {
    await this.page.bringToFront();
  }
}
