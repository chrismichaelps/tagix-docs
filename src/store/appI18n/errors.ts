import { TaggedError } from "tagix";

export const I18nLoadError = TaggedError("I18nLoadError");
export type I18nLoadError = TaggedError<"I18nLoadError"> & Record<string, unknown>;

export const I18nInvalidLocaleError = TaggedError("I18nInvalidLocaleError");
export type I18nInvalidLocaleError = TaggedError<"I18nInvalidLocaleError"> &
  Record<string, unknown>;
