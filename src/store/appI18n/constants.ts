export const LOCALES = {
  EN: "en",
  ES: "es",
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const LOCALE_STORAGE_KEY = "tagix:locale";
export const LOCALES_PATH = "/locales";
