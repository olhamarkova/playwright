import { expect, test } from "@playwright/test";
import UserAPICalls from "../../modules/bookStore/apiRequests/user.ts";
import BookStoreAPICalls from "../../modules/bookStore/apiRequests/bookStore.ts";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "../../utils/generateUserCreds.ts";
import { BookSchema } from "../../modules/bookStore/apiRequests/models.ts";
import Ajv from "ajv";

const ajv = new Ajv();
const validateBookSchema = ajv.compile(BookSchema);

let api: UserAPICalls;
let booksApi: BookStoreAPICalls;
let token: string;
let myUsertoken: string;
const login = process.env.LOGIN!;
const password = process.env.PASSWORD!;
const userName = generateRandomUsername();
const userPass = generateRandomPassword();

test.beforeEach(async ({ page }) => {
  api = new UserAPICalls(page);
  booksApi = new BookStoreAPICalls(page);
});

test.describe.serial("API Tests", () => {
  let userId: string;

  test("@functional User API Requests", async () => {
    await test.step("Step 1: Create A New User", async () => {
      const generateTokenResponse = await api.generateToken(login, password);
      let myUsertoken = await generateTokenResponse.responseBody.token;
      const createdUser = await api.createUser(myUsertoken, {
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

  test("@functional Book Store API Requests", async () => {
    let isbn: string;
    let newUserId: string;
    let newUserToken: string;
    await test.step("Step 1: Get All Books", async () => {
      const allBooks = await booksApi.getBooks();
      expect(allBooks.statusCode).toBe(200);
      expect(allBooks.statusMessage).toBe("OK");
      expect(allBooks.responseBody).toBeInstanceOf(Object);
      expect(allBooks.responseBody.books).toBeInstanceOf(Array);
      expect(allBooks.responseBody.books.length).toBeGreaterThan(0);
      isbn = allBooks.responseBody.books[0].isbn;
    });

    await test.step("Step 2: Get Book By ISBN", async () => {
      const allBooks = await booksApi.getBookByIsbn(isbn);
      expect(allBooks.statusCode).toBe(200);
      expect(allBooks.statusMessage).toBe("OK");
      const isSchemaValid = validateBookSchema(allBooks.responseBody);
      if (!isSchemaValid) {
        console.log(validateBookSchema.errors);
      }
      expect(isSchemaValid).toBe(true);
      expect(allBooks.responseBody.isbn).toEqual(isbn);
    });

    await test.step("Step 3: Add A List Of Books To A User", async () => {
      const newUser = await api.createUser(myUsertoken, {
        userName: userName,
        password: userPass,
      });
      newUserId = newUser.responseBody.userID;
      const generateTokenForNewUser = await api.generateToken(
        userName,
        userPass
      );
      newUserToken = await generateTokenForNewUser.responseBody.token;
      const addBook = await booksApi.addListOfBooks(
        newUserId,
        isbn,
        newUserToken
      );
      expect(addBook.statusCode).toBe(201);
      expect(addBook.statusMessage).toBe("Created");
      expect(addBook.responseBody.books[0].isbn).toEqual(isbn);
      expect(addBook.statusCode).toBe(201);
    });

    await test.step("Step 4: Delete A Book From A User", async () => {
      const deleteBook = await booksApi.deleteBookByIsbn(
        newUserId,
        isbn,
        newUserToken
      );
      expect(deleteBook.statusCode).toBe(204);
    });

    await test.step("Step 5: Delete All Books From A User", async () => {
      const allBooks = await booksApi.getBooks();
      expect(allBooks.statusCode).toBe(200);
      isbn = allBooks.responseBody.books[1].isbn;
      const addBook = await booksApi.addListOfBooks(
        newUserId,
        isbn,
        newUserToken
      );
      expect(addBook.statusCode).toBe(201);
      const deleteBooks = await booksApi.deleteBooks(newUserId, newUserToken);
      expect(deleteBooks.statusCode).toBe(204);
    });

    await test.step("Step 6: Replase Book ISBN", async () => {
      const allBooks = await booksApi.getBooks();
      expect(allBooks.statusCode).toBe(200);
      isbn = allBooks.responseBody.books[0].isbn;
      let newIsbn = allBooks.responseBody.books[2].isbn;
      const addBook = await booksApi.addListOfBooks(
        newUserId,
        isbn,
        newUserToken
      );
      expect(addBook.statusCode).toBe(201);
      const updateBook = await booksApi.replaceBook(
        newUserId,
        isbn,
        newIsbn,
        newUserToken
      );
      expect(updateBook.statusCode).toBe(200);
      expect(updateBook.body.books[0].isbn).toEqual(newIsbn);
      expect(updateBook.body.userId).toEqual(newUserId);
    });
  });
});
