export const ACTION_TYPES = {
  SET_READY: "SetReady",
  SET_ERROR: "SetError",
  SET_LOADING: "SetLoading",
} as const;

export const STORE_NAME = "docs";

export const DOCS_GLOB_PATTERN = "/src/content/docs*.md";
