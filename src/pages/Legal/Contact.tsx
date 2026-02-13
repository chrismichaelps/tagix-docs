import { define, useHead, effect, computed, type Signal } from "@effuse/core";
import { i18nStore } from "../../store/appI18n";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

interface ScriptReturn {
  t: Signal<any>;
}

export const ContactPage = define<{}, ScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.legal.contact);

    effect(() => {
      const contactT = tVal.value;
      if (!contactT) return;
      useHead({
        title: contactT.head.title,
        description: contactT.head.description,
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
                src="/illustrations/contact.svg"
                alt="Contact Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <p class="serif">{() => t.value?.intro}</p>

              <section>
                <h2>{() => t.value?.sections.getInTouch.title}</h2>
                <p class="serif">
                  {() => t.value?.sections.getInTouch.content}
                  <br />
                  <a href="mailto:chrisperezsantiago1@gmail.com">chrisperezsantiago1@gmail.com</a>
                </p>
              </section>

              <section>
                <h2>{() => t.value?.sections.github.title}</h2>
                <p class="serif">
                  {() => t.value?.sections.github.content}
                  <br />
                  <a href="https://github.com/chrismichaelps/tagix" target="_blank" rel="noopener">
                    https://github.com/chrismichaelps/tagix
                  </a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
