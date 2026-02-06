import { docsStore, DocStatus, type DocPagesMap, setDocsReady, setDocsError } from "./state";
import { DocsParseError } from "./error";
import {
  parseFrontmatter,
  extractSections,
  extractCodeBlocks,
  type DocPage,
  type DocCategory,
} from "../../utils/docs-parser";
import { logger } from "../../utils/logger";

const modules = import.meta.glob("/src/content/docs*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Documentation";
}

export function initDocs(): DocPagesMap {
  const pages: DocPagesMap = new Map();

  for (const path in modules) {
    try {
      const content = modules[path];
      const { metadata, body } = parseFrontmatter(content);
      const title = extractTitle(body);
      const sections = extractSections(body);
      const codeBlocks = extractCodeBlocks(body);

      const filename = path.split("/").pop()?.replace(".md", "") || "index";
      const category = metadata.get("category") || "General";

      pages.set(filename, {
        metadata: { title, category, slug: filename },
        content: body,
        sections,
        codeBlocks,
      });
    } catch (e) {
      const error = new DocsParseError({ path, cause: e });
      logger.error(error, { tag: "DocsStore" });
    }
  }

  return pages;
}

export function getNavigation(): DocCategory[] {
  const state = docsStore.stateValue;

  return DocStatus.$match({
    Ready: (s) => {
      if (!s.pages) return [];

      const categoryMap = new Map<string, { title: string; category: string; slug: string }[]>();

      s.pages.forEach((page) => {
        const cat = page.metadata.category;
        if (!categoryMap.has(cat)) {
          categoryMap.set(cat, []);
        }
        categoryMap.get(cat)!.push({
          title: page.metadata.title,
          category: cat,
          slug: page.metadata.slug,
        });
      });

      return Array.from(categoryMap.entries()).map(([name, pages]) => ({
        name,
        pages: pages.sort((a, b) => a.title.localeCompare(b.title)),
      }));
    },
    Error: () => [],
    Idle: () => [],
    Loading: () => [],
  })(state);
}

export function getDocPage(slug: string): DocPage | null {
  const state = docsStore.stateValue;

  return DocStatus.$match({
    Ready: (s) => (s.pages && s.pages.get(slug)) || null,
    Error: () => null,
    Idle: () => null,
    Loading: () => null,
  })(state);
}

export function getAllDocSlugs(): string[] {
  const state = docsStore.stateValue;

  return DocStatus.$match({
    Ready: (s) => (s.pages ? Array.from(s.pages.keys()) : []),
    Error: () => [],
    Idle: () => [],
    Loading: () => [],
  })(state);
}

export const isDocsReady = (): boolean => DocStatus.$is("Ready")(docsStore.stateValue);

export const isDocsLoading = (): boolean => DocStatus.$is("Loading")(docsStore.stateValue);

export function bootstrapDocs(): void {
  const pages = initDocs();

  if (pages.size > 0) {
    setDocsReady(pages);
  } else {
    setDocsError("No documentation files found");
  }
}

bootstrapDocs();
