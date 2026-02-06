import { taggedEnum, createStore, createAction } from "tagix";

export const NotFoundPageState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: {},
  Error: { message: "" },
});

export type NotFoundPageStateType = typeof NotFoundPageState.State;

const STORE_NAME = "notFoundPage";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, NotFoundPageStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => NotFoundPageState.Loading({}));

export const setReady = createAction<undefined, NotFoundPageStateType>(ACTION_TYPES.SET_READY)
  .withPayload(undefined)
  .withState(() => NotFoundPageState.Ready({}));

export const setError = createAction<{ message: string }, NotFoundPageStateType>(
  ACTION_TYPES.SET_ERROR
)
  .withPayload({ message: "" })
  .withState((_, { message }) => NotFoundPageState.Error({ message }));

export const reset = createAction<undefined, NotFoundPageStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => NotFoundPageState.Idle({}));

export const notFoundPageStore = createStore(NotFoundPageState.Idle({}), NotFoundPageState, {
  name: `${STORE_NAME}State`,
});

notFoundPageStore.register(ACTION_TYPES.SET_LOADING, setLoading);
notFoundPageStore.register(ACTION_TYPES.SET_READY, setReady);
notFoundPageStore.register(ACTION_TYPES.SET_ERROR, setError);
notFoundPageStore.register(ACTION_TYPES.RESET, reset);

export const setNotFoundPageLoading = () => notFoundPageStore.dispatch(setLoading);
export const setNotFoundPageReady = () => notFoundPageStore.dispatch(setReady);
export const setNotFoundPageError = (message: string) =>
  notFoundPageStore.dispatch(setError, { message });
export const resetNotFoundPage = () => notFoundPageStore.dispatch(reset);
