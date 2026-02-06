import { appStore, AppState } from "./state";

export const isAppReady = (): boolean => AppState.$is("Ready")(appStore.stateValue);

export const isAppLoading = (): boolean => AppState.$is("Loading")(appStore.stateValue);

export const isAppError = (): boolean => AppState.$is("Error")(appStore.stateValue);

export const getAppErrorMessage = (): string | null =>
  AppState.$match({
    Loading: () => null,
    Ready: () => null,
    Error: (s) => s.message,
  })(appStore.stateValue);
