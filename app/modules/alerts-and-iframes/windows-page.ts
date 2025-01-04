import { Locator, type Page } from "@playwright/test";
import BasePage from "../core/base-page";
import {
  Button,
  Popup,
  NewWindow,
} from "../../components/support/component-service";
import { newWindowsContent } from "./support/data";
import { WindowButtonsId } from "./support/types";

export class WindowsPage extends BasePage {
  private readonly buttons: Button;
  public newWindow: NewWindow;
  public popup: Popup;

  constructor(page: Page, url: string) {
    super(page, url);
    this.buttons = new Button(this.page);
  }

  private button(id: WindowButtonsId): Locator {
    return this.buttons.getById(`${id}Button`);
  }

  private assignPage(newPage: Page): void {
    this.newWindow = new NewWindow(newPage);
  }

  private assignPopup(newPage: Page): void {
    this.popup = new Popup(newPage);
  }

  async getNewTab(): Promise<Page> {
    const newPage = await this.openNewTab(this.button("tab"));
    return newPage;
  }

  async getNewPage(buttonId: Exclude<WindowButtonsId, "tab">): Promise<Page> {
    const newPage = await this.openPopup(this.button(buttonId));
    return newPage;
  }

  async verifyNewTabOpened(newTab: Page): Promise<void> {
    this.assignPage(newTab);
    await this.newWindow.hasText(
      this.newWindow.heading(),
      newWindowsContent.title
    );
  }

  async verifyPopupMsg(newTab: Page): Promise<void> {
    this.assignPopup(newTab);
    await this.popup.containText(this.popup.body(), newWindowsContent.message);
  }

  async closeTab(newTab: Page): Promise<void> {
    this.assignPage(newTab);
    await this.newWindow.close();
  }
}
