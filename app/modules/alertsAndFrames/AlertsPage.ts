import { Locator, type Page, expect } from "@playwright/test";
import BasePage from "../core/BasePage";
import { Button, Text } from "../../components/support/uiService";

export class AlertsPage extends BasePage {
  readonly button: Button;
  readonly text: Text;

  readonly buttons: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.text = new Text(this.page);

    this.buttons = this.button.getByName("Click me");
  }

  clickMeButton(
    buttonId: "alert" | "timerAlert" | "confirm" | "promt"
  ): Locator {
    return this.button.getById(`${buttonId}Button`);
  }

  resultMsg(msg: "confirmResult" | "promptResult"): Locator {
    return this.text.getById(`${msg}`);
  }

  async confirmDelayedAlert(msg: string) {
    const [dialog] = await Promise.all([
      this.page.waitForEvent("dialog"),
      this.button.clickElement(this.clickMeButton("timerAlert")),
    ]);
    expect(dialog.message()).toBe(msg);
    await dialog.accept();
  }

  async confirmPromptBox(
    dialogMessage: string,
    confirm: boolean = true
  ): Promise<void> {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe(dialogMessage);
      if (confirm) {
        await dialog.accept("something");
      } else {
        await dialog.dismiss();
      }
    });
  }
}
