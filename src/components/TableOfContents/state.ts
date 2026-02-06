import { taggedEnum, createStore, createAction } from "tagix";

export const TocState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { headingCount: 0 },
  Error: { message: "" },
});

export type TocStateType = typeof TocState.State;

const STORE_NAME = "tableOfContents";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, TocStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => TocState.Loading({}));

export const setReady = createAction<{ headingCount: number }, TocStateType>(ACTION_TYPES.SET_READY)
  .withPayload({ headingCount: 0 })
  .withState((_, { headingCount }) => TocState.Ready({ headingCount }));

export const setError = createAction<{ message: string }, TocStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => TocState.Error({ message }));

export const reset = createAction<undefined, TocStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => TocState.Idle({}));

export const tocStore = createStore(TocState.Idle({}), TocState, {
  name: `${STORE_NAME}State`,
});

tocStore.register(ACTION_TYPES.SET_LOADING, setLoading);
tocStore.register(ACTION_TYPES.SET_READY, setReady);
tocStore.register(ACTION_TYPES.SET_ERROR, setError);
tocStore.register(ACTION_TYPES.RESET, reset);

export const setTocLoading = () => tocStore.dispatch(setLoading);
export const setTocReady = (headingCount: number) => tocStore.dispatch(setReady, { headingCount });
export const setTocError = (message: string) => tocStore.dispatch(setError, { message });
export const resetToc = () => tocStore.dispatch(reset);

export const isTocReady = () => TocState.$is("Ready")(tocStore.stateValue);
export const isTocLoading = () => TocState.$is("Loading")(tocStore.stateValue);
export const isTocError = () => TocState.$is("Error")(tocStore.stateValue);
