import { type Locator, type Page, expect } from "@playwright/test";
import { CategoryNames } from "../mainPage/mainPageTypes";

export default class LeftPannel {
  readonly page: Page;
  readonly leftPannel: Locator;
  readonly menuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leftPannel = this.page.locator(".left-pannel");
    this.menuItems = this.page.locator(".accordion .element-group");
  }

  menuItem(itemTitle: CategoryNames) {
    return this.page.locator(".header-text").filter({ hasText: itemTitle });
  }

  menuSubItem(subItemId: number, subItemText: string) {
    return this.page.locator(`#item-${subItemId} span`).getByText(subItemText);
  }

  menuSubItemButton(elementId: number) {
    return this.page.locator(`.show #item-${elementId}`);
  }

  async openMenu(menuItem: CategoryNames) {
    await this.menuItem(menuItem).click();
  }

  async goToPage(menuSubItem: string) {
    await this.page.getByText(menuSubItem, { exact: true }).click();
  }

  async validateMenuItems(items: string[]) {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await expect(this.menuSubItem(index, el)).toBeVisible();
      await this.goToPage(el);
      if (el === "Book Store API") {
        return;
      }
      await expect(this.menuSubItemButton(index)).toHaveClass(
        "btn btn-light active"
      );
    }
  }
}
