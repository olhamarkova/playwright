import { expect, request, BrowserContext } from "@playwright/test";

export default class UserAPICalls {
  readonly context: BrowserContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  async token(login: string, password: string): Promise<string> {
    return (await this.generateToken(login, password)).responseBody.token;
  }

  async isUserAuthorized(login: string, password: string): Promise<boolean> {
    const apiContext = await request.newContext();
    const response = await apiContext.post("Account/v1/Authorized", {
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

  async generateToken(login: string, password: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.post("Account/v1/GenerateToken", {
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
  ) {
    const apiContext = await request.newContext();
    const response = await apiContext.post("Account/v1/User", {
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

  async getUser(token: string, userId: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(`Account/v1/User/${userId}`, {
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

  async deleteUser(token: string, userId: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(`Account/v1/User/${userId}`, {
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return {
      statusCode: response.status(),
      statusMessage: response.statusText(),
    };
  }
}
