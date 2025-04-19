import { test } from "../../fixtures/pages-fixture.ts";
import { modalText } from "../../app/modules/alerts-and-iframes/support/data.ts";

test.describe("Handling Modals", async () => {
  test.beforeEach(async ({ app: { modals }, heading }) => {
    await modals.visit();
    await modals.verifyHeading(heading.modals);
  });

  test("@smoke A User Shall Be Able to Open Small Modal", async ({
    app: { modals },
  }) => {
    await modals.openModal("Small");
    await modals.verifyModalTitle("Small Modal");
    await modals.verifyModalText(modalText.small);
    await modals.closeModal();
    await modals.verifyModalIsClosed();
  });

  test("@smoke A User Shall Be Able to Open Large Modal", async ({
    app: { modals },
  }) => {
    await modals.openModal("Large");
    await modals.verifyModalTitle("Large Modal");
    await modals.verifyModalText(modalText.large);
    await modals.clickCloseButton("Large");
    await modals.verifyModalIsClosed();
  });
});
