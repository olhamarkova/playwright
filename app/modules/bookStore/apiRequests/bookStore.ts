import { type Page } from "@playwright/test";
import { ResponseData } from "./support/types";

export default class BookStoreAPICalls {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getBooks(): Promise<ResponseData> {
    const response = await this.page.request.get("BookStore/v1/Books", {
      failOnStatusCode: false,
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }

  async getBookByIsbn(isbn: string): Promise<ResponseData> {
    const response = await this.page.request.get("BookStore/v1/Book", {
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

  async addListOfBooks(
    userId: string,
    isbn: string,
    token: string
  ): Promise<ResponseData> {
    const response = await this.page.request.post("BookStore/v1/Books", {
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

  async deleteBooks(
    userId: string,
    token: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    const response = await this.page.request.delete(
      `BookStore/v1/Books?UserId=${userId}`,
      {
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
    };
  }

  async deleteBookByIsbn(
    userId: string,
    isbn: string,
    token: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    const response = await this.page.request.delete("BookStore/v1/Book", {
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        isbn,
        userId,
      },
    });
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
    };
  }

  async replaceBook(
    userId: string,
    isbn: string,
    newIsbn: string,
    token: string
  ): Promise<ResponseData> {
    const response = await this.page.request.put(`BookStore/v1/Books/${isbn}`, {
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        isbn: newIsbn,
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
