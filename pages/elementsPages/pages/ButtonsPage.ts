import { type Page, Locator } from "@playwright/test";
import { Button } from "../../../uiElements/button";
import BasePage from "../../core/BasePage";
import { Span } from "../../../uiElements/span";

export class ButtonsPage extends BasePage {
  readonly dbClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly buttons: Locator;
  readonly button: Button;
  readonly textMessage: Span;
  readonly title: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textMessage = new Span(this.page);
    this.title = this.heading.getHeading("h1");
    this.buttons = this.button.getLocator("button.btn-primary");
    this.dbClickButton = this.button.getButton("Double Click Me");
    this.rightClickButton = this.button.getButton("Right Click Me");
    this.clickMeButton = this.button.getButton("Click Me");
  }

  successMsg(text: string) {
    return this.textMessage.getByText(text);
  }
}
