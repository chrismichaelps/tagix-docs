import { createStore, taggedEnum, createAction } from "tagix";
import { ACTION_TYPES } from "./constants";

export const AppState = taggedEnum({
  Loading: {},
  Ready: {},
  Error: { message: "" },
});

export type AppStateType = typeof AppState.State;

export const setReady = createAction<undefined, AppStateType>(ACTION_TYPES.SET_READY)
  .withPayload(undefined)
  .withState(() => AppState.Ready({}));

export const setError = createAction<{ message: string }, AppStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => AppState.Error({ message }));

export const appStore = createStore(AppState.Loading({}), AppState, { name: "app" });

appStore.register(ACTION_TYPES.SET_READY, setReady);
appStore.register(ACTION_TYPES.SET_ERROR, setError);

export const setAppReady = () => appStore.dispatch(setReady);
export const setAppError = (message: string) => appStore.dispatch(setError, { message });
