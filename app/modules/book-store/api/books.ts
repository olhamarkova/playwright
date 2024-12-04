import { type Page } from "@playwright/test";
import { ResponseData } from "./support/types";
import { EndpointGenerator } from "./support/endpoints";

const uri = EndpointGenerator.forBooks();

export default class BookStoreAPICalls {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getBooks(): Promise<ResponseData> {
    try {
      const response = await this.page.request.get(`${uri}Books`, {
        failOnStatusCode: false,
      });
      const body = await response.json();
      return {
        statusCode: response.status(),
        statusMessage: response.statusText(),
        responseBody: body,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBookByIsbn(isbn: string): Promise<ResponseData> {
    try {
      const response = await this.page.request.get(`${uri}Book`, {
        failOnStatusCode: false,
        params: { ISBN: isbn },
      });
      const body = await response.json();
      return {
        statusCode: response.status(),
        statusMessage: response.statusText(),
        responseBody: body,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async addListOfBooks(
    userId: string,
    isbn: string,
    token: string
  ): Promise<ResponseData> {
    try {
      const response = await this.page.request.post(`${uri}Books`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBooks(
    userId: string,
    token: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    try {
      const response = await this.page.request.delete(
        `${uri}Books?UserId=${userId}`,
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBookByIsbn(
    userId: string,
    isbn: string,
    token: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    try {
      const response = await this.page.request.delete(`${uri}Book`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async replaceBook(
    userId: string,
    isbn: string,
    newIsbn: string,
    token: string
  ): Promise<ResponseData> {
    try {
      const response = await this.page.request.put(`${uri}Books/${isbn}`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }
}
