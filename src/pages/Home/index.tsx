import { define, useHead, effect, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { version } from "../../../node_modules/tagix/package.json" with { type: "json" };
import { i18nStore } from "../../store/appI18n";
import "./styles.css";

interface HomePageScriptReturn {
  t: Signal<any>;
  locale: Signal<string>;
}

export const HomePage = define<{}, HomePageScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.home);

    effect(() => {
      const homeVal = tVal.value;
      if (!homeVal) return;
      useHead({
        title: homeVal.head.title,
        description: homeVal.head.description,
      });
    });

    return {
      t: tVal,
      locale: store.locale,
    };
  },
  template: ({ t, locale }) => (
    <main class="tagix-home">
      <section class="tagix-hero">
        <div class="tagix-hero-content">
          <div class="tagix-hero-split">
            <div class="tagix-hero-text">
              <div class="tagix-wordmark">
                <span class="tagix-wordmark-title">Tagix</span>
              </div>
              <p class="tagix-tagline serif">{() => t.value?.hero.tagline}</p>
              <div class="tagix-button-group">
                <Link to="/docs" class="tagix-btn-primary">
                  <span>{() => t.value?.hero.getStarted}</span>
                </Link>
                <a
                  href="https://github.com/chrismichaelps/tagix"
                  class="tagix-btn-secondary"
                  target="_blank"
                  rel="noopener"
                >
                  <span>{() => t.value?.hero.viewOnGithub}</span>
                </a>
              </div>
            </div>
            <img
              src="/illustrations/home_hero_abstract.svg"
              alt="Tagix Abstract Art"
              class="tagix-hero-art"
              height="100px"
              width="100px"
            />
          </div>
        </div>
      </section>

      <section class="tagix-section">
        <h2 class="tagix-section-title">{() => t.value?.releases.title}</h2>
        <div class="tagix-updates-column">
          <div class="tagix-update-item">
            <div class="tagix-update-header">
              <span class="tagix-update-label">{() => t.value?.releases.new}</span>
              <p class="tagix-update-title">Tagix v{version}</p>
              <p class="tagix-update-date">
                {() =>
                  new Date(__TAGIX_RELEASE_DATE__).toLocaleDateString(
                    locale.value === "es" ? "es-ES" : "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                }
              </p>
            </div>
            <Link class="tagix-update-link" to="/releases">
              <span>{() => t.value?.releases.readMore}</span>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="currentColor">
                <path d="M4.14585 9.87492L14.4584 9.87492L9.60419 5.04158L10.5 4.14575L16.8542 10.4999L10.5 16.8541L9.60419 15.9583L14.4584 11.1249L4.14585 11.1249L4.14585 9.87492Z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section class="tagix-section">
        <h2 class="tagix-section-title">{() => t.value?.features.title}</h2>
        <p class="tagix-section-subtitle">{() => t.value?.features.subtitle}</p>

        <div class="tagix-grid">
          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_modular.svg"
                alt="Modular"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">{() => t.value?.features.taggedUnions.title}</h3>
            <p class="tagix-card-text">{() => t.value?.features.taggedUnions.description}</p>
          </div>

          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_reactive.svg"
                alt="Reactive"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">{() => t.value?.features.inferredActions.title}</h3>
            <p class="tagix-card-text">{() => t.value?.features.inferredActions.description}</p>
          </div>

          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_safe.svg"
                alt="Safe"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">{() => t.value?.features.patternMatching.title}</h3>
            <p class="tagix-card-text">{() => t.value?.features.patternMatching.description}</p>
          </div>
        </div>
      </section>
    </main>
  ),
});
