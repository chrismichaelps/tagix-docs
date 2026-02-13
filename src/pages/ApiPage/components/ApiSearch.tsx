import { define, computed, type Signal } from "@effuse/core";
import { i18nStore } from "../../../store/appI18n";

interface Props {
  query: string;
  onSearch: (e: Event) => void;
}

interface ScriptReturn {
  query: string;
  onSearch: (e: Event) => void;
  inputRef: (el: Element) => void;
  clearSearch: () => void;
  t: Signal<any>;
}

export const ApiSearch = define<Props, ScriptReturn>({
  script: ({ props, useStore }) => {
    let inputEl: HTMLInputElement | null = null;
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.api.hero);

    const inputRef = (el: Element) => {
      inputEl = el as HTMLInputElement;
    };

    return {
      query: props.query,
      onSearch: props.onSearch,
      t: tVal,
      inputRef,
      clearSearch: () => {
        props.onSearch({ target: { value: "" } } as any);
        if (inputEl) inputEl.focus();
      },
    };
  },
  template: ({ query, onSearch, t, inputRef, clearSearch }) => (
    <div class="relative max-w-[500px] w-full group transition-transform duration-200 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[var(--tagix-text-muted)] pointer-events-none transition-colors group-focus-within:text-[var(--tagix-accent)]">
        <img
          src="/icons/search.svg"
          alt="search"
          class="w-5 h-5 opacity-60 group-focus-within:opacity-100 transition-opacity"
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={(() => t.value?.searchPlaceholder) as any}
        value={query}
        onInput={onSearch}
        class="tagix-input w-full pl-12 pr-12 py-3 bg-[var(--tagix-bg-elevated)] border border-[var(--tagix-border-subtle)] rounded-xl outline-none focus:border-[var(--tagix-accent)] transition-all"
        style="box-shadow: 0 2px 8px rgba(0,0,0,0.02);"
        autofocus
      />
      {() =>
        query && (
          <button
            onClick={clearSearch}
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-[var(--tagix-text-muted)] hover:text-[var(--tagix-accent)] transition-colors p-1"
            aria-label="Clear search"
          >
            <img src="/icons/close.svg" alt="clear" class="w-4 h-4 opacity-50 hover:opacity-100" />
          </button>
        )
      }
    </div>
  ),
});
