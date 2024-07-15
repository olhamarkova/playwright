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
    return this.page.locator(".element-group span.pr-1 ").getByText(itemTitle);
  }

  menuSubItem(subItemId: number, subItemText: MenuSubItems) {
    return this.page
      .locator(`#item-"${subItemId}" span`)
      .getByText(subItemText);
  }

  async openMenu(menuItem: CategoryNames) {
    await this.menuItem(menuItem).click();
  }

  async goToPage(menuSubItem: MenuSubItems) {
    await this.page.getByText(menuSubItem).click();
  }
}
