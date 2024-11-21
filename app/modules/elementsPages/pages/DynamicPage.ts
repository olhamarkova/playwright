import { type Page, Locator } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Button, Text } from "../../../components/support/uiService";

export class DynamicPage extends BasePage {
  readonly button: Button;
  readonly text: Text;

  readonly disabledButton: Locator;
  readonly changeColorButton: Locator;
  readonly invisibleButton: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);

    this.disabledButton = this.button.getById("enableAfter");
    this.changeColorButton = this.button.getById("colorChange");
    this.invisibleButton = this.button.getById("visibleAfter");
  }
}
