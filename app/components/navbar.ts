import { type Locator, type Page } from "@playwright/test";
import { CategoryNames } from "../modules/mainPage/support/types";
import { Component } from "./core/component";
import { Clickable } from "./support/interfaces/interfaces";
import { activeMenuButton } from "../modules/elementsPages/support/classes";
import { NavbarItems } from "./support/types/NavbarTypes";
import { Link, Button } from "./support/uiService";

export class Navbar extends Component implements Clickable {
  readonly navLink: Link;
  readonly button: Button;

  constructor(page: Page) {
    super(page);
    this.navLink = new Link(this.page);
    this.button = new Button(this.page);
  }

  item(itemTitle: CategoryNames): Locator {
    return this.navLink.getByText(itemTitle);
  }

  subitem(subitemText: NavbarItems): Locator {
    return this.navLink.getByText(subitemText);
  }

  subitemButton(elementId: number): Locator {
    return this.button.getLocator(`.show #item-${elementId}`);
  }

  async validateItems(items: string[]): Promise<void> {
    for (let [index, el] of items.entries()) {
      if (el === "Book Store" || el === "Profile" || el === "Book Store API") {
        index++;
      }
      await this.isElementVisible(this.subitem(el as NavbarItems));
      await this.clickElement(this.subitem(el as NavbarItems));
      if (el === "Book Store API") {
        return;
      }
      await this.hasClass(this.subitemButton(index), activeMenuButton);
    }
  }
}
