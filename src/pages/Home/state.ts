import { taggedEnum, createStore, createAction } from "tagix";

export const HomePageState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: {},
  Error: { message: "" },
});

export type HomePageStateType = typeof HomePageState.State;

const STORE_NAME = "homePage";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, HomePageStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => HomePageState.Loading({}));

export const setReady = createAction<undefined, HomePageStateType>(ACTION_TYPES.SET_READY)
  .withPayload(undefined)
  .withState(() => HomePageState.Ready({}));

export const setError = createAction<{ message: string }, HomePageStateType>(ACTION_TYPES.SET_ERROR)
  .withPayload({ message: "" })
  .withState((_, { message }) => HomePageState.Error({ message }));

export const reset = createAction<undefined, HomePageStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => HomePageState.Idle({}));

export const homePageStore = createStore(HomePageState.Idle({}), HomePageState, {
  name: `${STORE_NAME}State`,
});

homePageStore.register(ACTION_TYPES.SET_LOADING, setLoading);
homePageStore.register(ACTION_TYPES.SET_READY, setReady);
homePageStore.register(ACTION_TYPES.SET_ERROR, setError);
homePageStore.register(ACTION_TYPES.RESET, reset);

export const setHomePageLoading = () => homePageStore.dispatch(setLoading);
export const setHomePageReady = () => homePageStore.dispatch(setReady);
export const setHomePageError = (message: string) => homePageStore.dispatch(setError, { message });
export const resetHomePage = () => homePageStore.dispatch(reset);
