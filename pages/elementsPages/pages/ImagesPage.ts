import { type Page, Locator, expect } from "@playwright/test";
import BasePage from "../../core/BasePage";
import { Image, Link, Text } from "../../../utils/services/uiService";
import { imagesSrc } from "../../../data/elementsData";

export class ImagesPage extends BasePage {
  readonly image: Image;
  readonly link: Link;
  readonly text: Text;
  readonly validImage: Locator;
  readonly brokenImage: Locator;
  readonly images: Locator;
  readonly validLink: Locator;
  readonly links: Locator;

  constructor(page: Page, url: string) {
    super(page, url);
    this.image = new Image(page);
    this.link = new Link(page);
    this.text = new Text(page);
    this.validImage = this.image.getImageBySrc(imagesSrc.validImage).nth(1);
    this.brokenImage = this.image.getImageBySrc(imagesSrc.brokenImage);
    this.images = this.image.getLocator("div#app img");
    this.links = this.link.getLocator("div#app").getByRole("link");
  }

  async findBrokenImage() {
    const url = `${process.env.URL}`.slice(0, -1);
    const allImages = await this.images.all();
    for await (const image of allImages) {
      const imageSrc = await image.getAttribute("src");
      expect.soft(imageSrc?.length).toBeGreaterThan(1);
      //@ts-ignore
      if (imageSrc?.length > 0) {
        const response = await this.page.request.get(`${url}${imageSrc}`);
        expect.soft(response.status()).toBe(200);
        await this.page.goto(`${url}${imageSrc}`);
        const title = await this.page.title();
        if (title === "DEMOQA") {
          throw new Error(`Here is a broken image: ${url}${imageSrc}`);
        } else await this.page.goBack();
      }
    }
  }

  async findBrokenLink() {
    const allLinks = await this.links.all();
    for (const link of allLinks) {
      const linkHref = await link.getAttribute("href");
      const response = await this.page.request.get(linkHref!);
      if (response.status() === 500) {
        throw new Error(`This is a broken link: ${linkHref}`);
      } else {
        expect.soft(response).toBeOK();
      }
    }
  }
}
