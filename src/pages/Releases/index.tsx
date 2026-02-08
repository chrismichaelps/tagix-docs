import { define, useHead, signal } from "@effuse/core";
import { releasesStore, fetchChangelog, ReleasesState } from "../../store/releases";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Ready } from "./components/Ready";
import { ReleasesHero } from "./components/ReleasesHero";
import "./styles.css";

export const ReleasesPage = define({
  script: ({ onMount }) => {
    useHead({
      title: "Releases - Tagix",
      description:
        "Tagix release history and changelog. Type-safe state management powered by Tagged Unions.",
    });

    const pageState = signal(releasesStore.stateValue);

    const unsubscribe = releasesStore.subscribe((state) => {
      pageState.value = state;
    });

    onMount(() => {
      fetchChangelog();
      return unsubscribe;
    });

    return { pageState };
  },
  template: ({ pageState }) => (
    <main class="tagix-releases">
      <div class="tagix-page">
        <ReleasesHero />

        <section class="tagix-section">
          {ReleasesState.$match(pageState.value, {
            Idle: () => <Loading />,
            Loading: () => <Loading />,
            Error: ({ error }) => <Error error={error} />,
            Ready: ({ content }) => <Ready content={content} />,
          })}
        </section>
      </div>
    </main>
  ),
});
