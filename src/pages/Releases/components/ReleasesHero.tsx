import { define, computed, type Signal } from "@effuse/core";
import { i18nStore } from "../../../store/appI18n";

interface ScriptReturn {
  t: Signal<any>;
}

export const ReleasesHero = define<{}, ScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.releases.hero);
    return {
      t: tVal,
    };
  },
  template: ({ t }) => (
    <section class="tagix-hero">
      <div class="tagix-hero-content">
        <div class="tagix-hero-split">
          <div class="tagix-hero-text">
            <div class="tagix-wordmark">
              <h1 class="tagix-wordmark-title">{() => t.value?.title}</h1>
            </div>
            <p class="tagix-tagline serif">{() => t.value?.tagline}</p>
          </div>
          <img
            src="/illustrations/releases.svg"
            alt="Releases"
            class="tagix-hero-art"
            width="100"
            height="100"
          />
        </div>
      </div>
    </section>
  ),
});
