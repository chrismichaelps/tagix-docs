import { LOCALES } from "../../store/appI18n/constants";

export const LANGUAGE_LABELS = {
  [LOCALES.EN]: "English",
  [LOCALES.ES]: "Español",
} as const;

export const LANGUAGE_SELECTOR_CLASSES = {
  WRAPPER: "tagix-lang-selector-wrapper",
  BUTTON: "tagix-nav-link tagix-nav-button tagix-lang-selector-button",
  DROPDOWN: "tagix-lang-dropdown",
  ITEM: "tagix-lang-item",
  ACTIVE: "is-active",
  OPEN: "is-open",
} as const;
