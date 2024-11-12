import { type Page, BrowserContext, Locator, expect } from "@playwright/test";
import { responseStatuses } from "../../../data/elementsData";
import BasePage from "../../core/BasePage";
import { Link } from "../../../uiElements/link";

export class LinksPage extends BasePage {
  readonly link: Link;
  readonly links: Locator;
  readonly subHeadings: Locator;
  readonly dynamicLink: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.link = new Link(this.page);
    this.links = this.link.getLocator("p a");
    this.subHeadings = this.heading.getHeading("h5");
    this.dynamicLink = this.link.getByName("Home", false).nth(1);
  }

  async validateElementsByName(elementNames: string[]) {
    for (let i = 0; i < elementNames.length; i++) {
      const element = this.link.getByName(elementNames[i]);
      await this.link.isElementVisible(element);
    }
  }

  async validateLinkResponse(link: string, status: number) {
    const responsePromise = this.page.waitForResponse(
      (resp) => resp.url().includes(link) && resp.request().method() === "GET"
    );
    try {
      let responseName: string | null;
      const responses = responseStatuses;
      if (responses.has(status)) {
        responseName = responses.get(status) as string;
      }
      if (status === 301) {
        await this.link.clickElement(this.link.getByName("Moved"));
      } else {
        await this.link.clickElement(this.link.getByName(responseName!));
      }
      const resp = await responsePromise;
      expect(resp.status()).toBe(status);
      expect(resp.statusText()).toBe(responseName!);
    } catch {
      throw new Error("Something went wrong. Please check your data");
    }
  }

  async openNewTab(context: BrowserContext, link: Locator) {
    const pagePromise = context.waitForEvent("page");
    await this.link.clickElement(link);
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.URL}`);
  }
}
