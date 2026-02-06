import type { Signal } from "@effuse/core";

export interface DocsPageScriptReturn {
  content: Signal<string>;
  pageTitle: Signal<string>;
  currentSlug: Signal<string>;
  isSidebarOpen: Signal<boolean>;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}
