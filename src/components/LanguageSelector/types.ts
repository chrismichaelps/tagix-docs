import type { Signal } from "@effuse/core";
import type { Locale } from "../../store/appI18n";

export interface LanguageSelectorProps {}

export interface LanguageSelectorScriptReturn {
  isOpen: Signal<boolean>;
  currentLocale: Signal<Locale>;
  handleToggle: (e: Event) => void;
  handleSelect: (locale: Locale) => Promise<void>;
}
