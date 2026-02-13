import { createAction, createActionGroup } from "tagix";
import { Locale } from "./constants";
import { I18nStateType, I18nState } from "./state";

const setLocale = createAction<{ locale: Locale }, I18nStateType>("SetLocale")
  .withPayload({ locale: "en" as Locale })
  .withState((_, { locale }) => {
    return I18nState.Loading({ locale });
  });

const setReady = createAction<
  { locale: Locale; translations: Record<string, string> },
  I18nStateType
>("SetReady")
  .withPayload({ locale: "en" as Locale, translations: {} as Record<string, string> })
  .withState((_, { locale, translations }) => {
    return I18nState.Ready({ locale, translations });
  });

const setError = createAction<{ locale: Locale; message: string }, I18nStateType>("SetError")
  .withPayload({ locale: "en" as Locale, message: "" })
  .withState((_, { locale, message }) => {
    return I18nState.Error({ locale, message });
  });

export const i18nActions = createActionGroup("i18n", {
  setLocale,
  setReady,
  setError,
});
