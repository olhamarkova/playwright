import { type Page, Locator, Response, expect } from "@playwright/test";
import { responseStatuses, subHeadings } from "../support/data";
import BasePage from "../../core/BasePage";
import { Link } from "../../../components/support/component-service";
import { title } from "../../core/support/data";

export class LinksPage extends BasePage {
  private readonly link: Link;

  private readonly subHeadings: Locator;
  public readonly dynamicLink: Locator;
  public readonly homeLink: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.link = new Link(this.page);

    this.subHeadings = this.heading.getHeading("h5");
    this.dynamicLink = this.link.getByName("Home", false).nth(1);
    this.homeLink = this.link.getByName("Home");
  }

  private async getResponse(link: string): Promise<Response> {
    return this.page.waitForResponse(
      (resp) => resp.url().includes(link) && resp.request().method() === "GET"
    );
  }

  private getResponseText(status: number) {
    if (responseStatuses.has(status)) {
      return responseStatuses.get(status) as string;
    }
  }

  private async clickLink(anchor: string) {
    await this.link.click(this.link.getByName(anchor));
  }

  private verifyResponseStatus(response: Response, status: number) {
    expect(response.status()).toBe(status);
  }

  private verifyResponseMessage(response: Response, responseMsg: string) {
    expect(response.statusText()).toBe(responseMsg!);
  }

  private showError(): never {
    throw new Error("Something went wrong. Please check your data");
  }

  private isMoved(status: number) {
    return status === 301;
  }

  async verifyLinkResponse(link: string, status: number): Promise<void> {
    const responsePromise = this.getResponse(link);
    try {
      let responseText = this.getResponseText(status);
      if (this.isMoved(status)) {
        await this.clickLink("Moved");
      } else {
        await this.clickLink(responseText!);
      }
      const resp = await responsePromise;
      this.verifyResponseStatus(resp, status);
      this.verifyResponseMessage(resp, responseText!);
    } catch {
      this.showError();
    }
  }

  async verifySubHeadings() {
    await this.heading.hasText(this.subHeadings, subHeadings);
  }

  async verifyNewTabOpened(link: Locator) {
    const newPage = await this.openNewTab(link);
    await expect(newPage).toHaveTitle(title.mainTitle);
  }
}
