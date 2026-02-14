import { createStore } from "tagix";
import { STORE_NAME, ACTION_TYPES } from "./constants";
import { ReleasesState } from "./state";
import { setLoading, setSuccess, setError } from "./actions";

export const releasesStore = createStore(ReleasesState.Idle({}), ReleasesState, {
  name: STORE_NAME,
});

releasesStore.register(ACTION_TYPES.FETCH, setLoading);
releasesStore.register(ACTION_TYPES.FETCH_SUCCESS, setSuccess);
releasesStore.register(ACTION_TYPES.FETCH_ERROR, setError);
