import { type Page, Locator, expect } from "@playwright/test";
import BasePage from "../../core/BasePage";
import fs from "fs";
import {
  Button,
  Text,
  Filechooser,
} from "../../../components/support/component-service";

export class UploadPage extends BasePage {
  readonly button: Button;
  readonly textBox: Text;
  readonly filechooser: Filechooser;

  readonly selectFileLabel: Locator;
  readonly downloadButton: Locator;
  readonly uploadButton: Locator;
  readonly filePath: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textBox = new Text(this.page);
    this.filechooser = new Filechooser(this.page);

    this.selectFileLabel = this.textBox.getLabel("uploadFile");
    this.downloadButton = this.button.getById("downloadButton");
    this.uploadButton = this.filechooser.chooseFileButton();
    this.filePath = this.textBox.getById("uploadedFilePath");
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
