import { type Page } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Text } from "../../../components/support/uiService";

export class ElementsPage extends BasePage {
  readonly text: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
  }
}
