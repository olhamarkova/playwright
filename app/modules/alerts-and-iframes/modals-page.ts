import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import { Button, Modal } from "../../components/support/component-service";
import { ModalSize } from "./support/types";

export class ModalsPage extends BasePage {
  readonly button: Button;
  readonly modal: Modal;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.modal = new Modal(this.page);
  }

  private openModalButton(modalSize: ModalSize): Locator {
    return this.button.getById(`show${modalSize}Modal`);
  }

  private closeModalButton(modalSize: ModalSize): Locator {
    return this.modal.button.getById(`close${modalSize}Modal`);
  }

  async openModal(modalSize: ModalSize): Promise<void> {
    await this.button.click(this.openModalButton(modalSize));
  }

  async closeModal(): Promise<void> {
    await this.modal.closeWithXButton();
  }

  async clickCloseButton(modalSize: ModalSize): Promise<void> {
    await this.modal.button.click(this.closeModalButton(modalSize));
  }

  async verifyModalTitle(title: string): Promise<void> {
    await this.modal.text.containText(this.modal.heading(), title);
  }

  async verifyModalText(text: string): Promise<void> {
    await this.modal.text.containText(this.modal.body(), text);
  }

  async verifyModalIsClosed(): Promise<void> {
    await this.modal.isVisible(this.modal.body(), false);
  }
}
