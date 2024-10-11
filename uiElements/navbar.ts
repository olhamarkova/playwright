import { type Locator, type Page, expect } from "@playwright/test";
import { CategoryNames } from "../utils/types/MainPageTypes";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";
import { activeMenuButton } from "../data/classes";
import { NavbarItems } from "../utils/types/NavbarTypes";

export class Navbar extends UiElement implements Partial<Clickable> {
  readonly leftPannel: Locator;
  readonly menuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.leftPannel = this.getLocator(".left-pannel"); //
    this.menuItems = this.getLocator(".accordion .element-group");
  }

  getMenu(): Locator {
    return this.page.getByRole("menubar");
  }

  getMenuItem(itemTitle: CategoryNames): Locator {
    return this.page.getByRole("menuitem").filter({ hasText: itemTitle });
  }

  menuSubItem(subItemText: NavbarItems): Locator {
    return this.page.getByText(subItemText, { exact: true });
  }

  menuSubItemButton(elementId: number) {
    return this.getLocator(`.show #item-${elementId}`);
  }

  async validateMenuItems(items: string[]) {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await this.isElementVisible(this.menuSubItem(el as NavbarItems));
      await this.clickElement(el);
      if (el === "Book Store API") {
        return;
      }
      await this.hasClass(this.menuSubItemButton(index), activeMenuButton);
    }
  }
}
