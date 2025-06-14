import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import { Button, Text } from "../../components/support/component-service";

export class AccordianPage extends BasePage {
  private readonly button: Button;
  public text: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
  }
}
