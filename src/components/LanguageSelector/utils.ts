import { Locale } from "../../store/appI18n/constants";
import { LANGUAGE_LABELS } from "./constants";

export const getLanguageLabel = (locale: Locale): string => {
  return LANGUAGE_LABELS[locale] || locale;
};
