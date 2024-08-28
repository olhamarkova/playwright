import { type Page, BrowserContext, Locator, expect } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";
import { responseStatuses } from "../elementsData";

export class LinksPage extends InnerPage {
  readonly links: Locator;
  readonly subHeadings: Locator;
  readonly dynamicLink: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.links = this.page.locator("p a");
    this.subHeadings = this.page.locator("h5");
    this.dynamicLink = this.page.getByRole("link", { name: "Home" }).nth(1);
  }

  link(linkName: string) {
    return this.page.getByRole("link", {
      name: linkName,
      exact: true,
    });
  }

  async validateElementsByName(elementNames: string[]) {
    for (let i = 0; i < elementNames.length; i++) {
      const element = this.link(elementNames[i]);
      await this.validateElementVisibility(element);
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
        await this.clickButton(this.link("Moved"));
      } else {
        await this.clickButton(this.link(responseName!));
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
    await this.clickButton(link);
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(`${process.env.URL}`);
  }
}
