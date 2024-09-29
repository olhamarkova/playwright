// import { type Page, Locator, expect } from "@playwright/test";
// import { InnerPage } from "../../core/InnerPage";
// import fs from "fs";
// import path from "path";

// export class UploadPage extends InnerPage {
//   readonly downloadButton: Locator;
//   readonly uploadButton: Locator;

//   constructor(page: Page, url: string) {
//     super(page, url);
//     this.downloadButton = this.page.locator("#downloadButton");
//     this.uploadButton = this.page.locator("#uploadFile");
//   }

//   async uploadFile(filePath: string, fileName: string) {
//     const fileChooserPromise = this.page.waitForEvent("filechooser");
//     await this.uploadButton.click();
//     const fileChooser = await fileChooserPromise;

//     await fileChooser.setFiles(path.join(filePath, fileName));
//   }

//   async downloadFile(fileName?: string) {
//     const downloadPromise = this.page.waitForEvent("download");
//     await this.downloadButton.click();
//     const download = await downloadPromise;
//     const filePath = `test-results/download/${
//       fileName ? fileName : download.suggestedFilename()
//     }`;
//     await download.saveAs(filePath);

//     expect(fs.existsSync(filePath)).toBeTruthy();
//   }
// }
