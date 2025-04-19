import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Modals", async () => {
  test.beforeEach(async ({ app: { modals }, heading }) => {
    await modals.visit();
    await modals.verifyHeading(heading.modals);
  });

  test("@functional A User Shall Be Able to Open Small Modal", async ({
    app: { modals },
  }) => {
    await modals.openModal("Small");
  });
});
