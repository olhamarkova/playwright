import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Frames", async () => {
  test.beforeEach(async ({ app: { iframes }, heading }) => {
    await iframes.visit();
    await iframes.verifyHeading(heading.frames);
  });

  test("@smoke A User Should Land To The Correct Page And See Frames", async ({
    app,
  }) => {
    await app.iframes.verifyFrameHeading("frame1");
    await app.iframes.verifyFrameHeading("frame2");
  });
});
