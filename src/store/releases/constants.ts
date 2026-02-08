export const GITHUB_RAW_BASE = "https://raw.githubusercontent.com";
export const REPO_OWNER = "chrismichaelps";
export const REPO_NAME = "tagix";
export const REPO_BRANCH = "master";
export const CHANGELOG_PATH = "CHANGELOG.md";

export const CHANGELOG_URL = `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${CHANGELOG_PATH}`;

export const STORE_NAME = "releases";

export const ACTION_TYPES = {
  FETCH: "releases/fetch",
  FETCH_SUCCESS: "releases/fetch_success",
  FETCH_ERROR: "releases/fetch_error",
} as const;
