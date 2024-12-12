import { test as base } from "@playwright/test";
import { AppManager } from "../app/app-manager/app-manager";

export const test = base.extend<{ app: AppManager }>({
  async app({ page }, use) {
    return await use(new AppManager(page));
  },
});

export const describe = test.describe;
export const expect = test.expect;
