export const DEFAULT_CONTENT_SELECTOR = ".prose";

export const HEADING_SELECTORS = "h1, h2, h3";

export const SCROLL_CONFIG = {
  ACTIVE_THRESHOLD: 0.3,
  EXTRACT_DELAY: 100,
  CLICK_DELAY: 100,
} as const;

export const CSS_CLASSES = {
  TOC: "docs-toc",
  CONTAINER: "docs-toc-container",
  HEADER: "docs-toc-header",
  TITLE: "docs-toc-title",
  PROGRESS: "docs-toc-progress",
  PROGRESS_BAR: "docs-toc-progress-bar",
  PROGRESS_FILL: "docs-toc-progress-fill",
  NAV: "docs-toc-nav",
  LINK: "docs-toc-link",
  LINK_ACTIVE: "active",
} as const;
