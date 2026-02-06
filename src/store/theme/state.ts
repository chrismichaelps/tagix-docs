import { createStore, taggedEnum, createAction } from "tagix";
import { ACTION_TYPES, STORE_NAME, THEME_VALUES } from "./constants";
import { ThemeInitError } from "./error";
import { applyTheme, getSystemPrefersDark, getSavedTheme } from "./utils";
import { animateThemeTransition } from "../../utils/animations";
import { logger } from "../../utils/logger";

export const Theme = taggedEnum({
  Light: {},
  Dark: {},
});

export type ThemeStateType = typeof Theme.State;

export const initTheme = createAction<undefined, ThemeStateType>(ACTION_TYPES.INIT_THEME)
  .withPayload(undefined)
  .withState((s) => {
    if (typeof window === "undefined") return s;

    try {
      const savedTheme = getSavedTheme();
      const prefersDark = getSystemPrefersDark();
      const shouldBeDark = savedTheme === THEME_VALUES.DARK || (!savedTheme && prefersDark);

      const newState = shouldBeDark ? Theme.Dark({}) : Theme.Light({});
      applyTheme(shouldBeDark);
      return newState;
    } catch (error) {
      const themeError = new ThemeInitError({
        cause: error,
        message: "Failed to initialize theme",
      });
      logger.error(themeError, { tag: "ThemeStore" });
      return Theme.Light({});
    }
  });

export const setTheme = createAction<{ isDark: boolean; animate?: boolean }, ThemeStateType>(
  ACTION_TYPES.SET_THEME
)
  .withPayload({ isDark: false, animate: true })
  .withState((_, p) => {
    const { isDark, animate } = p;

    if (animate && typeof window !== "undefined") {
      animateThemeTransition(() => {
        applyTheme(isDark);
      });
    } else {
      applyTheme(isDark);
    }

    return isDark ? Theme.Dark({}) : Theme.Light({});
  });

export const toggleTheme = createAction<undefined, ThemeStateType>(ACTION_TYPES.TOGGLE_THEME)
  .withPayload(undefined)
  .withState((s) => {
    const isDark = Theme.$is("Dark")(s);
    const newIsDark = !isDark;

    animateThemeTransition(() => {
      applyTheme(newIsDark);
    });

    return newIsDark ? Theme.Dark({}) : Theme.Light({});
  });

export const themeStore = createStore(Theme.Light({}), Theme, { name: STORE_NAME });

themeStore.register(ACTION_TYPES.INIT_THEME, initTheme);
themeStore.register(ACTION_TYPES.SET_THEME, setTheme);
themeStore.register(ACTION_TYPES.TOGGLE_THEME, toggleTheme);

export const initializeTheme = () => themeStore.dispatch(initTheme);
export const setThemeMode = (isDark: boolean, animate?: boolean) =>
  themeStore.dispatch(setTheme, { isDark, animate });
export const toggleThemeMode = () => themeStore.dispatch(toggleTheme);

themeStore.dispatch(initTheme);
