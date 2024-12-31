import { type Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import { CategoryNames } from "./support/types";
import { Image } from "../../components/support/component-service";

export class MainPage extends BasePage {
  private readonly icon: Image;
  private readonly cardLogos: Locator;
  private readonly cardTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.icon = new Image(this.page);
    this.cardLogos = this.icon.getByLocator(".avatar");
    this.cardTitles = this.heading.getHeading("h5");
  }

  async goToCategory(categoryName: CategoryNames | string): Promise<void> {
    await this.icon.click(this.cardTitles.getByText(categoryName));
  }

  async verifyCategoryCards(): Promise<void> {
    await this.icon.areVisible(this.cardLogos);
    await this.heading.areVisible(this.cardTitles);
  }
}
