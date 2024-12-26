import { type Page, APIResponse, Locator, expect } from "@playwright/test";
import BasePage from "../../core/BasePage";
import {
  Image,
  Link,
  Text,
} from "../../../components/support/component-service";
import { imagesSrc, subHeadingsText } from "../support/data";

export class ImagesPage extends BasePage {
  private readonly image: Image;
  private readonly link: Link;
  private readonly text: Text;

  private readonly validImage: Locator;
  private readonly brokenImage: Locator;
  private readonly images: Locator;
  private readonly links: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.image = new Image(page);
    this.link = new Link(page);
    this.text = new Text(page);

    this.validImage = this.image.getImageBySrc(imagesSrc.validImage).nth(1);
    this.brokenImage = this.image.getImageBySrc(imagesSrc.brokenImage);
    this.images = this.image.getByLocator("div.col-md-6").getByRole("img");
    this.links = this.link.getByLocator("div.col-md-6").getByRole("link");
  }

  private getUrl(): string {
    const url = `${process.env.URL}`.slice(0, -1);
    return url;
  }

  private async getAll(element: Locator): Promise<Locator[]> {
    return await element.all();
  }

  private async getAttribute(
    element: Locator,
    attribute: "src" | "href"
  ): Promise<string | null> {
    return await element.getAttribute(attribute);
  }

  private sendError(item: string | Locator): never {
    throw new Error(`This is a broken image: ${item}`);
  }

  private async sendRequest(url: string): Promise<APIResponse> {
    return await this.page.request.get(url);
  }

  private async verifyResponse(response: APIResponse): Promise<void> {
    expect.soft(response.status()).toBe(200);
  }

  private addToList(list: string[], item: string): void {
    list.push(`This is a broken link: ${item}`);
  }

  private showInConsole(message: string | string[]): void {
    console.log(message);
  }

  private isStatusNotOk(response: APIResponse): boolean {
    if (response.status() === 500 || response.status() === 400) {
      return true;
    } else return false;
  }
  private isSrcValid(src: string | null): boolean {
    if (src || src!.length !== 0) {
      return true;
    } else return false;
  }

  private isSrcNotEmpty(src: string | null): boolean {
    return src!.length > 0 ? true : false;
  }

  async findBrokenImage(): Promise<void> {
    const url = this.getUrl();
    const allImages = await this.getAll(this.images);
    for await (const image of allImages) {
      const imageSrc = await this.getAttribute(image, "src");
      if (!this.isSrcValid(imageSrc)) {
        this.sendError(image);
      } else if (this.isSrcNotEmpty(imageSrc)) {
        const response = await this.sendRequest(`${url}${imageSrc}`);
        await this.verifyResponse(response);
      } else this.sendError(imageSrc!);
    }
  }

  async findBrokenLink(): Promise<void> {
    const brokenLinks: string[] = [];
    const allLinks = await this.getAll(this.links);
    for (const link of allLinks) {
      const linkHref = await this.getAttribute(link, "href");
      const response = await this.sendRequest(linkHref!);
      if (this.isStatusNotOk(response)) {
        this.addToList(brokenLinks, linkHref!);
      } else {
        this.verifyResponse(response);
      }
    }
    this.showInConsole(brokenLinks);
  }

  async verifySubHeadings(): Promise<void> {
    for (let i = 0; i < subHeadingsText.length; i++) {
      await this.text.isVisible(this.text.getByText(subHeadingsText[i]));
    }
  }

  async verifyLinkVisible(anchor: string): Promise<void> {
    await this.link.isVisible(this.link.getByText(anchor));
  }

  async verifyImageVisible(
    image: "valid" | "broken",
    isVisible = true
  ): Promise<void> {
    await this.image.isVisible(
      image === "valid" ? this.validImage : this.brokenImage,
      isVisible
    );
  }
}
