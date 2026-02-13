import type { Signal } from "@effuse/core";

export interface SidebarProps {
  isOpen?: Signal<boolean>;
  onClose?: () => void;
}

export interface NavCategory {
  name: string;
  pages: NavPage[];
}

export interface NavPage {
  title: string;
  slug: string;
  order: number;
}

export interface SidebarScriptReturn {
  navigation: Signal<NavCategory[]>;
  isLinkActive: (slug: string) => boolean;
  isOpen?: Signal<boolean>;
  handleLinkClick: () => void;
  t: Signal<any>;
}
