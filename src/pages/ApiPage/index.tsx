import { define, signal, effect, useHead, type Signal } from "@effuse/core";
import { apiStore, ApiState, searchApi, type ApiStateType, type ApiItem } from "../../store/api";
import { ApiHero } from "./components/ApiHero";
import { FunctionItem } from "./components/FunctionItem";
import { TypeItem } from "./components/TypeItem";
import "../../styles.css";

interface ScriptReturn {
  query: Signal<string>;
  grouped: Signal<Record<string, ApiItem[]>>;
  notFound: Signal<boolean>;
  onSearch: (e: Event) => void;
}

export const ApiPage = define<{}, ScriptReturn>({
  script: () => {
    useHead({
      title: "API Reference | Tagix",
      description:
        "Complete API reference for Tagix. Explore functions, types, and utilities for type-safe state management.",
    });

    const pageState = signal<ApiStateType>(apiStore.stateValue);
    const query = signal("");
    const grouped = signal<Record<string, ApiItem[]>>({});
    const notFound = signal(false);

    apiStore.subscribe((state) => {
      pageState.value = state;
    });

    effect(() => {
      const currentState = pageState.value;
      const q = ApiState.$match(currentState, {
        Idle: (s) => s.query,
        Filtered: (s) => s.query,
        NotFound: (s) => s.query,
      });
      const g = ApiState.$match(currentState, {
        Idle: (s) => s.grouped,
        Filtered: (s) => s.grouped,
        NotFound: () => ({}),
      });
      const isNotFound = ApiState.$match(currentState, {
        Idle: () => false,
        Filtered: () => false,
        NotFound: () => true,
      });
      query.value = q;
      grouped.value = g;
      notFound.value = isNotFound;
    });

    const onSearch = (e: Event) => {
      const q = (e.target as HTMLInputElement).value;
      searchApi(q);
    };

    return { query, grouped, notFound, onSearch };
  },
  template: ({ query, grouped, notFound, onSearch }) => {
    const renderGroup = (group: string, items: ApiItem[]) => {
      const isFunction = group === "Functions";
      return isFunction ? (
        <div class="flex flex-col gap-2">
          {items.map((item) => (
            <FunctionItem key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <div class="tagix-grid">
          {items.map((item) => (
            <TypeItem key={item.name} item={item} />
          ))}
        </div>
      );
    };

    return (
      <div class="tagix-page">
        <ApiHero query={query.value} onSearch={onSearch} />

        {notFound.value ? (
          <section class="tagix-section text-center py-12">
            <p class="tagix-text-secondary">No API items found matching "{query.value}"</p>
          </section>
        ) : (
          Object.entries(grouped.value).map(([group, items]) =>
            items.length > 0 ? (
              <section key={group} class="tagix-section">
                <h2 class="tagix-section-title border-b border-[var(--tagix-border-default)] pb-2 mb-4">
                  {group}
                </h2>
                {renderGroup(group, items)}
              </section>
            ) : null
          )
        )}
      </div>
    );
  },
});
