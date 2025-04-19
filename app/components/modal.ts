import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { GetByRoleOptions } from "./support/types/options";
import { Button, Text, Heading } from "./support/component-service";

export class Modal extends Component {
  readonly button: Button;
  readonly text: Text;
  readonly title: Heading;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
    this.text = new Text(this.page);
    this.title = new Heading(this.page);
  }

  modal(options?: GetByRoleOptions): Locator {
    return this.page.getByRole("dialog", options);
  }

  heading(): Locator {
    return this.getByClass("modal-title");
  }

  body(): Locator {
    return this.getByClass("modal-body");
  }

  xButton(): Locator {
    return this.button.getByClass("close");
  }

  closeButton(): Locator {
    return this.button.getByName("Close");
  }

  async closeWithXButton(): Promise<void> {
    await this.button.click(this.xButton());
  }
}
