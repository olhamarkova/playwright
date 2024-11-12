import { test } from "@playwright/test";
import { subCategoriesUrls } from "../../modules/core/support/data.ts";
import {
  elementPagesHeadings as headings,
  pathToUploadedFile,
} from "../../modules/elementsPages/support/data.ts";
import { UploadPage } from "../../modules/elementsPages/pages/UploadPage.ts";

let uploadPage: UploadPage;

test.beforeEach(async ({ page }) => {
  uploadPage = new UploadPage(page, subCategoriesUrls.elements.uploadDownload);
  await uploadPage.visit();
});

test.describe("Upload and Download Page Tests", () => {
  test("@smoke The Upload and Download Page Should Have All The Expected Elements", async () => {
    await test.step("Step 1: Check The Page Headings", async () => {
      await uploadPage.heading.hasText(
        uploadPage.pageTitle("h1"),
        headings.upload
      );
      await uploadPage.textBox.hasText(
        uploadPage.selectFileLabel,
        "Select a file"
      );
    });

    await test.step("Step 2: Check The Buttons", async () => {
      await uploadPage.button.isElementVisible(uploadPage.downloadButton);
      await uploadPage.button.isElementVisible(uploadPage.uploadButton);
    });
  });

  test("@functional User Shall Be Able To Download Files", async () => {
    await test.step("Step 1: Download A File", async () => {
      await uploadPage.downloadFile();
    });
  });

  test("@functional User Shall Be Able To Upload Files", async () => {
    await test.step("Step 1: Upload A File", async () => {
      await uploadPage.uploadFile("test-results/download/", "sampleFile.jpeg");
      await uploadPage.textBox.hasText(uploadPage.filePath, pathToUploadedFile);
    });
  });
});
