import { TaggedError } from "tagix";

export const ReleasesError = TaggedError("ReleasesError");

export type ReleasesErrorType = TaggedError<"ReleasesError"> & Record<string, unknown>;
