import { computed, type ReadonlySignal } from "@effuse/core";

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

const buildDocsRegistry = (): Map<string, DocEntry> => {
  const entries: Array<[string, DocEntry]> = [];

  for (const [path, content] of Object.entries(allMarkdownModules)) {
    const match = path.match(/^\.\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;

    const locale = match[1];
    if (locale !== "en") continue;

    const slug = match[2];
    const entry = parseFrontmatter(content);
    entries.push([slug, entry]);
  }

  entries.sort((a, b) => a[1].order - b[1].order);

  return new Map(entries);
};

const docsMap = buildDocsRegistry();

export const currentDocsRegistry: ReadonlySignal<Map<string, DocEntry>> = computed(() => docsMap);

export const docsRegistry = docsMap;

export const getAllDocSlugs = (): string[] => Array.from(docsMap.keys());

export const getDocPage = (slug: string): DocEntry | undefined => docsMap.get(slug);

export const getSortedDocs = (): DocEntry[] => Array.from(docsMap.values());

export const getDocsByCategory = (): Map<string, DocEntry[]> => {
  const categories = new Map<string, DocEntry[]>();

  for (const entry of docsMap.values()) {
    const category = entry.category ?? "Uncategorized";
    const existing = categories.get(category) ?? [];
    existing.push(entry);
    categories.set(category, existing);
  }

  return categories;
};
