import { type Locator, type Page, expect } from "@playwright/test";
import { CategoryNames } from "../utils/types/MainPageTypes";
import { UiElement } from "./uiElement";
import { Clickable } from "../utils/interfaces/clickable";

export class Menubar extends UiElement implements Partial<Clickable> {
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

  // menuItem(itemTitle: CategoryNames) {
  //   return this.page.locator(".header-text").filter({ hasText: itemTitle });
  // }

  menuSubItem(subItemId: number, subItemText: string): Locator {
    return this.getLocator(`#item-${subItemId} span`).getByText(subItemText);
  }

  menuSubItemButton(elementId: number) {
    return this.getLocator(`.show #item-${elementId}`);
  }

  async clickElement(element: string) {
    await this.page.getByText(element, { exact: true }).click();
  }

  async validateMenuItems(items: string[]) {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await expect(this.menuSubItem(index, el)).toBeVisible();
      await this.clickElement(el);
      if (el === "Book Store API") {
        return;
      }
      await expect(this.menuSubItemButton(index)).toHaveClass(
        "btn btn-light active"
      );
    }
  }
}
