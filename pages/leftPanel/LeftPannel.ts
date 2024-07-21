import { type Locator, type Page, expect } from "@playwright/test";
import { CategoryNames } from "../mainPage/mainPageTypes";
import { MenuSubItems } from "./leftPanelTypes";

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

  menuSubItem(subItemId: number, subItemText: MenuSubItems | string) {
    return this.page.locator(`#item-${subItemId} span`).getByText(subItemText);
  }

  async openMenu(menuItem: CategoryNames) {
    await this.menuItem(menuItem).click();
  }

  async goToPage(menuSubItem: MenuSubItems) {
    await this.page.getByText(menuSubItem).click();
  }

  async checkMenuItems(items: string[]) {
    await items.forEach((el, index) => {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      expect(this.menuSubItem(index, el)).toBeVisible();
    });
  }
}
