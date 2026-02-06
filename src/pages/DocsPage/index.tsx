import { define, signal, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { Ink } from "@effuse/ink";
import { Sidebar } from "../../components/Sidebar";
import { TableOfContents } from "../../components/TableOfContents";
import { CodeBlock } from "./components/CodeBlock";
import { initPageAnimations } from "../../utils/animations";
import { getSlugFromPath, getDocContent, getDocTitle } from "./utils";
import { CSS_CLASSES, ANIMATION_DELAY } from "./constants";
import {
  DocsPageState,
  docsPageStore,
  setDocsPageLoading,
  setDocsPageReady,
  setDocsPageError,
} from "./state";

interface DocsPageScriptReturn {
  pageState: Signal<typeof DocsPageState.State>;
  content: Signal<string>;
  pageTitle: Signal<string>;
  currentSlug: Signal<string>;
  isSidebarOpen: Signal<boolean>;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const DocsPage = define<{}, DocsPageScriptReturn>({
  script: ({ onMount }) => {
    const currentSlug = signal(getSlugFromPath());
    const isSidebarOpen = signal(false);
    const pageState = signal<typeof DocsPageState.State>(docsPageStore.stateValue);

    docsPageStore.subscribe((state) => {
      pageState.value = state;
    });

    const content = computed(() => getDocContent(currentSlug.value));
    const pageTitle = computed(() => getDocTitle(currentSlug.value));

    onMount(() => {
      setDocsPageLoading();

      const handlePopState = () => {
        setDocsPageLoading();
        currentSlug.value = getSlugFromPath();
      };

      window.addEventListener("popstate", handlePopState);
      currentSlug.value = getSlugFromPath();

      setTimeout(() => {
        const docContent = getDocContent(currentSlug.value);
        if (docContent) {
          setDocsPageReady(currentSlug.value);
        } else {
          setDocsPageError("Documentation not found");
        }
        initPageAnimations();
      }, ANIMATION_DELAY);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    });

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    return {
      pageState,
      content,
      pageTitle,
      currentSlug,
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    };
  },
  template: ({ pageState, content, currentSlug, isSidebarOpen, toggleSidebar, closeSidebar }) => (
    <div class={CSS_CLASSES.LAYOUT}>
      <button
        class={CSS_CLASSES.MOBILE_FAB}
        onClick={toggleSidebar}
        aria-label="Open navigation menu"
      >
        <img
          src={isSidebarOpen.value ? "/icons/icon-close.svg" : "/icons/icon-menu.svg"}
          alt={isSidebarOpen.value ? "Close menu" : "Open menu"}
          width="24"
          height="24"
        />
      </button>
      <div
        class={`${CSS_CLASSES.OVERLAY} ${isSidebarOpen.value ? CSS_CLASSES.HAMBURGER_OPEN : ""}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <div class={CSS_CLASSES.MAIN_CONTAINER}>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main class={CSS_CLASSES.MAIN}>
          {DocsPageState.$match(pageState.value, {
            Idle: () => (
              <div class="docs-state-container docs-idle">
                <div class="docs-state-content">
                  <div class="docs-spinner" />
                  <span class="docs-state-text">Initializing...</span>
                </div>
              </div>
            ),
            Loading: () => (
              <div class="docs-state-container docs-loading">
                <div class="docs-state-content">
                  <div class="docs-spinner" />
                  <span class="docs-state-text">Loading documentation...</span>
                </div>
              </div>
            ),
            Error: ({ message }) => (
              <div class="docs-state-container docs-error">
                <div class="docs-state-content">
                  <div class="docs-error-icon">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <h2 class="docs-error-title">Unable to load documentation</h2>
                  <p class="docs-error-message">{message}</p>
                  <Link to="/docs" class="docs-error-action">
                    Back to Documentation
                  </Link>
                </div>
              </div>
            ),
            Ready: () => (
              <>
                <div class={CSS_CLASSES.CONTENT}>
                  <nav class="docs-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/docs" class="docs-breadcrumb-link">
                      Docs
                    </Link>
                    <span class="docs-breadcrumb-sep" aria-hidden="true">
                      /
                    </span>
                    <span class="docs-breadcrumb-current" aria-current="page">
                      {currentSlug.value}
                    </span>
                  </nav>
                  <article class={CSS_CLASSES.PROSE}>
                    <Ink
                      content={content}
                      components={{
                        CodeBlock: CodeBlock,
                      }}
                    />
                  </article>
                </div>
                <TableOfContents contentSelector=".prose" />
              </>
            ),
          })}
        </main>
      </div>
    </div>
  ),
});

export type { DocsPageScriptReturn } from "./types";
