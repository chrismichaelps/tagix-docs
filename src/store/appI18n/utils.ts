import { matchEither, tryCatchAsync } from "tagix";
import { LOCALES_PATH, LOCALE_STORAGE_KEY, Locale } from "./constants";
import { I18nLoadError, I18nInvalidLocaleError } from "./errors";
import { I18nLoadingState, type I18nLoadingStateType, type TranslationData } from "./state";
import { i18n, isSupportedLocale } from "./instance";
import { appI18nStore } from "./store";
import { i18nActions } from "./actions";

export async function loadTranslations(locale: string): Promise<I18nLoadingStateType> {
  const result = await tryCatchAsync(
    async () => {
      const response = await fetch(`${LOCALES_PATH}/${locale}.json`);
      if (!response.ok) {
        throw new I18nLoadError({
          message: `HTTP error! status: ${response.status}`,
        } as Record<string, unknown>);
      }
      return (await response.json()) as TranslationData;
    },
    (e): I18nLoadError => {
      const args: Record<string, unknown> = {
        message: e instanceof Error ? e.message : "Unknown error",
        cause: e,
      };
      return new I18nLoadError(args);
    }
  );

  return matchEither(result, {
    onLeft: (error): I18nLoadingStateType => I18nLoadingState.Failure({ error }),
    onRight: (data): I18nLoadingStateType => I18nLoadingState.Success({ data }),
  });
}

export const initI18n = async () => {
  const locale = appI18nStore.stateValue.locale;

  appI18nStore.dispatch(i18nActions.setLocale, { locale });

  const result = await loadTranslations(locale);

  I18nLoadingState.$match(result, {
    Success: ({ data }) => {
      appI18nStore.dispatch(i18nActions.setReady, { locale, translations: data });
    },
    Failure: ({ error }) => {
      appI18nStore.dispatch(i18nActions.setError, { locale, message: error.message });
    },
    Idle: () => {},
    Loading: () => {},
  });
};

export const switchLocale = async (locale: Locale) => {
  if (!isSupportedLocale(locale)) {
    appI18nStore.dispatch(i18nActions.setError, {
      locale: i18n.getLocale() as Locale,
      message: new I18nInvalidLocaleError({
        message: `Cannot switch to unsupported locale: ${locale}`,
      } as Record<string, unknown>).message,
    });
    return;
  }

  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  await i18n.setLocale(locale);
  appI18nStore.dispatch(i18nActions.setLocale, { locale });

  const result = await loadTranslations(locale);

  I18nLoadingState.$match(result, {
    Success: ({ data }) => {
      appI18nStore.dispatch(i18nActions.setReady, { locale, translations: data });
    },
    Failure: ({ error }) => {
      appI18nStore.dispatch(i18nActions.setError, { locale, message: error.message });
    },
    Idle: () => {},
    Loading: () => {},
  });
};
