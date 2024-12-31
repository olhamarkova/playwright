import { type Page, Locator, expect } from "@playwright/test";
import BasePage from "../../core/base-page";
import fs from "fs";
import {
  Button,
  Text,
  Filechooser,
} from "../../../components/support/component-service";
import { pathToUploadedFile } from "../support/data";

export class UploadPage extends BasePage {
  private readonly button: Button;
  private readonly textBox: Text;
  private readonly filechooser: Filechooser;

  private readonly downloadButton: Locator;
  private readonly uploadButton: Locator;
  private readonly filePath: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.button = new Button(this.page);
    this.textBox = new Text(this.page);
    this.filechooser = new Filechooser(this.page);

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

  async uploadFile(fileName: string): Promise<void> {
    await this.filechooser.uploadFile(this.uploadButton, fileName);
  }

  async verifyFileUploaded(): Promise<void> {
    await this.textBox.hasText(this.filePath, pathToUploadedFile);
  }
}
