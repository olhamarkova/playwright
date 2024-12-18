import { type Page, Locator } from "@playwright/test";
import { Button, Text } from "../../../components/support/uiService";
import BasePage from "../../core/BasePage";

export class ButtonsPage extends BasePage {
  readonly dbClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly clickMeButton: Locator;
  readonly buttons: Locator;
  readonly button: Button;
  readonly textMessage: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textMessage = new Text(this.page);
    this.buttons = this.button.getLocator("button.btn-primary");
    this.dbClickButton = this.button.getButton("Double Click Me");
    this.rightClickButton = this.button.getButton("Right Click Me");
    this.clickMeButton = this.button.getButton("Click Me");
  }

  successMsg(text: string): Locator {
    return this.textMessage.getByText(text);
  }
}
