import type { Signal } from "@effuse/core";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  contentSelector?: string;
}

export interface TocScriptReturn {
  tocItems: Signal<TocItem[]>;
  activeId: Signal<string>;
  scrollProgress: Signal<number>;
  handleTocClick: (id: string) => void;
}
