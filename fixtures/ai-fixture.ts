import { test as base } from "@playwright/test";
import { aiFixture, type AiFixture } from "@zerostep/playwright";

export const aiTest = base.extend<AiFixture>({
  ...aiFixture(base),
});

export const describe = aiTest.describe;
export const expect = aiTest.expect;
