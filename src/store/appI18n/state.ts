import { taggedEnum } from "tagix";
import { Locale } from "./constants";
import type { I18nLoadError as I18nLoadErrorType } from "./errors";

export const I18nState = taggedEnum({
  Idle: { locale: "" as Locale },
  Loading: { locale: "" as Locale },
  Ready: { locale: "" as Locale, translations: {} as any },
  Error: { locale: "" as Locale, message: "" },
});

export type I18nStateType = typeof I18nState.State;

export type TranslationData = Record<string, string>;

export const I18nLoadingState = taggedEnum({
  Idle: {},
  Loading: {},
  Success: { data: {} as TranslationData },
  Failure: { error: {} as I18nLoadErrorType },
});

export type I18nLoadingStateType = typeof I18nLoadingState.State;
