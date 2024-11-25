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
} from "../../components/support/uiService.ts";

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

  pageTitle(
    heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    options?: {}
  ): Locator {
    return this.heading.getHeading(heading, options);
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
    dialogMessage: string,
    confirm: boolean = true
  ): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      console.log(dialog.message);
      expect(dialog.message()).toBe(dialogMessage);
      if (confirm) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async bringToFront() {
    await this.page.bringToFront();
  }
}
