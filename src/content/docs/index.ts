import { computed, type ReadonlySignal } from "@effuse/core";
import { i18nStore } from "../../store/appI18n";

interface DocEntry {
  title: string;
  content: string;
  order: number;
  category?: string;
  alias?: string;
  description?: string;
}

const parseFrontmatter = (markdown: string): DocEntry => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (match) {
    const frontmatter = match[1];
    const content = match[2].trim();

    const getValue = (key: string): string | undefined => {
      const regex = new RegExp(`^${key}:\\s*(.+)$`, "m");
      const result = frontmatter.match(regex);
      return result ? result[1].trim() : undefined;
    };

    return {
      title: getValue("title") ?? "Untitled",
      content,
      order: parseInt(getValue("order") ?? "999", 10),
      category: getValue("category"),
      alias: getValue("alias"),
      description: getValue("description"),
    };
  }

  const h1Match = markdown.match(/^#\s+(.+)$/m);
  return {
    title: h1Match ? h1Match[1].trim() : "Untitled",
    content: markdown,
    order: 999,
  };
};

const allMarkdownModules = import.meta.glob("./*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const buildDocsRegistries = (): Map<string, Map<string, DocEntry>> => {
  const registries = new Map<string, Map<string, DocEntry>>();

  for (const [path, content] of Object.entries(allMarkdownModules)) {
    const match = path.match(/^\.\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;

    const locale = match[1];
    const slug = match[2];
    const entry = parseFrontmatter(content);

    if (!registries.has(locale)) {
      registries.set(locale, new Map());
    }

    registries.get(locale)!.set(slug, entry);
  }

  for (const registry of registries.values()) {
    const sortedEntries = Array.from(registry.entries()).sort((a, b) => a[1].order - b[1].order);
    registry.clear();
    for (const [slug, entry] of sortedEntries) {
      registry.set(slug, entry);
    }
  }

  return registries;
};

const docsRegistries = buildDocsRegistries();

export const currentDocsRegistry: ReadonlySignal<Map<string, DocEntry>> = computed(() => {
  const locale = i18nStore.locale.value;
  return docsRegistries.get(locale) || docsRegistries.get("en") || new Map();
});

export const docsRegistry = {
  get entries() {
    return () => currentDocsRegistry.value.entries();
  },
  get keys() {
    return () => currentDocsRegistry.value.keys();
  },
  get values() {
    return () => currentDocsRegistry.value.values();
  },
  get: (slug: string) => currentDocsRegistry.value.get(slug),
};

export const getAllDocSlugs = (): string[] => Array.from(currentDocsRegistry.value.keys());

export const getDocPage = (slug: string): DocEntry | undefined =>
  currentDocsRegistry.value.get(slug);

export const getSortedDocs = (): DocEntry[] => Array.from(currentDocsRegistry.value.values());

export const getDocsByCategory = (): Map<string, DocEntry[]> => {
  const categories = new Map<string, DocEntry[]>();

  for (const entry of currentDocsRegistry.value.values()) {
    const category = entry.category ?? "Uncategorized";
    const existing = categories.get(category) ?? [];
    existing.push(entry);
    categories.set(category, existing);
  }

  return categories;
};
