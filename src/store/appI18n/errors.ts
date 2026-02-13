import { TaggedError } from "tagix";

export const I18nLoadError = TaggedError("I18nLoadError");
export type I18nLoadError = InstanceType<typeof I18nLoadError>;

export const I18nInvalidLocaleError = TaggedError("I18nInvalidLocaleError");
export type I18nInvalidLocaleError = InstanceType<typeof I18nInvalidLocaleError>;
