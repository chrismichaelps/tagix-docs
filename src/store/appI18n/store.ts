import { createStore } from "tagix";
import { I18nState, type I18nStateType } from "./state";
import { i18nActions } from "./actions";
import { getInitialLocale } from "./instance";

export const appI18nStore = createStore<I18nStateType>(
  I18nState.Idle({ locale: getInitialLocale() }),
  I18nState,
  { name: "appI18n" }
);

appI18nStore.registerGroup(i18nActions);
