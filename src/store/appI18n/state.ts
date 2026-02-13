import { taggedEnum } from "tagix";
import { Locale } from "./constants";

export const I18nState = taggedEnum({
  Idle: { locale: "" as Locale },
  Loading: { locale: "" as Locale },
  Ready: { locale: "" as Locale, translations: {} as any },
  Error: { locale: "" as Locale, message: "" },
});

export type I18nStateType = typeof I18nState.State;
