import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/BasePage";
import { Button } from "../../components/support/component-service";

export class WindowsPage extends BasePage {
  readonly buttons: Button;

  constructor(page: Page, url: string) {
    super(page, url);
    this.buttons = new Button(this.page);
  }

  button(id: "tab" | "window" | "messageWindow"): Locator {
    return this.buttons.getById(`${id}Button`);
  }
}
