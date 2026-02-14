import { createI18n } from "@effuse/i18n";
import { LOCALES, Locale, LOCALE_STORAGE_KEY } from "./constants";

export const i18n = createI18n({
  defaultLocale: LOCALES.EN,
  fallbackLocale: LOCALES.EN,
  detectLocale: true,
  persistLocale: true,
});

export const isSupportedLocale = (locale: string | null): locale is Locale => {
  return locale !== null && Object.values(LOCALES).includes(locale as Locale);
};

export const getInitialLocale = (): Locale => {
  if (typeof localStorage === "undefined") return LOCALES.EN;

  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isSupportedLocale(saved)) return saved;

  const detected = i18n.getLocale();
  if (isSupportedLocale(detected)) return detected;

  return LOCALES.EN;
};
