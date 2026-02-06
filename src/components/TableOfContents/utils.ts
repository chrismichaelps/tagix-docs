import type { TocItem } from "./types";
import { HEADING_SELECTORS, SCROLL_CONFIG, DEFAULT_CONTENT_SELECTOR } from "./constants";

export function extractHeadings(contentSelector: string = DEFAULT_CONTENT_SELECTOR): TocItem[] {
  const contentEl = document.querySelector(contentSelector);
  if (!contentEl) return [];

  const headings = contentEl.querySelectorAll(HEADING_SELECTORS);
  const items: TocItem[] = [];

  headings.forEach((heading, index) => {
    const el = heading as HTMLHeadingElement;
    if (!el.id) {
      el.id = `heading-${index}`;
    }
    items.push({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    });
  });

  return items;
}

export function calculateScrollProgress(): number {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  return Math.min(100, Math.round((scrollY / (docHeight - windowHeight)) * 100));
}

export function findActiveHeading(headings: TocItem[]): string {
  if (headings.length === 0) return "";

  const windowHeight = window.innerHeight;
  let currentActive = headings[0].id;

  for (const heading of headings) {
    const el = document.getElementById(heading.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * SCROLL_CONFIG.ACTIVE_THRESHOLD) {
        currentActive = heading.id;
      }
    }
  }

  return currentActive;
}

export function scrollToHeading(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
