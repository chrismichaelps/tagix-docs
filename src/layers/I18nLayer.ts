import { defineLayer } from "@effuse/core";
import { i18nStore } from "../store/appI18n";

export const I18nLayer = defineLayer({
  name: "i18n",
  dependencies: ["router"],
  store: i18nStore,
  deriveProps: (store) => ({
    locale: store.locale,
    isLoading: store.isLoading,
    translations: store.translations,
  }),
  provides: {
    i18n: () => i18nStore,
  },
  onMount: async (ctx) => {
    await ctx.store.init();
  },
  onError: async (_, ctx) => {
    await ctx.store.setLocale("en");
  },
});
