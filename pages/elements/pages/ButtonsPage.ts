import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage";

export class ButtonsPage extends InnerPage {
  readonly dbClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly buttons: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.buttons = this.page.locator("button.btn-primary");
    this.dbClickButton = this.page.getByRole("button", {
      name: "Double Click Me",
      exact: true,
    });
    this.rightClickButton = this.page.getByRole("button", {
      name: "Right Click Me",
      exact: true,
    });
    this.clickMeButton = this.page.getByRole("button", {
      name: "Click Me",
      exact: true,
    });
  }
}
