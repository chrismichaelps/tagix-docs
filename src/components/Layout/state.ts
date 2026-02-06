import { taggedEnum, createStore, createAction } from "tagix";

export const LayoutState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: {},
  Error: { message: "" },
});

export type LayoutStateType = typeof LayoutState.State;

const STORE_NAME = "layout";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, LayoutStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => LayoutState.Loading({}));

export const setReady = createAction<undefined, LayoutStateType>(ACTION_TYPES.SET_READY)
  .withPayload(undefined)
  .withState(() => LayoutState.Ready({}));

export const setError = createAction<{ message: string }, LayoutStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => LayoutState.Error({ message }));

export const reset = createAction<undefined, LayoutStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => LayoutState.Idle({}));

export const layoutStore = createStore(LayoutState.Idle({}), LayoutState, {
  name: `${STORE_NAME}State`,
});

layoutStore.register(ACTION_TYPES.SET_LOADING, setLoading);
layoutStore.register(ACTION_TYPES.SET_READY, setReady);
layoutStore.register(ACTION_TYPES.SET_ERROR, setError);
layoutStore.register(ACTION_TYPES.RESET, reset);

export const setLayoutLoading = () => layoutStore.dispatch(setLoading);
export const setLayoutReady = () => layoutStore.dispatch(setReady);
export const setLayoutError = (message: string) => layoutStore.dispatch(setError, { message });
export const resetLayout = () => layoutStore.dispatch(reset);

export const isLayoutReady = () => LayoutState.$is("Ready")(layoutStore.stateValue);
export const isLayoutLoading = () => LayoutState.$is("Loading")(layoutStore.stateValue);
export const isLayoutError = () => LayoutState.$is("Error")(layoutStore.stateValue);
