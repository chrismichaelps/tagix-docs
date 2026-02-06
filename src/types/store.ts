type ThemeLight = { readonly _tag: "Light" };
type ThemeDark = { readonly _tag: "Dark" };
export type ThemeState = ThemeLight | ThemeDark;

export interface ThemeStoreState {
  theme: ThemeState;
  isDark: boolean;
}

export interface ThemeStoreActions {
  toggleTheme: () => void;
  setTheme: (isDark: boolean, animate?: boolean) => void;
  initTheme: () => void;
}

type AppLoading = { readonly _tag: "Loading" };
type AppReady = { readonly _tag: "Ready" };
type AppError = { readonly _tag: "Error"; readonly message: string };
export type AppState = AppLoading | AppReady | AppError;

export interface AppStoreState {
  appState: AppState;
  isLoading: boolean;
}

export interface AppStoreActions {
  setReady: () => void;
  setError: (message: string) => void;
  getErrorMessage: () => string | null;
}
