import { expect, type Page } from "@playwright/test";
import { ResponseData } from "./support/types";

export default class UserAPICalls {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async token(login: string, password: string): Promise<string> {
    return (await this.generateToken(login, password)).responseBody.token;
  }

  async isUserAuthorized(login: string, password: string): Promise<boolean> {
    const response = await this.page.request.post("Account/v1/Authorized", {
      data: {
        userName: login,
        password: password,
      },
    });
    const body = await response.json();
    if (response.status() !== 200) {
      throw `Error: ${response.status()} ${response.statusText()}} message: ${
        body.message
      }`;
    } else if (!body) {
      expect(response.ok()).toBeTruthy();
      expect(body).toBe(false);
    }
    return body;
  }

  async generateToken(login: string, password: string): Promise<ResponseData> {
    const response = await this.page.request.post("Account/v1/GenerateToken", {
      failOnStatusCode: false,
      data: {
        userName: login,
        password: password,
      },
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }

  async createUser(
    token: string,
    payload: { userName: string; password: string }
  ): Promise<ResponseData> {
    const response = await this.page.request.post("Account/v1/User", {
      failOnStatusCode: false,
      data: {
        userName: payload.userName,
        password: payload.password,
      },
      headers: {
        Authorization: token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
      responseBody: body,
    };
  }

  async getUser(token: string, userId: string): Promise<ResponseData> {
    const response = await this.page.request.get(`Account/v1/User/${userId}`, {
      failOnStatusCode: false,
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

  async deleteUser(
    token: string,
    userId: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    const response = await this.page.request.delete(
      `Account/v1/User/${userId}`,
      {
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
    };
  }
}
