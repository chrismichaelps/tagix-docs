import { define, useHead, effect, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { i18nStore } from "../../store/appI18n";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

interface ScriptReturn {
  t: Signal<any>;
}

export const PrivacyPage = define<{}, ScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.legal.privacy);

    effect(() => {
      const privacyT = tVal.value;
      if (!privacyT) return;
      useHead({
        title: privacyT.head.title,
        description: privacyT.head.description,
      });
    });

    setTimeout(() => initPageAnimations(), 100);

    return { t: tVal };
  },
  template: ({ t }) => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-section">
          <div class="tagix-section-content tagix-section-narrow">
            <div class="tagix-hero-split">
              <div class="tagix-hero-text">
                <h1 class="tagix-page-title">{() => t.value?.title}</h1>
                <p class="tagix-page-date">{() => t.value?.updated}</p>
              </div>
              <img
                src="/illustrations/privacy.svg"
                alt="Privacy Policy Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <h2>{() => t.value?.sections.collect.title}</h2>
              <p class="serif">{() => t.value?.sections.collect.content}</p>

              <h2>{() => t.value?.sections.website.title}</h2>
              <p class="serif">{() => t.value?.sections.website.content}</p>

              <h2>{() => t.value?.sections.thirdParty.title}</h2>
              <p class="serif">{() => t.value?.sections.thirdParty.content}</p>

              <h2>{() => t.value?.sections.openSource.title}</h2>
              <p class="serif">{() => t.value?.sections.openSource.content}</p>

              <h2>{() => t.value?.sections.changes.title}</h2>
              <p class="serif">{() => t.value?.sections.changes.content}</p>

              <h2>{() => t.value?.sections.contact.title}</h2>
              <p class="serif">
                {() => t.value?.sections.contact.content.replace("{link}", "")}
                <Link to="/contact">{() => t.value?.contactPageLink}</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
