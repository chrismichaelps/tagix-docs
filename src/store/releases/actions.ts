import { createAction } from "tagix";
import { ACTION_TYPES } from "./constants";
import { ReleasesState, type ReleasesStateType } from "./state";
import type { ReleasesErrorType } from "./error";

export const setLoading = createAction<undefined, ReleasesStateType>(ACTION_TYPES.FETCH)
  .withPayload(undefined)
  .withState(() => ReleasesState.Loading({}));

export const setSuccess = createAction<string, ReleasesStateType>(ACTION_TYPES.FETCH_SUCCESS)
  .withPayload("")
  .withState((_, payload) => ReleasesState.Ready({ content: payload }));

export const setError = createAction<{ error: ReleasesErrorType }, ReleasesStateType>(
  ACTION_TYPES.FETCH_ERROR
)
  .withPayload({ error: null as unknown as ReleasesErrorType })
  .withState((_, payload) => ReleasesState.Error({ error: payload.error }));
