import { test } from "../../fixtures/pages-fixture";
import { categories } from "../../app/modules/core/support/data";

test.describe("Main Page Smoke Tests", () => {
  test.beforeEach(async ({ app: { main: home } }) => {
    await home.visit();
    await home.verifyTitle();
  });

  test("@smoke The Main Page Should Have All The Expected Elements", async ({
    app: { main: home },
  }) => {
    await test.step("Step 1: The Page Should Have A Header", async () => {
      await home.header.verify();
    });

    await test.step("Step 2: The Logo Should Be Visible", async () => {
      await home.header.verifyLogo();
    });

    await test.step("Step 3: The Navigation Cards Should Be Presented On The Page", async () => {
      await home.verifyCategoryCards();
    });

    await test.step("Step 4: The Footer Be Visible And Contain Copyright Info", async () => {
      await home.footer.verify();
    });
  });

  test("@smoke The Cards On Main Page Should Lead To Corresponding Pages", async ({
    app: { main: home },
  }) => {
    const pages = Object.entries(categories);
    let step = 1;

    for (const [key, value] of pages) {
      await test.step(`Step ${step}: Check The Page ${value} Link`, async () => {
        await home.goToCategory(value);
        await home.verifyUrl(key);
        await home.header.goToMainPage();

        step++;
      });
    }
  });
});
