import { define, useHead, effect, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { i18nStore } from "../../store/appI18n";
import { initPageAnimations } from "../../utils/animations";
import "../../styles.css";

interface NotFoundPageScriptReturn {
  t: Signal<any>;
}

export const NotFoundPage = define<{}, NotFoundPageScriptReturn>({
  script: ({ onMount, useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.notFound);

    effect(() => {
      const nfT = tVal.value;
      if (!nfT) return;
      useHead({
        title: nfT.head.title,
        description: nfT.head.description,
      });
    });

    onMount(() => {
      setTimeout(() => {
        initPageAnimations();
      }, 100);

      return () => {};
    });

    return { t: tVal };
  },
  template: ({ t }) => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-hero">
          <div class="tagix-hero-content">
            <div class="tagix-wordmark">
              <img
                src="/illustrations/not_found.svg"
                alt="404 Illustration"
                class="tagix-hero-art"
                style="width: 300px; height: 300px;"
              />
            </div>
            <h1 class="tagix-section-title" style="margin-bottom: 1rem;">
              {() => t.value?.hero.title}
            </h1>
            <p class="tagix-tagline serif">{() => t.value?.hero.tagline}</p>
            <div class="tagix-button-group">
              <Link to="/" class="tagix-btn-primary">
                {() => t.value?.hero.returnHome}
              </Link>
              <Link to="/docs" class="tagix-btn-secondary">
                {() => t.value?.hero.viewDocs}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
