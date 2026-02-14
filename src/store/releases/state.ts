import { taggedEnum } from "tagix";
import type { ReleasesErrorType } from "./error";

export const ReleasesState = taggedEnum({
  Idle: {},
  Loading: {},
  Ready: { content: "" },
  Error: { error: null as ReleasesErrorType | null },
});

export type ReleasesStateType = typeof ReleasesState.State;
