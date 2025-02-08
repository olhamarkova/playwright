import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Nested iFrames", async () => {
  test.beforeEach(async ({ app: { nestedFrames }, heading }) => {
    await nestedFrames.visit();
    await nestedFrames.verifyHeading(heading.nestedFrames);
  });

  test("@smoke A User Should See The Nested Frame", async ({ app }) => {
    await app.nestedFrames.verifyParentFrame();
    await app.nestedFrames.verifyChildFrame();
  });
});
