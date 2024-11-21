import { test } from "../../fixtures/pagesFixture.ts";
import {
  elementPagesHeadings as headings,
  pathToUploadedFile,
} from "../../app/modules/elementsPages/support/data.ts";

test.describe("Upload and Download Page Tests", () => {
  test.beforeEach(async ({ uploadPage }) => {
    await uploadPage.visit();
  });

  test("@smoke The Upload and Download Page Should Have All The Expected Elements", async ({
    uploadPage,
  }) => {
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

  test("@functional User Shall Be Able To Download Files", async ({
    uploadPage,
  }) => {
    await test.step("Step 1: Download A File", async () => {
      await uploadPage.downloadFile();
    });
  });

  test("@functional User Shall Be Able To Upload Files", async ({
    uploadPage,
  }) => {
    await test.step("Step 1: Upload A File", async () => {
      await uploadPage.filechooser.uploadFile(
        uploadPage.uploadButton,
        "photo.jpg"
      );
      await uploadPage.textBox.hasText(uploadPage.filePath, pathToUploadedFile);
    });
  });
});
