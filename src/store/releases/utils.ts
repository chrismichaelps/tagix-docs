import { tryCatchAsync, matchEither } from "tagix";
import { CHANGELOG_URL } from "./constants";
import { ReleasesState } from "./state";
import { releasesStore } from "./store";
import { setLoading, setSuccess, setError } from "./actions";
import { ReleasesError, type ReleasesErrorType } from "./error";

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
        const errorArgs: Record<string, unknown> = {
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
        throw new ReleasesError(errorArgs);
      }

      return response.text();
    },
    (cause): ReleasesErrorType => {
      const errorArgs: Record<string, unknown> = {
        message: cause instanceof Error ? cause.message : "Unknown error",
        cause,
      };
      return new ReleasesError(errorArgs);
    }
  );

  matchEither(result, {
    onLeft: (error) => releasesStore.dispatch(setError, { error }),
    onRight: (content) => releasesStore.dispatch(setSuccess, content),
  });
};
