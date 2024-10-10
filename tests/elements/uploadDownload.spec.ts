// import { test } from "@playwright/test";
// import { subCategoriesUrls } from "../../utils/services/dataService.ts";
// import {
//   elementPagesHeadings as headings,
//   pathToUploadedFile,
// } from "../../pages/elements/elementsData.ts";
// import { UploadPage } from "../../pages/elements/pages/UploadPage.ts";

// let uploadPage: UploadPage;

// test.beforeEach(async ({ page }) => {
//   uploadPage = new UploadPage(page, subCategoriesUrls.elements.uploadDownload);
//   await uploadPage.visit();
// });

// test.describe("Upload and Download Page Tests", () => {
//   test("@smoke The Upload and Download Page Should Have All The Expected Elements", async () => {
//     await test.step("Step 1: Check The Page Headings", async () => {
//       await uploadPage.validateHeading(headings.upload);
//       await uploadPage.validateTextElement("Select a file");
//     });

//     await test.step("Step 2: Check The Buttons", async () => {
//       await uploadPage.validateElementVisibility(uploadPage.downloadButton);
//       await uploadPage.validateElementVisibility(uploadPage.uploadButton);
//     });
//   });

//   test("@functional User Shall Be Able To Download Files", async () => {
//     await test.step("Step 1: Download A File", async () => {
//       await uploadPage.downloadFile();
//     });
//   });

//   test("@functional User Shall Be Able To Upload Files", async () => {
//     await test.step("Step 1: Upload A File", async () => {
//       await uploadPage.uploadFile("test-results/download/", "sampleFile.jpeg");
//       await uploadPage.validateTextElement(pathToUploadedFile);
//     });
//   });
// });
