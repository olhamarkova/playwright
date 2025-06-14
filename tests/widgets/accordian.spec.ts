import { AccordianSections } from "../../app/modules/widgets/support/types.ts";
import { test } from "../../fixtures/pages-fixture.ts";

test.describe("Handling Modals", async () => {
  test.beforeEach(async ({ app: { accordian }, heading }) => {
    await accordian.visit();
    await accordian.verifyHeading(heading.accordian);
  });

  test("@smoke User Shall Be Able to Open Accordian Sections", async ({
    app: { accordian },
  }) => {
    await test.step("Verify The First Section Is Opened", async () => {
      await accordian.verifySectionContent(
        AccordianSections["What is Lorem Ipsum?"]
      );
    });

    await test.step("Verify The First Section Is Closed When The Second One Is Opened", async () => {
      await accordian.clickSectionHeading(
        AccordianSections["Where does it come from?"]
      );
      await accordian.verifySectionContent(
        AccordianSections["What is Lorem Ipsum?"],
        false
      );
      await accordian.verifySectionContent(
        AccordianSections["Where does it come from?"]
      );
    });

    await test.step("Verify The First And Second Sections Are Closed When The Third One Is Opened", async () => {
      await accordian.clickSectionHeading(
        AccordianSections["Why do we use it?"]
      );
      await accordian.verifySectionContent(
        AccordianSections["What is Lorem Ipsum?"],
        false
      );
      await accordian.verifySectionContent(
        AccordianSections["Where does it come from?"],
        false
      );
      await accordian.verifySectionContent(
        AccordianSections["Why do we use it?"]
      );
    });
  });
});
