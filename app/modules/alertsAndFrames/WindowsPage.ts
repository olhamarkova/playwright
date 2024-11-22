import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/BasePage";
import { Button } from "../../components/support/uiService";

export class WindowsPage extends BasePage {
  readonly button: Button;

  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly newWindowMsgButton: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);

    this.newTabButton = this.button.getById("tabButton");
    this.newWindowButton = this.button.getById("windowButton");
    this.newWindowMsgButton = this.button.getById("messageWindowButton");
  }
}
