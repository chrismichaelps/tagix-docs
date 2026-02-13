export {
  appStore,
  AppState,
  type AppStateType,
  AppInitError,
  AppRuntimeError,
  isAppReady,
  isAppLoading,
  isAppError,
  getAppErrorMessage,
} from "./app";

export {
  docsStore,
  DocStatus,
  type DocStatusType,
  type DocPagesMap,
  DocsParseError,
  DocsNotFoundError,
  DocsLoadError,
  initDocs,
  getNavigation,
  getDocPage,
  getAllDocSlugs,
  isDocsReady,
  isDocsLoading,
  bootstrapDocs,
  type DocPage,
  type DocCategory,
  type DocSection,
  type DocCodeBlock,
} from "./docs";

export {
  themeStore,
  Theme,
  type ThemeStateType,
  ThemeInitError,
  ThemeSwitchError,
  applyTheme,
  getIsDark,
  getIsLight,
  getSystemPrefersDark,
  getSavedTheme,
  toggleThemeWithAnimation,
} from "./theme";

export {
  mobileMenuStore,
  MobileMenuState,
  type MobileMenuStateType,
  MobileMenuNotFoundError,
  updateMenuVisibility,
  isMenuVisible,
} from "./mobileMenu";

export { apiStore, ApiState, type ApiStateType, searchApi, resetApi } from "./api";
export {
  aboutDropdownStore,
  AboutDropdownState,
  closeAboutDropdown,
  toggleAboutDropdown,
} from "./aboutDropdown";
export { releasesStore, ReleasesState, fetchChangelog } from "./releases";
export {
  appI18nStore,
  I18nState,
  type I18nStateType,
  initI18n,
  switchLocale,
  t,
  i18n,
} from "./appI18n";

export type { ApiItem } from "../content/api_data";
