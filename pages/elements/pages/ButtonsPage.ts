import { type Page, Locator } from "@playwright/test";
import { InnerPage } from "../../core/InnerPage"; //???
import { Button } from "../../../uiElements/button";

export class ButtonsPage extends InnerPage {
  readonly dbClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly buttons: Locator;
  readonly button: Button;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.buttons = this.button.getLocator("button.btn-primary");
    this.dbClickButton = this.button.getButton("Double Click Me");
    this.rightClickButton = this.button.getButton("Right Click Me");
    this.clickMeButton = this.button.getButton("Click Me");
  }
}
