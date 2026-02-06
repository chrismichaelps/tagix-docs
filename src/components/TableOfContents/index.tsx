import { define, signal, type Signal, For } from "@effuse/core";
import {
  extractHeadings,
  calculateScrollProgress,
  findActiveHeading,
  scrollToHeading,
} from "./utils";
import { CSS_CLASSES, SCROLL_CONFIG, DEFAULT_CONTENT_SELECTOR } from "./constants";
import type { TableOfContentsProps, TocScriptReturn, TocItem } from "./types";

export const TableOfContents = define<TableOfContentsProps, TocScriptReturn>({
  script: ({ props, onMount }) => {
    const tocItems = signal<TocItem[]>([]);
    const activeId = signal("");
    const scrollProgress = signal(0);

    const doExtractHeadings = () => {
      const items = extractHeadings(props.contentSelector || DEFAULT_CONTENT_SELECTOR);
      tocItems.value = items;
      if (items.length > 0 && !activeId.value) {
        activeId.value = items[0].id;
      }
    };

    const updateActiveHeading = () => {
      const headings = tocItems.value;
      if (headings.length === 0) return;

      scrollProgress.value = calculateScrollProgress();
      activeId.value = findActiveHeading(headings);
    };

    const handleTocClick = (id: string) => {
      scrollToHeading(id);
      setTimeout(() => {
        activeId.value = id;
      }, SCROLL_CONFIG.CLICK_DELAY);
    };

    onMount(() => {
      setTimeout(doExtractHeadings, SCROLL_CONFIG.EXTRACT_DELAY);

      window.addEventListener("scroll", updateActiveHeading, { passive: true });
      window.addEventListener("resize", updateActiveHeading, { passive: true });

      const observer = new MutationObserver(() => {
        setTimeout(doExtractHeadings, SCROLL_CONFIG.EXTRACT_DELAY);
      });

      const contentEl = document.querySelector(props.contentSelector || DEFAULT_CONTENT_SELECTOR);
      if (contentEl) {
        observer.observe(contentEl, { childList: true, subtree: true });
      }

      return () => {
        window.removeEventListener("scroll", updateActiveHeading);
        window.removeEventListener("resize", updateActiveHeading);
        observer.disconnect();
      };
    });

    return {
      tocItems,
      activeId,
      scrollProgress,
      handleTocClick,
    };
  },
  template: ({ tocItems, activeId, scrollProgress, handleTocClick }) => (
    <aside class={CSS_CLASSES.TOC}>
      <div class={CSS_CLASSES.CONTAINER}>
        <div class={CSS_CLASSES.HEADER}>
          <span class={CSS_CLASSES.TITLE}>On this page</span>
        </div>

        <div class={CSS_CLASSES.PROGRESS_BAR}>
          <div class={CSS_CLASSES.PROGRESS_FILL} style={`height: ${scrollProgress.value}%`} />
        </div>

        <nav class={CSS_CLASSES.NAV}>
          <For each={tocItems}>
            {(item: Signal<TocItem>) => (
              <a
                key={item.value.id}
                href={`#${item.value.id}`}
                class={`${CSS_CLASSES.LINK} ${activeId.value === item.value.id ? CSS_CLASSES.LINK_ACTIVE : ""} level-${item.value.level}`}
                onClick={(e: Event) => {
                  e.preventDefault();
                  handleTocClick(item.value.id);
                }}
              >
                {item.value.text}
              </a>
            )}
          </For>
        </nav>
      </div>
    </aside>
  ),
});

export type { TocItem, TableOfContentsProps } from "./types";

export {
  TocState,
  type TocStateType,
  tocStore,
  setTocLoading,
  setTocReady,
  setTocError,
  resetToc,
  isTocReady,
  isTocLoading,
  isTocError,
} from "./state";
