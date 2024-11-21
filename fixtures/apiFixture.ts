import { test as base } from "@playwright/test";
import UserAPICalls from "../app/modules/bookStore/apiRequests/user";
import BookStoreAPICalls from "../app/modules/bookStore/apiRequests/bookStore";

export const apiTest = base.extend<{
  user: UserAPICalls;
  books: BookStoreAPICalls;
  credentials: { login: string; password: string };
}>({
  async user({ page }, use) {
    return await use(new UserAPICalls(page));
  },
  async books({ page }, use) {
    return await use(new BookStoreAPICalls(page));
  },
  async credentials({}, use) {
    return await use({
      login: process.env.LOGIN!,
      password: process.env.PASSWORD!,
    });
  },
});

export const describe = apiTest.describe;
export const expect = apiTest.expect;
