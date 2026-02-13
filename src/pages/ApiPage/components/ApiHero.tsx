import { define, computed, type Signal } from "@effuse/core";
import { i18nStore } from "../../../store/appI18n";
import { ApiSearch } from "./ApiSearch";

interface Props {
  query: string;
  onSearch: (e: Event) => void;
}

interface ScriptReturn {
  query: string;
  onSearch: (e: Event) => void;
  t: Signal<any>;
}

export const ApiHero = define<Props, ScriptReturn>({
  script: ({ props, useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.api.hero);
    return {
      query: props.query,
      onSearch: props.onSearch,
      t: tVal,
    };
  },
  template: ({ query, onSearch, t }) => (
    <section class="tagix-hero">
      <div class="tagix-hero-content">
        <div class="tagix-hero-split">
          <div class="tagix-hero-text">
            <div class="tagix-wordmark">
              <h1 class="tagix-wordmark-title">{() => t.value?.title}</h1>
            </div>
            <p class="tagix-tagline serif">{() => t.value?.tagline}</p>
            <ApiSearch query={query} onSearch={onSearch} />
          </div>
          <img
            src="/illustrations/feature_api.svg"
            alt="API Reference"
            class="tagix-hero-art"
            width="100"
            height="100"
          />
        </div>
      </div>
    </section>
  ),
});
