import { type Page, Locator, expect } from "@playwright/test";
import { responseStatuses } from "../../elements/support/data";
import BasePage from "../../core/BasePage";
import { Link } from "../../../components/support/component-service";

export class LinksPage extends BasePage {
  readonly link: Link;
  readonly links: Locator;
  readonly subHeadings: Locator;
  readonly dynamicLink: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.link = new Link(this.page);

    this.links = this.link.getByLocator("p a");
    this.subHeadings = this.heading.getHeading("h5");
    this.dynamicLink = this.link.getByName("Home", false).nth(1);
  }

  async validateLinkResponse(link: string, status: number): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (resp) => resp.url().includes(link) && resp.request().method() === "GET"
    );
    try {
      let responseText: string | null;
      if (responseStatuses.has(status)) {
        responseText = responseStatuses.get(status) as string;
      }
      if (status === 301) {
        await this.link.click(this.link.getByName("Moved"));
      } else {
        await this.link.click(this.link.getByName(responseText!));
      }
      const resp = await responsePromise;
      expect(resp.status()).toBe(status);
      expect(resp.statusText()).toBe(responseText!);
    } catch {
      throw new Error("Something went wrong. Please check your data");
    }
  }
}
