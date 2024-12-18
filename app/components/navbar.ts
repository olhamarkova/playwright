import { type Locator, type Page } from "@playwright/test";
import { CategoryNames } from "../modules/mainPage/support/types";
import { UiElement } from "./core/component";
import { Clickable } from "./support/interfaces/clickable";
import { activeMenuButton } from "../modules/elementsPages/support/classes";
import { NavbarItems } from "./support/types/NavbarTypes";
import { Link, Button } from "./support/uiService";

export class Navbar extends UiElement implements Clickable {
  readonly navLink: Link;
  readonly button: Button;

  constructor(page: Page) {
    super(page);
    this.navLink = new Link(this.page);
    this.button = new Button(this.page);
  }

  getMenuItem(itemTitle: CategoryNames): Locator {
    return this.navLink.getByText(itemTitle);
  }

  menuSubItem(subItemText: NavbarItems): Locator {
    return this.navLink.getByText(subItemText);
  }

  menuSubItemButton(elementId: number): Locator {
    return this.button.getLocator(`.show #item-${elementId}`);
  }

  async validateMenuItems(items: string[]): Promise<void> {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await this.isElementVisible(this.menuSubItem(el as NavbarItems));
      await this.clickElement(this.menuSubItem(el as NavbarItems));
      if (el === "Book Store API") {
        return;
      }
      await this.hasClass(this.menuSubItemButton(index), activeMenuButton);
    }
  }
}
