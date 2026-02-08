import { createStore, taggedEnum, createAction, tryCatchAsync, TaggedError } from "tagix";
import { ACTION_TYPES, STORE_NAME, CHANGELOG_URL } from "./constants";

const ReleasesError = TaggedError("ReleasesError");

type ReleasesErrorType = InstanceType<typeof ReleasesError>;

export const ReleasesState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { content: "" },
  Error: { error: null as ReleasesErrorType | null },
});

export type ReleasesStateType = typeof ReleasesState.State;

const setLoading = createAction<undefined, ReleasesStateType>(ACTION_TYPES.FETCH)
  .withPayload(undefined)
  .withState(() => ReleasesState.Loading({}));

const setSuccess = createAction<string, ReleasesStateType>(ACTION_TYPES.FETCH_SUCCESS)
  .withPayload("")
  .withState((_, payload) => ReleasesState.Ready({ content: payload }));

const setError = createAction<{ error: ReleasesErrorType }, ReleasesStateType>(
  ACTION_TYPES.FETCH_ERROR
)
  .withPayload({ error: null as unknown as ReleasesErrorType })
  .withState((_, payload) => ReleasesState.Error({ error: payload.error }));

export const releasesStore = createStore(ReleasesState.Idle({}), ReleasesState, {
  name: STORE_NAME,
});

releasesStore.register(ACTION_TYPES.FETCH, setLoading);
releasesStore.register(ACTION_TYPES.FETCH_SUCCESS, setSuccess);
releasesStore.register(ACTION_TYPES.FETCH_ERROR, setError);

export const fetchChangelog = async (): Promise<void> => {
  const state = releasesStore.stateValue;

  if (ReleasesState.$is("Loading")(state) || ReleasesState.$is("Ready")(state)) {
    return;
  }

  releasesStore.dispatch(setLoading);

  const result = await tryCatchAsync(
    async () => {
      const response = await fetch(CHANGELOG_URL, {
        headers: { Accept: "text/plain" },
      });

      if (!response.ok) {
        throw new ReleasesError({ message: `HTTP ${response.status}: ${response.statusText}` });
      }

      return response.text();
    },
    (cause) =>
      new ReleasesError({
        message: cause instanceof Error ? cause.message : "Unknown error",
        cause,
      })
  );

  if (result._tag === "Right") {
    releasesStore.dispatch(setSuccess, result.right);
  } else {
    releasesStore.dispatch(setError, { error: result.left });
  }
};

export { ReleasesError };
