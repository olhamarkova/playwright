import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import BasePage from "../BasePage";
import LeftPannel from "../leftPanel/LeftPannel";

export class ElementsPage extends BasePage {
  readonly sidebar: LeftPannel;

  constructor(page: Page, url: string) {
    super(page, url);
    this.sidebar = new LeftPannel(page);
  }
}
