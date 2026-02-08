import { define } from "@effuse/core";
import { fetchChangelog, ReleasesError } from "../../../store/releases";

interface ErrorProps {
  error: unknown;
}

interface ErrorScriptReturn {
  message: string;
}

export const Error = define<ErrorProps, ErrorScriptReturn>({
  script: ({ props }) => {
    const isErrorWithMessage = (err: unknown): err is { message: string } =>
      err instanceof Error || (typeof err === "object" && err !== null && "message" in err);

    const resolveMessage = (err: unknown): string => {
      if (err instanceof ReleasesError) return err.message;
      if (isErrorWithMessage(err)) return err.message;
      return typeof err === "string" ? err : "An unexpected error occurred while loading releases.";
    };

    return {
      message: resolveMessage(props.error),
    };
  },
  template: ({ message }) => (
    <div class="tagix-releases-error">
      <h3>Unable to load releases</h3>
      <p>{message}</p>
      <button onClick={() => fetchChangelog()} class="tagix-retry-button">
        Retry
      </button>
    </div>
  ),
});
