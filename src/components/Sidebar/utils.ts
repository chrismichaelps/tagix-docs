import { getDocsByCategory, docsRegistry } from "../../content/docs";
import { CATEGORY_ORDER } from "./constants";
import type { NavCategory, NavPage } from "./types";

export function buildNavigation(): NavCategory[] {
  const categoryMap = getDocsByCategory();
  const categories: NavCategory[] = [];

  for (const catName of CATEGORY_ORDER) {
    const docs = categoryMap.get(catName);
    if (!docs || docs.length === 0) continue;

    const pages: NavPage[] = [];
    const entries = docsRegistry.entries();
    for (const [slug, entry] of entries) {
      if (entry.category === catName || (!entry.category && catName === "Uncategorized")) {
        pages.push({ title: entry.title, slug, order: entry.order });
      }
    }

    pages.sort((a, b) => a.order - b.order);

    categories.push({ name: catName, pages });
  }

  return categories;
}

export function isSlugActive(currentPath: string, slug: string): boolean {
  return currentPath.includes(slug);
}
