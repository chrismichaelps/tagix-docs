import { define, signal, For } from "@effuse/core";
import { createStore } from "tagix";
import { LanguageSelectorState, LanguageSelectorStateType } from "./state";
import { langSelectorActions } from "./actions";
import { LANGUAGE_SELECTOR_CLASSES } from "./constants";
import { getLanguageLabel } from "./utils";
import { i18nStore, Locale, LOCALES } from "../../store/appI18n";
import type { LanguageSelectorProps, LanguageSelectorScriptReturn } from "./types";

const store = createStore<LanguageSelectorStateType>(
  LanguageSelectorState.Closed({}),
  LanguageSelectorState,
  { name: "LanguageSelector" }
);

store.registerGroup(langSelectorActions);

export const LanguageSelector = define<LanguageSelectorProps, LanguageSelectorScriptReturn>({
  script: ({ useCallback, onMount }) => {
    const isOpen = signal(false);
    const currentLocale = signal<Locale>(i18nStore.locale.value);

    const unsubscribeStore = store.subscribe((state) => {
      isOpen.value = LanguageSelectorState.$is("Open")(state);
    });

    const unsubscribeI18n = i18nStore.subscribe(() => {
      currentLocale.value = i18nStore.locale.value;
    });

    const handleToggle = useCallback((e: Event) => {
      e.stopPropagation();
      store.dispatch(langSelectorActions.toggle);
    });

    const handleSelect = useCallback(async (locale: Locale) => {
      await i18nStore.setLocale(locale);
      store.dispatch(langSelectorActions.close);
    });

    const handleClickOutside = useCallback(() => {
      if (isOpen.value) {
        store.dispatch(langSelectorActions.close);
      }
    });

    onMount(() => {
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
        unsubscribeStore();
        unsubscribeI18n();
      };
    });

    return {
      isOpen,
      currentLocale,
      handleToggle,
      handleSelect,
    };
  },
  template: ({ isOpen, currentLocale, handleToggle, handleSelect }) => (
    <div class={`${LANGUAGE_SELECTOR_CLASSES.WRAPPER} ${isOpen.value ? "is-open" : ""}`}>
      <button
        class={LANGUAGE_SELECTOR_CLASSES.BUTTON}
        onClick={handleToggle}
        aria-label="Select Language"
      >
        <img
          src="/icons/languages.svg"
          alt="Languages"
          class="tagix-nav-icon"
          width="22"
          height="22"
        />
      </button>

      <div class={LANGUAGE_SELECTOR_CLASSES.DROPDOWN}>
        <div class="tagix-lang-list">
          <For each={signal(Object.values(LOCALES))}>
            {(locale) => (
              <button
                class={`${LANGUAGE_SELECTOR_CLASSES.ITEM} ${
                  currentLocale.value === locale.value ? "is-active" : ""
                }`}
                onClick={() => handleSelect(locale.value as Locale)}
              >
                <div class="tagix-lang-item-content">
                  <span class="tagix-lang-item-label">
                    {getLanguageLabel(locale.value as Locale)}
                  </span>
                  <span class="tagix-lang-item-arrow">↗</span>
                </div>
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  ),
});

export * from "./constants";
export * from "./state";
export * from "./actions";
export * from "./utils";
export * from "./types";
