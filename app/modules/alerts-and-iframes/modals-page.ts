import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/base-page";
import { Button, Modal } from "../../components/support/component-service";

export class ModalsPage extends BasePage {
  readonly button: Button;
  readonly modal: Modal;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.modal = new Modal(this.page);
  }

  private openModalButton(modalSize: "Small" | "Large"): Locator {
    return this.button.getById(`show${modalSize}Modal`);
  }

  async openModal(modalSize: "Small" | "Large"): Promise<void> {
    await this.button.click(this.openModalButton(modalSize));
  }
}
