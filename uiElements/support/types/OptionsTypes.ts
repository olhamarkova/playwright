import { Locator } from "@playwright/test";

export type GetLocatorOptions = {
  has?: Locator;
  hasNot?: Locator;
  hasNotText?: string | RegExp;
  hasText?: string | RegExp;
};

export type GetByRoleOptions = {
  checked?: boolean;
  disabled?: boolean;
  exact?: boolean;
  expanded?: boolean;
  includeHidden?: boolean;
  level?: number;
  name?: string | RegExp;
  pressed?: boolean;
  selected?: boolean;
};

export type ClickOptions = {
  button?: "left" | "right" | "middle";
  clickCount?: number;
  delay?: number;
  force?: boolean;
  modifiers?: Array<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift">;
  noWaitAfter?: boolean;
  position?: {
    x: number;
    y: number;
  };
  timeout?: number;
  trial?: boolean;
};

export type CheckOptions = {
  force?: boolean;
  noWaitAfter?: boolean;
  position?: {
    x: number;
    y: number;
  };
  timeout?: number;
  trial?: boolean;
};

export type TextOptions = {
  ignoreCase?: boolean;
  timeout?: number;
  useInnerText?: boolean;
};
