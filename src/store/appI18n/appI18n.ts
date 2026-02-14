import { signal, computed } from "@effuse/core";
import { I18nState, I18nStateType } from "./state";
import { appI18nStore } from "./store";
import { i18n } from "./instance";
import { switchLocale, initI18n } from "./utils";

const stateSignal = signal<I18nStateType>(appI18nStore.stateValue);

appI18nStore.subscribe((state) => {
  stateSignal.value = state;
});

const localeComputed = computed(() => {
  return I18nState.$match(stateSignal.value, {
    Idle: (s) => s.locale,
    Loading: (s) => s.locale,
    Ready: (s) => s.locale,
    Error: (s) => s.locale,
  });
});

const translationsComputed = computed(() => {
  return I18nState.$match(stateSignal.value, {
    Idle: () => null,
    Loading: () => null,
    Ready: (s) => s.translations,
    Error: () => null,
  });
});

const isLoadingComputed = computed(() => {
  return I18nState.$is("Loading")(stateSignal.value);
});

export const i18nStore = {
  get locale() {
    return localeComputed;
  },
  get isLoading() {
    return isLoadingComputed;
  },
  get translations() {
    return translationsComputed;
  },
  setLocale: switchLocale,
  init: initI18n,
  subscribe: appI18nStore.subscribe.bind(appI18nStore),
  get stateValue() {
    return appI18nStore.stateValue;
  },
};

export const t = i18n.t;
export { i18n };
