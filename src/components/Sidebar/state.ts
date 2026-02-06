import { taggedEnum, createStore, createAction } from "tagix";
import { STORE_NAME } from "./constants";

export const SidebarState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { navigationCount: 0 },
  Error: { message: "" },
});

export type SidebarStateType = typeof SidebarState.State;

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, SidebarStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => SidebarState.Loading({}));

export const setReady = createAction<{ navigationCount: number }, SidebarStateType>(
  ACTION_TYPES.SET_READY
)
  .withPayload({ navigationCount: 0 })
  .withState((_, { navigationCount }) => SidebarState.Ready({ navigationCount }));

export const setError = createAction<{ message: string }, SidebarStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => SidebarState.Error({ message }));

export const reset = createAction<undefined, SidebarStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => SidebarState.Idle({}));

export const sidebarStore = createStore(SidebarState.Idle({}), SidebarState, {
  name: `${STORE_NAME}State`,
});

sidebarStore.register(ACTION_TYPES.SET_LOADING, setLoading);
sidebarStore.register(ACTION_TYPES.SET_READY, setReady);
sidebarStore.register(ACTION_TYPES.SET_ERROR, setError);
sidebarStore.register(ACTION_TYPES.RESET, reset);

export const setSidebarLoading = () => sidebarStore.dispatch(setLoading);
export const setSidebarReady = (navigationCount: number) =>
  sidebarStore.dispatch(setReady, { navigationCount });
export const setSidebarError = (message: string) => sidebarStore.dispatch(setError, { message });
export const resetSidebar = () => sidebarStore.dispatch(reset);

export const isSidebarReady = () => SidebarState.$is("Ready")(sidebarStore.stateValue);
export const isSidebarLoading = () => SidebarState.$is("Loading")(sidebarStore.stateValue);
export const isSidebarError = () => SidebarState.$is("Error")(sidebarStore.stateValue);
