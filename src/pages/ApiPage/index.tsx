import { define, signal, effect, useHead, computed, type Signal } from "@effuse/core";
import { apiStore, ApiState, searchApi, type ApiStateType, type ApiItem } from "../../store/api";
import { i18nStore } from "../../store/appI18n";
import { ApiHero } from "./components/ApiHero";
import { FunctionItem } from "./components/FunctionItem";
import { TypeItem } from "./components/TypeItem";
import "../../styles.css";

interface ScriptReturn {
  query: Signal<string>;
  grouped: Signal<Record<string, ApiItem[]>>;
  notFound: Signal<boolean>;
  onSearch: (e: Event) => void;
  t: Signal<any>;
}

export const ApiPage = define<{}, ScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.api);

    effect(() => {
      const apiT = tVal.value;
      if (!apiT) return;
      useHead({
        title: apiT.head.title,
        description: apiT.head.description,
      });
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

    return {
      query,
      grouped,
      notFound,
      onSearch,
      t: tVal,
    };
  },
  template: ({ query, grouped, notFound, onSearch, t }) => {
    const renderGroup = (group: string, items: ApiItem[]) => {
      const isFunction = group === "Functions";
      return isFunction ? (
        <div class="flex flex-col gap-2">
          {items.map((item) => (
            <FunctionItem key={item.name} item={item} />
          ))}
        </div>
      ) : (
        <div class="tagix-api-grid">
          {items.map((item) => (
            <TypeItem key={item.name} item={item} />
          ))}
        </div>
      );
    };

    return (
      <div class="tagix-page">
        <ApiHero query={query.value} onSearch={onSearch} />

        {() =>
          notFound.value ? (
            <section class="tagix-section text-center py-12">
              <p class="tagix-text-secondary">
                {() => t.value?.notFound.replace("{query}", query.value)}
              </p>
            </section>
          ) : (
            Object.entries(grouped.value).map(([group, items]) =>
              items.length > 0 ? (
                <section key={group} class="tagix-section">
                  <h2 class="tagix-section-title border-b border-[var(--tagix-border-default)] pb-2 mb-4">
                    {() =>
                      group === "Functions" ? t.value?.groups.functions : t.value?.groups.types
                    }
                  </h2>
                  {renderGroup(group, items)}
                </section>
              ) : null
            )
          )
        }
      </div>
    );
  },
});
