import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Buttons Page Tests", () => {
  test.beforeEach(async ({ app: { buttons }, heading }) => {
    await buttons.visit();
    await buttons.verifyHeading(heading.buttons);
  });

  test("@functional User Shall Have The Ability To Click The Buttons", async ({
    app: { buttons },
  }) => {
    await test.step("Step 1: Click The 'Double Click Me' button", async () => {
      await buttons.verifyButton("double");
    });

    await test.step("Step 2: Click The 'Right Click Me' button", async () => {
      await buttons.verifyButton("right");
    });

    await test.step("Step 3: Click The 'Click Me' button", async () => {
      await buttons.verifyButton("click");
    });
  });
});
