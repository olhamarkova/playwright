import { Locator, Page } from "@playwright/test";
import { Component } from "./core/component";
import { Button } from "./support/uiService";
import { Clickable } from "./support/interfaces/interfaces";
import path from "path";

export class Filechooser extends Component implements Clickable {
  readonly button: Button;

  constructor(page: Page) {
    super(page);
    this.button = new Button(this.page);
  }

  chooseFileButton(): Locator {
    return this.button.getLocator("input[type='file']");
  }

  async uploadFile(button: Locator, fileName: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await button.click();
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles(path.join("downloads/", fileName));
  }
}
