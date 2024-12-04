import { type Locator, type Page } from "@playwright/test";
import BasePage from "../core/BasePage";
import { CategoryNames } from "./support/types";
import { Image } from "../../components/support/component-service";

export class MainPage extends BasePage {
  readonly icon: Image;
  readonly cardLogos: Locator;
  readonly cardTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.icon = new Image(this.page);
    this.cardLogos = this.icon.getLocator(".avatar");
    this.cardTitles = this.heading.getHeading("h5");
  }

  async goToCategory(categoryName: CategoryNames | string) {
    await this.icon.clickElement(this.cardTitles.getByText(categoryName));
  }
}
