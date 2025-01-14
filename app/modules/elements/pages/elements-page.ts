import { type Page } from "@playwright/test";
import BasePage from "../../core/base-page";
import { Text } from "../../../components/support/component-service";
import { callToAction } from "../support/data";

export class ElementsPage extends BasePage {
  private readonly text: Text;

  constructor(page: Page, url: string) {
    super(page, url);
    this.text = new Text(this.page);
  }

  async verifyCallToAction(): Promise<void> {
    await this.text.isVisible(this.text.getByText(callToAction));
  }
}
