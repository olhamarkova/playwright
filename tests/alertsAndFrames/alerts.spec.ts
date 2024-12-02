import { pageTitles } from "../../app/modules/alertsAndFrames/support/data";
import { test, expect } from "../../fixtures/pagesFixture";
import { ai } from "@zerostep/playwright";

test.describe.serial("Handling Alerts", async () => {
  test.beforeEach(async ({ alertsPage }) => {
    await alertsPage.visit();
  });

  test("@smoke A User Should Land To The Correct Page", async ({
    alertsPage,
  }) => {
    test.step("Step 1: The Page Should Have The Correct Heading", async () => {
      await alertsPage.heading.hasText(
        alertsPage.pageTitle("h1"),
        pageTitles.alerts
      );
    });

    test.step("Step 2: All Buttons Should Be Visible", async () => {
      await alertsPage.button.hasCount(
        alertsPage.button.getByName("Click me"),
        4
      );
    });
  });

  test("@functional User Shall Be Able To Handle An Alert", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmAlert("You clicked a button");
    await alertsPage.button.clickElement(alertsPage.clickMeButton("alert"));
  });

  test("@functional The Button 'New Window' Should Open New Window", async ({
    alertsPage,
  }) => {
    await alertsPage.confirmDelayedAlert("This alert appeared after 5 seconds");
  });

  test("@functional The Button 'New Window Message' Should Open New Window With A Message", async ({
    page,
  }) => {
    const aiArgs = { page, test };
    const buttonsCount = await ai("How many buttons are on the page", aiArgs);
    console.log(`There are ${buttonsCount} buttons`);
    expect(buttonsCount).toEqual("4");
  });
});
