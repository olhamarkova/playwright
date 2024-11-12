import { request, BrowserContext } from "@playwright/test";

export default class BookStoreAPICalls {
  readonly context: BrowserContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  async getBooks() {
    const apiContext = await request.newContext();
    const response = await apiContext.get("BookStore/v1/Books", {
      failOnStatusCode: false,
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }

  async getBookByIsbn(isbn: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.get("BookStore/v1/Book", {
      failOnStatusCode: false,
      params: { ISBN: isbn },
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }

  async addListOfBooks(userId: string, isbn: string, token: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.post("BookStore/v1/Books", {
      failOnStatusCode: false,
      data: {
        userId: userId,
        collectionOfIsbns: [
          {
            isbn: isbn,
          },
        ],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }
}
