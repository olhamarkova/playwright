import { type Locator, type Page } from "@playwright/test";
import { CategoryNames } from "../modules/mainPage/support/types";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";
import { NavbarItems } from "./support/types/navbar";
import { Link, Button } from "./support/component-service";

export class Navbar extends Component implements Clickable {
  readonly navLink: Link;
  readonly button: Button;

  constructor(page: Page) {
    super(page);
    this.navLink = new Link(this.page);
    this.button = new Button(this.page);
  }

  private category(category: CategoryNames): Locator {
    return this.navLink.getByText(category);
  }

  private subCategory(subCategory: NavbarItems): Locator {
    return this.navLink.getByText(subCategory);
  }

  private subCategoryButton(elementId: number): Locator {
    return this.button.getByLocator(`.show #item-${elementId}`);
  }

  private async verifySubCategoryVisible(
    subCategory: NavbarItems
  ): Promise<void> {
    await this.isVisible(this.subCategory(subCategory));
  }

  private async verifyButtonClass(elementId: number) {
    await this.hasClass(
      this.subCategoryButton(elementId),
      "btn btn-light active"
    );
  }

  async openCategory(category: CategoryNames): Promise<void> {
    await this.click(this.category(category));
  }

  async openSubCategory(subCategory: NavbarItems): Promise<void> {
    await this.click(this.subCategory(subCategory));
  }

  async verifySubCategories(items: string[]): Promise<void> {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await this.verifySubCategoryVisible(el as NavbarItems);
      await this.openSubCategory(el as NavbarItems);
      if (el === "Book Store API") {
        return;
      }
      await this.verifyButtonClass(index);
    }
  }
}
