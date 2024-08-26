import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";

export class ImagesPage extends InnerPage {
  readonly validImage: Locator;
  readonly brokenImage: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.validImage = this.page
      .locator("img[src='/images/Toolsqa.jpg']")
      .nth(1);
    this.brokenImage = this.page.locator("img[src='/images/Toolsqa_1.jpg']");
  }

  link(linkText: string) {
    return this.page.getByRole("link", { name: linkText, exact: true });
  }
}
