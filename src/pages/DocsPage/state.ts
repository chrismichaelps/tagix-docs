import { taggedEnum, createStore, createAction } from "tagix";

export const DocsPageState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { slug: "" },
  Error: { message: "" },
});

export type DocsPageStateType = typeof DocsPageState.State;

const STORE_NAME = "docsPage";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, DocsPageStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => DocsPageState.Loading({}));

export const setReady = createAction<{ slug: string }, DocsPageStateType>(ACTION_TYPES.SET_READY)
  .withPayload({ slug: "" })
  .withState((_, { slug }) => DocsPageState.Ready({ slug }));

export const setError = createAction<{ message: string }, DocsPageStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => DocsPageState.Error({ message }));

export const reset = createAction<undefined, DocsPageStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => DocsPageState.Idle({}));

export const docsPageStore = createStore(DocsPageState.Idle({}), DocsPageState, {
  name: `${STORE_NAME}State`,
});

docsPageStore.register(ACTION_TYPES.SET_LOADING, setLoading);
docsPageStore.register(ACTION_TYPES.SET_READY, setReady);
docsPageStore.register(ACTION_TYPES.SET_ERROR, setError);
docsPageStore.register(ACTION_TYPES.RESET, reset);

export const setDocsPageLoading = () => docsPageStore.dispatch(setLoading);
export const setDocsPageReady = (slug: string) => docsPageStore.dispatch(setReady, { slug });
export const setDocsPageError = (message: string) => docsPageStore.dispatch(setError, { message });
export const resetDocsPage = () => docsPageStore.dispatch(reset);

export const isDocsPageReady = () => DocsPageState.$is("Ready")(docsPageStore.stateValue);
export const isDocsPageLoading = () => DocsPageState.$is("Loading")(docsPageStore.stateValue);
export const isDocsPageError = () => DocsPageState.$is("Error")(docsPageStore.stateValue);
export const getDocsPageSlug = () => {
  const state = docsPageStore.stateValue;
  return DocsPageState.$is("Ready")(state) ? (state as { slug: string }).slug : null;
};
