import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Dynamic Properties Page Tests", () => {
  test.beforeEach(async ({ app: { dynamic }, heading }) => {
    await dynamic.visit();
    await dynamic.verifyHeading(heading.dynamic);
  });

  test("@smoke Verify The Text Message", async ({ app: { dynamic } }) => {
    await dynamic.verifyTextMessage();
  });

  test("@smoke Verify The Disabled Button", async ({ app: { dynamic } }) => {
    await dynamic.verifyEnabled(false);
    await dynamic.wait(5000);
    await dynamic.verifyEnabled();
  });

  test("@smoke Verify The Changed Color Button", async ({
    app: { dynamic },
  }) => {
    await dynamic.verifyColor("before");
    await dynamic.wait(5000);
    await dynamic.verifyColor("after");
  });

  test("@smoke Verify The Invisible Button", async ({ app: { dynamic } }) => {
    await dynamic.waitForButton();
    await dynamic.verifyVisible();
  });
});
