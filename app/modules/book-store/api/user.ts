import { type Page } from "@playwright/test";
import { ResponseData } from "./support/types";
import { EndpointGenerator } from "./support/endpoints";

const uri = EndpointGenerator.forUser();

export default class UserAPICalls {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isUserAuthorized(login: string, password: string): Promise<boolean> {
    try {
      const response = await this.page.request.post(`${uri}Authorized`, {
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
      }
      return body;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateToken(login: string, password: string): Promise<ResponseData> {
    try {
      const response = await this.page.request.post(`${uri}GenerateToken`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(
    token: string,
    payload: { userName: string; password: string }
  ): Promise<ResponseData> {
    try {
      const response = await this.page.request.post(`${uri}User`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser(token: string, userId: string): Promise<ResponseData> {
    try {
      const response = await this.page.request.get(`${uri}User/${userId}`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(
    token: string,
    userId: string
  ): Promise<Omit<ResponseData, "responseBody">> {
    try {
      const response = await this.page.request.delete(`${uri}User/${userId}`, {
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
    } catch (error) {
      throw new Error(error);
    }
  }
}
