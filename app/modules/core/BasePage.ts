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
import { GetLocatorOptions } from "../../components/support/types/options.ts";

export default abstract class BasePage {
  protected page: Page;
  protected url: string;
  readonly header: Header;
  readonly logo: Locator;
  readonly footer: Footer;
  readonly navbar: Navbar;
  readonly heading: Heading;
  readonly context: BrowserContext;

  constructor(page: Page, url: string = "") {
    this.page = page;
    this.url = `${process.env.URL!}${url}`;
    this.heading = new Heading(this.page);
    this.header = new Header(this.page);
    this.logo = new Header(this.page).logo();
    this.footer = new Footer(this.page);
    this.navbar = new Navbar(this.page);
    this.context = this.page.context();
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

  async openNewTab(element: Locator): Promise<Page> {
    const pagePromise = this.context.waitForEvent("page");
    await element.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }

  async openPopup(element: Locator): Promise<Page> {
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
    this.page.on("dialog", (dialog) => {
      expect(dialog.message()).toBe(message);
      dialog.accept(prompt ? prompt : "");
    });
    element.click();
  }

  async dismsissAlert(element: Locator, message?: string): Promise<void> {
    this.page.on("dialog", (dialog) => {
      if (message) expect(dialog.message()).toBe(message);
      dialog.dismiss();
    });
    element.click();
  }

  async wait(time: number): Promise<void> {
    await this.page.waitForTimeout(time);
  }

  async bringToFront(): Promise<void> {
    await this.page.bringToFront();
  }

  //Assertions
  async verifyHeading(text: string): Promise<void> {
    await this.heading.hasText(this.mainHeading(), text);
  }

  async verifyUrl(url: string): Promise<void> {
    await expect(this.page.url()).toContain(url);
  }

  async verifyTitle(titleText: string): Promise<void> {
    await expect(this.page).toHaveTitle(titleText);
  }
}
