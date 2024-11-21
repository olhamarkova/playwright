import { Locator, Page } from "@playwright/test";
import { UiElement } from "./core/component";
import { GetByRoleOptions } from "./support/types/OptionsTypes";
import { Button, Text, Heading } from "./support/uiService";

export class Modal extends UiElement {
  readonly button: Button;
  readonly text: Text;
  readonly title: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
    this.title = new Heading(this.page);
  }

  getModal(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("dialog", options);
  }
}
