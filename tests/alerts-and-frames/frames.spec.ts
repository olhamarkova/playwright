import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import { newWindowsContent } from "../../app/modules/alerts-and-frames/support/data.ts";

test.describe("Handling Frames", async () => {
  test.beforeEach(async ({ framesPage }) => {
    await framesPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page And See Frames", async ({
    framesPage,
  }) => {
    await framesPage.heading.hasText(framesPage.mainHeading(), headings.frames);
    await framesPage.validateFrameHeading("frame1", newWindowsContent.title);
    await framesPage.validateFrameHeading("frame2", newWindowsContent.title);
  });
});
