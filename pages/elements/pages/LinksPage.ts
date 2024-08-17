import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";

export class LinksPage extends InnerPage {
  readonly links: Locator;
  readonly subHeadings: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.links = this.page.locator("p a");
    this.subHeadings = this.page.locator("h5");
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
}
