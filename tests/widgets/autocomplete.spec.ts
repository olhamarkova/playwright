import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Auto Complete Inputs", async () => {
  test.beforeEach(async ({ app: { autocomplete }, heading }) => {
    await autocomplete.visit();
    await autocomplete.verifyHeading(heading.autocomplete);
  });

  test("@smoke User Shall Be Able to Pick a Few Color Options", async ({
    app: { autocomplete },
  }) => {
    await autocomplete.fillMultipleColorInput("r");
    await autocomplete.pickColor("Red");
    await autocomplete.fillMultipleColorInput("b");
    await autocomplete.pickColor("Black");
    await autocomplete.verifyColorsCount(2);
    await autocomplete.verifyColorValues(["Red", "Black"]);
  });
});
