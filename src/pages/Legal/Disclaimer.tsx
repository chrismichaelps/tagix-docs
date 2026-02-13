import { define, useHead, effect, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { i18nStore } from "../../store/appI18n";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

interface ScriptReturn {
  t: Signal<any>;
}

export const DisclaimerPage = define<{}, ScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.legal.disclaimer);

    effect(() => {
      const disclaimerT = tVal.value;
      if (!disclaimerT) return;
      useHead({
        title: disclaimerT.head.title,
        description: disclaimerT.head.description,
      });
    });

    setTimeout(() => initPageAnimations(), 100);

    return { t: tVal };
  },
  template: ({ t }) => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-section">
          <div class="tagix-section-content tagix-section-narrow internal-nav-fix">
            <div class="tagix-hero-split">
              <div class="tagix-hero-text">
                <h1 class="tagix-page-title">{() => t.value?.title}</h1>
                <p class="tagix-page-date">{() => t.value?.updated}</p>
              </div>
              <img
                src="/illustrations/disclaimer.svg"
                alt="Disclaimer Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <h2>{() => t.value?.sections.general.title}</h2>
              <p class="serif">{() => t.value?.sections.general.content}</p>

              <h2>{() => t.value?.sections.advice.title}</h2>
              <p class="serif">{() => t.value?.sections.advice.content}</p>

              <h2>{() => t.value?.sections.links.title}</h2>
              <p class="serif">{() => t.value?.sections.links.content}</p>

              <h2>{() => t.value?.sections.risk.title}</h2>
              <p class="serif">{() => t.value?.sections.risk.content}</p>

              <h2>{() => t.value?.sections.liability.title}</h2>
              <p class="serif">{() => t.value?.sections.liability.content}</p>

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
