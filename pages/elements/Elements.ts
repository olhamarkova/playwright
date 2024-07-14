import { type Locator, type Page } from "@playwright/test";
import { expect } from "@playwright/test";
import BasePage from "../BasePage";
import LeftPannel from "../leftPanel/LeftPannel";

let sidebar: LeftPannel;

export class ElementsPage extends BasePage {
  constructor(page: Page, url: string) {
    super(page, url);
    sidebar = new LeftPannel(page);
  }
}
