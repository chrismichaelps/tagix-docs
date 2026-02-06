import { getAllDocSlugs, docsRegistry, currentDocsRegistry } from "../../content/docs";
import { DOCS_URL_PATTERN, DEFAULT_SLUG } from "./constants";

export function getSlugFromPath(): string {
  const path = window.location.pathname;
  const match = path.match(DOCS_URL_PATTERN);
  return match ? match[1] : getAllDocSlugs()[0] || DEFAULT_SLUG;
}

export function getDocContent(slug: string): string {
  const registry = currentDocsRegistry.value;
  const doc = registry.get(slug) ?? docsRegistry.get(getAllDocSlugs()[0]);
  return doc?.content || "";
}

export function getDocTitle(slug: string): string {
  const registry = currentDocsRegistry.value;
  const doc = registry.get(slug) ?? docsRegistry.get(getAllDocSlugs()[0]);
  return doc?.title || "Documentation";
}
