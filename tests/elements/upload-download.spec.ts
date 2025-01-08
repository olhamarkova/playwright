import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Upload and Download Page Tests", () => {
  test.beforeEach(async ({ app: { upload }, heading }) => {
    await upload.visit();
    await upload.verifyHeading(heading.upload);
  });

  test("@functional User Shall Be Able To Download Files", async ({
    app: { upload },
  }) => {
    await test.step("Step 1: Download A File", async () => {
      await upload.downloadFile();
    });
  });

  test("@functional User Shall Be Able To Upload Files", async ({
    app: { upload },
  }) => {
    await test.step("Step 1: Upload A File", async () => {
      await upload.uploadFile("photo.jpg");
      await upload.verifyFileUploaded();
    });
  });
});
