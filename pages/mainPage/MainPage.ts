import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import BasePage from "../BasePage";
import { CategoryNames } from "./mainPageTypes";

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly navigationCards = this.page.locator(".category-cards");
  readonly cards = this.navigationCards.locator(".card");
  readonly cardLogos = this.cards.locator(".avatar");
  readonly cardTitles = this.cards.locator("h5");

  async goToCategory(categoryName: CategoryNames) {
    await this.cardTitles.getByText(categoryName).click();
  }

  async checkCategoryLogos() {
    const logos = this.cardLogos;
    for (let i = 0; i < (await logos.count()); i++) {
      expect(logos.nth(i)).toBeVisible();
    }
  }
}
