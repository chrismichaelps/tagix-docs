import { createStore, taggedEnum, createAction } from "tagix";
import { API_DOCS, type ApiItem } from "../../content/api_data";
import { STORE_NAME, ACTION_TYPES } from "./constants";

const KIND_TO_GROUP: Record<ApiItem["kind"], string> = {
  function: "Functions",
  class: "Classes",
  interface: "Interfaces",
  type: "Types",
  const: "Variables",
  object: "Others",
};

const ORDERED_GROUPS = [
  "Functions",
  "Classes",
  "Interfaces",
  "Types",
  "Variables",
  "Others",
] as const;

const createGroupedItems = (items: ApiItem[]): Record<string, ApiItem[]> => {
  const grouped = items.reduce<Record<string, ApiItem[]>>((acc, item) => {
    const group = KIND_TO_GROUP[item.kind] ?? "Others";
    (acc[group] = acc[group] ?? []).push(item);
    return acc;
  }, {});

  return ORDERED_GROUPS.reduce<Record<string, ApiItem[]>>((acc, key) => {
    const groupItems = grouped[key] ?? [];
    acc[key] = groupItems.sort((a, b) => a.name.localeCompare(b.name));
    return acc;
  }, {});
};

const createInitialState = () =>
  ApiState.Idle({
    query: "",
    items: API_DOCS,
    grouped: createGroupedItems(API_DOCS),
  });

export const ApiState = taggedEnum({
  Idle: {
    query: "",
    items: API_DOCS,
    grouped: createGroupedItems(API_DOCS),
  },
  Filtered: {
    query: "",
    items: [] as ApiItem[],
    grouped: {} as Record<string, ApiItem[]>,
  },
  NotFound: {
    query: "",
  },
});

export type ApiStateType = typeof ApiState.State;

export const searchAction = createAction<string, ApiStateType>(ACTION_TYPES.SEARCH)
  .withPayload("")
  .withState((_state, query) => {
    if (!query) {
      return createInitialState();
    }

    const lowerQuery = query.toLowerCase();
    const filtered = API_DOCS.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );

    if (filtered.length === 0) {
      return ApiState.NotFound({ query });
    }

    return ApiState.Filtered({
      query,
      items: filtered,
      grouped: createGroupedItems(filtered),
    });
  });

export const resetAction = createAction<void, ApiStateType>(ACTION_TYPES.RESET)
  .withPayload()
  .withState(() => createInitialState());

export const apiStore = createStore(createInitialState(), ApiState, {
  name: STORE_NAME,
});

apiStore.register(ACTION_TYPES.SEARCH, searchAction);
apiStore.register(ACTION_TYPES.RESET, resetAction);

export const searchApi = (query: string) => apiStore.dispatch(searchAction, query);
export const resetApi = () => apiStore.dispatch(resetAction);
