import { test } from "../../fixtures/pages-fixture.ts";
import { headings } from "../../app/modules/core/support/data.ts";
import { newWindowsContent } from "../../app/modules/alerts-and-iframes/support/data.ts";

test.describe("Handling Frames", async () => {
  test.beforeEach(async ({ app }) => {
    await app.iframes.visit();
  });

  test("@smoke A User Should Land To The Correct Page And See Frames", async ({
    app,
  }) => {
    await app.iframes.heading.hasText(
      app.iframes.mainHeading(),
      headings.frames
    );
    await app.iframes.validateFrameHeading("frame1", newWindowsContent.title);
    await app.iframes.validateFrameHeading("frame2", newWindowsContent.title);
  });
});
