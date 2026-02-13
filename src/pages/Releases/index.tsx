import { define, signal, computed, effect, useHead, type Signal } from "@effuse/core";
import { releasesStore, fetchChangelog, ReleasesState } from "../../store/releases";
import { i18nStore } from "../../store/appI18n";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Ready } from "./components/Ready";
import { ReleasesHero } from "./components/ReleasesHero";
import "./styles.css";

interface ScriptReturn {
  pageState: Signal<any>;
  t: Signal<any>;
}

export const ReleasesPage = define<{}, ScriptReturn>({
  script: ({ onMount, useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.releases);

    effect(() => {
      const relVal = tVal.value;
      if (!relVal) return;
      useHead({
        title: relVal.head.title,
        description: relVal.head.description,
      });
    });

    const pageState = signal(releasesStore.stateValue);

    const unsubscribe = releasesStore.subscribe((state) => {
      pageState.value = state;
    });

    onMount(() => {
      fetchChangelog();
      return unsubscribe;
    });

    return { pageState, t: tVal };
  },
  template: ({ pageState }) => (
    <main class="tagix-releases">
      <div class="tagix-page">
        <ReleasesHero />

        <section class="tagix-section">
          {() =>
            ReleasesState.$match(pageState.value, {
              Idle: () => <Loading />,
              Loading: () => <Loading />,
              Error: ({ error }) => <Error error={error} />,
              Ready: ({ content }) => <Ready content={content} />,
            })
          }
        </section>
      </div>
    </main>
  ),
});
