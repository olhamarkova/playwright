import { expect, test } from "@playwright/test";
import UserAPICalls from "../../utils/apiRequests/user.ts";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "../../utils/generateUserCreds.ts";

let api: UserAPICalls;
let token: string;
const login = process.env.LOGIN!;
const password = process.env.PASSWORD!;
const userName = generateRandomUsername();
const userPass = generateRandomPassword();

test.beforeEach(async ({ context }) => {
  api = new UserAPICalls(context);
});

test.describe.serial("User API Tests", () => {
  let userId: string;

  test("@functional User API Requests", async () => {
    await test.step("Step 1: Create A New User", async () => {
      const generateTokenResponse = await api.generateToken(login, password);
      token = await generateTokenResponse.responseBody.token;
      const createdUser = await api.createUser(token, {
        userName: userName,
        password: userPass,
      });
      expect(createdUser.statusCode).toBe(201);
      expect(createdUser.statusMessage).toBe("Created");
      expect(createdUser.responseBody.username).toBe(userName);
      expect(createdUser.responseBody.books).toBeInstanceOf(Array);
      userId = createdUser.responseBody.userID;
      const generateTokenForNewUser = await api.generateToken(
        userName,
        userPass
      );
      token = await generateTokenForNewUser.responseBody.token;
    });

    await test.step("Step 2: Check If The User Is Authorized", async () => {
      const isUserAuthorized = await api.isUserAuthorized(userName, userPass);
      expect(isUserAuthorized).toBe(true);
    });

    await test.step("Step 3: Get The User By ID", async () => {
      const user = await api.getUser(token, userId);
      expect(user.statusCode).toBe(200);
      expect(user.responseBody.userId).toBe(userId);
      expect(user.responseBody.username).toBe(userName);

      await test.step("Step 4: Delete The User By ID", async () => {
        const isDeleteUser = await api.deleteUser(token, userId);
        expect(isDeleteUser.statusCode).toBe(204);
        expect(isDeleteUser.statusMessage).toBe("No Content");
      });
    });
  });
});
