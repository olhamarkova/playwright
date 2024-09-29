// import { expect, type Locator, type Page } from "@playwright/test";
// import { InnerPage } from "../../core/InnerPage";
// import { TextBoxElementID } from "../ElementsTypes";

// export class TextBoxPage extends InnerPage {
//   readonly fullNameInput: Locator;
//   readonly emailInput: Locator;
//   readonly currentAddressInput: Locator;
//   readonly permanentAddress: Locator;
//   readonly submitButton: Locator;
//   readonly output: Locator;
//   readonly emailBorderCss: string;

//   constructor(page: Page, url: string) {
//     super(page, url);
//     this.emailBorderCss = "1px solid rgb(255, 0, 0)";
//     this.fullNameInput = this.page.locator("#userName");
//     this.emailInput = this.page.locator("#userEmail");
//     this.currentAddressInput = this.page.locator(
//       "textarea[id='currentAddress']"
//     );
//     this.permanentAddress = this.page.locator(
//       "textarea[id='permanentAddress']"
//     );
//     this.submitButton = this.page.locator("#submit");
//     this.output = this.page.locator("#output");
//   }

//   userInfoOutput(elementId: TextBoxElementID) {
//     return this.output.locator(`#${elementId}`);
//   }

//   async validateUserInfoOutput(elementId: TextBoxElementID, text: string) {
//     switch (elementId) {
//       case "name":
//         await expect(this.userInfoOutput(elementId)).toHaveText(`Name:${text}`);
//         break;
//       case "email":
//         await expect(this.userInfoOutput(elementId)).toHaveText(
//           `Email:${text}`
//         );
//         break;
//       case "currentAddress":
//         await expect(this.userInfoOutput(elementId)).toHaveText(
//           `Current Address :${text}`
//         );
//         break;
//       case "permanentAddress":
//         await expect(this.userInfoOutput(elementId)).toHaveText(
//           `Permananet Address :${text}`
//         );
//         break;
//       default:
//         console.log("Something went wrong. Please check your data");
//     }
//   }
// }
