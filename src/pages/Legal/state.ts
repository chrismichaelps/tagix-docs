import { taggedEnum, createStore, createAction } from "tagix";

export const LegalPageState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { pageType: "" as "terms" | "privacy" | "disclaimer" | "contact" },
  Error: { message: "" },
});

export type LegalPageStateType = typeof LegalPageState.State;

const STORE_NAME = "legalPage";

const ACTION_TYPES = {
  SET_LOADING: "SetLoading",
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  RESET: "Reset",
} as const;

export const setLoading = createAction<undefined, LegalPageStateType>(ACTION_TYPES.SET_LOADING)
  .withPayload(undefined)
  .withState(() => LegalPageState.Loading({}));

export const setReady = createAction<
  { pageType: "terms" | "privacy" | "disclaimer" | "contact" },
  LegalPageStateType
>(ACTION_TYPES.SET_READY)
  .withPayload({ pageType: "terms" as "terms" | "privacy" | "disclaimer" | "contact" })
  .withState((_, { pageType }) => LegalPageState.Ready({ pageType }));

export const setError = createAction<{ message: string }, LegalPageStateType>(
  ACTION_TYPES.SET_ERROR
)
  .withPayload({ message: "" })
  .withState((_, { message }) => LegalPageState.Error({ message }));

export const reset = createAction<undefined, LegalPageStateType>(ACTION_TYPES.RESET)
  .withPayload(undefined)
  .withState(() => LegalPageState.Idle({}));

export const legalPageStore = createStore(LegalPageState.Idle({}), LegalPageState, {
  name: `${STORE_NAME}State`,
});

legalPageStore.register(ACTION_TYPES.SET_LOADING, setLoading);
legalPageStore.register(ACTION_TYPES.SET_READY, setReady);
legalPageStore.register(ACTION_TYPES.SET_ERROR, setError);
legalPageStore.register(ACTION_TYPES.RESET, reset);

export const setLegalPageLoading = () => legalPageStore.dispatch(setLoading);
export const setLegalPageReady = (pageType: "terms" | "privacy" | "disclaimer" | "contact") =>
  legalPageStore.dispatch(setReady, { pageType });
export const setLegalPageError = (message: string) =>
  legalPageStore.dispatch(setError, { message });
export const resetLegalPage = () => legalPageStore.dispatch(reset);
