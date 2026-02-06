export const ACTION_TYPES = {
  INIT_THEME: "InitTheme",
  SET_THEME: "SetTheme",
  TOGGLE_THEME: "ToggleTheme",
} as const;

export const STORE_NAME = "theme";

export const THEME_VALUES = {
  LIGHT: "light",
  DARK: "dark",
} as const;
