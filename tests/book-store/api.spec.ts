import { expect, apiTest } from "../../fixtures/apiFixture.ts";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "../../utils/generateUserCreds.ts";
import { BookSchema } from "../../app/modules/book-store/api/support/models.ts";
import Ajv from "ajv";

const validateBookSchema = new Ajv().compile(BookSchema);

let token: string;
let myUsertoken: string;
const userName = generateRandomUsername();
const userPass = generateRandomPassword();

apiTest.describe.serial("API Tests", () => {
  let userId: string;

  apiTest(
    "@functional @api User API Requests",
    async ({ user, credentials }) => {
      await apiTest.step("Step 1: Create A New User", async () => {
        //Log in as admin, get a token for requests
        const generateTokenResponse = await user.generateToken(
          credentials.login,
          credentials.password
        );
        let myUsertoken = await generateTokenResponse.responseBody.token;

        //Create a new user
        const createdUser = await user.createUser(myUsertoken, {
          userName: userName,
          password: userPass,
        });

        //Assertions
        expect(createdUser.statusCode).toBe(201);
        expect(createdUser.statusMessage).toBe("Created");
        expect(createdUser.responseBody.username).toBe(userName);
        expect(createdUser.responseBody.books).toBeInstanceOf(Array);

        //Get a user ID and a new token for it
        userId = createdUser.responseBody.userID;
        const generateTokenForNewUser = await user.generateToken(
          userName,
          userPass
        );
        token = await generateTokenForNewUser.responseBody.token;
      });

      await apiTest.step(
        "Step 2: Check If The User Is Authorized",
        async () => {
          const isUserAuthorized = await user.isUserAuthorized(
            userName,
            userPass
          );
          expect(isUserAuthorized).toBe(true);
        }
      );

      await apiTest.step("Step 3: Get The User By ID", async () => {
        const newUser = await user.getUser(token, userId);
        expect(newUser.statusCode).toBe(200);
        expect(newUser.responseBody.userId).toBe(userId);
        expect(newUser.responseBody.username).toBe(userName);

        await apiTest.step("Step 4: Delete The User By ID", async () => {
          const isDeleted = await user.deleteUser(token, userId);
          expect(isDeleted.statusCode).toBe(204);
          expect(isDeleted.statusMessage).toBe("No Content");
        });
      });
    }
  );

  apiTest(
    "@functional @api Book Store API Requests",
    async ({ books, user }) => {
      let isbn: string;
      let newUserId: string;
      let newUserToken: string;

      await apiTest.step("Step 1: Get All Books", async () => {
        const allBooks = await books.getBooks();
        expect(allBooks.statusCode).toBe(200);
        expect(allBooks.statusMessage).toBe("OK");
        expect(allBooks.responseBody).toBeInstanceOf(Object);
        expect(allBooks.responseBody.books).toBeInstanceOf(Array);
        expect(allBooks.responseBody.books.length).toBeGreaterThan(0);
        isbn = allBooks.responseBody.books[0].isbn;
      });

      await apiTest.step("Step 2: Get Book By ISBN", async () => {
        const allBooks = await books.getBookByIsbn(isbn);
        expect(allBooks.statusCode).toBe(200);
        expect(allBooks.statusMessage).toBe("OK");

        //Schema validation
        const isSchemaValid = validateBookSchema(allBooks.responseBody);
        if (!isSchemaValid) {
          console.log(validateBookSchema.errors);
        }
        expect(isSchemaValid).toBe(true);
        expect(allBooks.responseBody.isbn).toEqual(isbn);
      });

      await apiTest.step("Step 3: Add A List Of Books To A User", async () => {
        //Create a new user
        const newUser = await user.createUser(myUsertoken, {
          userName: userName,
          password: userPass,
        });
        newUserId = newUser.responseBody.userID;
        const generateToken = await user.generateToken(userName, userPass);

        //Get a token for a new user
        newUserToken = await generateToken.responseBody.token;

        //Add book to the user
        const addBook = await books.addListOfBooks(
          newUserId,
          isbn,
          newUserToken
        );
        expect(addBook.statusCode).toBe(201);
        expect(addBook.statusMessage).toBe("Created");
        expect(addBook.responseBody.books[0].isbn).toEqual(isbn);
        expect(addBook.statusCode).toBe(201);
      });

      await apiTest.step("Step 4: Delete A Book From A User", async () => {
        const deleteBook = await books.deleteBookByIsbn(
          newUserId,
          isbn,
          newUserToken
        );
        expect(deleteBook.statusCode).toBe(204);
      });

      await apiTest.step("Step 5: Delete All Books From A User", async () => {
        //Add a book to a user
        const allBooks = await books.getBooks();
        expect(allBooks.statusCode).toBe(200);
        isbn = allBooks.responseBody.books[1].isbn;
        const addBook = await books.addListOfBooks(
          newUserId,
          isbn,
          newUserToken
        );
        expect(addBook.statusCode).toBe(201);

        //Delete book
        const deleteBooks = await books.deleteBooks(newUserId, newUserToken);
        expect(deleteBooks.statusCode).toBe(204);
      });

      await apiTest.step("Step 6: Replase Book ISBN", async () => {
        //Get ISBNs for two books
        const allBooks = await books.getBooks();
        expect(allBooks.statusCode).toBe(200);
        isbn = allBooks.responseBody.books[0].isbn;
        let newIsbn = allBooks.responseBody.books[2].isbn;

        //Add a book to the user
        const addBook = await books.addListOfBooks(
          newUserId,
          isbn,
          newUserToken
        );
        expect(addBook.statusCode).toBe(201);

        //Update a book
        const updateBook = await books.replaceBook(
          newUserId,
          isbn,
          newIsbn,
          newUserToken
        );
        expect(updateBook.statusCode).toBe(200);
        expect(updateBook.responseBody.books[0].isbn).toEqual(newIsbn);
        expect(updateBook.responseBody.userId).toEqual(newUserId);
      });
    }
  );
});
