import { test as base } from "@playwright/test";
import { AppManager } from "../app/app-manager/app-manager";
import { headings } from "../app/modules/core/support/data";
import { HeadingText } from "../app/modules/core/support/types";

export const test = base.extend<{ app: AppManager; heading: HeadingText }>({
  async app({ page }, use) {
    return await use(new AppManager(page));
  },
  async heading({}, use) {
    return await use(headings);
  },
});

export const describe = test.describe;
export const expect = test.expect;
