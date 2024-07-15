import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import BasePage from "../core/BasePage";
import { CategoryNames } from "./mainPageTypes";

export class MainPage extends BasePage {
  readonly navigationCards: Locator;
  readonly cards: Locator;
  readonly cardLogos: Locator;
  readonly cardTitles: Locator;

  constructor(page: Page) {
    super(page);
    this.navigationCards = this.page.locator(".category-cards");
    this.cards = this.navigationCards.locator(".card");
    this.cardLogos = this.cards.locator(".avatar");
    this.cardTitles = this.cards.locator("h5");
  }

  async goToCategory(categoryName: CategoryNames | string) {
    await this.cardTitles.getByText(categoryName).click();
  }
}
