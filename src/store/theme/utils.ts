import { STORAGE_KEYS } from "../../constants";
import { animateThemeTransition } from "../../utils/animations";
import { THEME_VALUES } from "./constants";

export function applyTheme(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem(STORAGE_KEYS.THEME, THEME_VALUES.DARK);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem(STORAGE_KEYS.THEME, THEME_VALUES.LIGHT);
  }
}

export const getSystemPrefersDark = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const getSavedTheme = (): typeof THEME_VALUES.LIGHT | typeof THEME_VALUES.DARK | null => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === THEME_VALUES.LIGHT || saved === THEME_VALUES.DARK) return saved;
  return null;
};

export function getIsDarkFromStore(): boolean {
  const { Theme, themeStore } = require("./state");
  return Theme.$is("Dark")(themeStore.stateValue);
}

export function getIsLightFromStore(): boolean {
  const { Theme, themeStore } = require("./state");
  return Theme.$is("Light")(themeStore.stateValue);
}

export function toggleThemeWithAnimation(): void {
  const isDark = getIsDarkFromStore();
  const newIsDark = !isDark;

  animateThemeTransition(() => {
    applyTheme(newIsDark);
  });
}
