import { type Page, Locator, expect } from "@playwright/test";
import BasePage from "../../core/BasePage";
import fs from "fs";
import path from "path";
import { Button, Text } from "../../../uiElements/support/uiService";

export class UploadPage extends BasePage {
  readonly button: Button;
  readonly textBox: Text;

  readonly selectFileLabel: Locator;
  readonly downloadButton: Locator;
  readonly uploadButton: Locator;
  readonly filePath: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textBox = new Text(this.page);

    this.selectFileLabel = this.textBox.getLabel("uploadFile");
    this.downloadButton = this.button.getById("downloadButton");
    this.uploadButton = this.button.getById("uploadFile");
    this.filePath = this.textBox.getById("uploadedFilePath");
  }

  async uploadFile(filePath: string, fileName: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadButton.click();
    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles(path.join(filePath, fileName));
  }

  async downloadFile(fileName?: string): Promise<void> {
    const downloadPromise = this.page.waitForEvent("download");
    await this.downloadButton.click();
    const download = await downloadPromise;
    const filePath = `test-results/download/${
      fileName ? fileName : download.suggestedFilename()
    }`;
    await download.saveAs(filePath);

    expect(fs.existsSync(filePath)).toBeTruthy();
  }
}
