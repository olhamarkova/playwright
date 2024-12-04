import { test } from "../../fixtures/pagesFixture";
import { headings } from "../../app/modules/core/support/data.ts";
import { newWindowsContent } from "../../app/modules/alertsAndFrames/support/data";

test.describe.serial("Handling Frames", async () => {
  test.beforeEach(async ({ framesPage }) => {
    await framesPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page And See Frames", async ({
    framesPage,
  }) => {
    await framesPage.heading.hasText(
      framesPage.pageTitle("h1"),
      headings.frames
    );
    await framesPage.validateFrameHeading("frame1", newWindowsContent.title);
    await framesPage.validateFrameHeading("frame2", newWindowsContent.title);
  });
});
