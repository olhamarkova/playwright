import { type Page, expect, Locator } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Button } from "../../../uiElements/button";
import { Span } from "../../../uiElements/span";

export class DynamicPage extends BasePage {
  readonly disabledButton: Locator;
  readonly changeColorButton: Locator;
  readonly invisibleButton: Locator;
  readonly button: Button;
  readonly text: Span;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Span(this.page);
    this.disabledButton = this.button.getById("enableAfter");
    this.changeColorButton = this.button.getById("colorChange");
    this.invisibleButton = this.button.getById("visibleAfter");
  }
}
