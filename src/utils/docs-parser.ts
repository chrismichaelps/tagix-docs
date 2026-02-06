export interface DocMetadata {
  title: string;
  category: string;
  slug: string;
}

export interface DocSection {
  level: number;
  title: string;
  anchor: string;
}

export interface DocCodeBlock {
  language: string;
  code: string;
}

export interface DocPage {
  metadata: DocMetadata;
  content: string;
  sections: DocSection[];
  codeBlocks: DocCodeBlock[];
}

export interface DocCategory {
  name: string;
  pages: DocMetadata[];
}

export function parseFrontmatter(content: string): {
  metadata: Map<string, string>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { metadata: new Map(), body: content };
  }

  const frontmatter = match[1];
  const body = match[2];

  const metadata = new Map<string, string>();
  for (const line of frontmatter.split("\n")) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      metadata.set(key.trim(), valueParts.join(":").trim());
    }
  }

  return { metadata, body };
}

export function extractSections(content: string): DocSection[] {
  const sections: DocSection[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const anchor = title.toLowerCase().replace(/[^\w]+/g, "-");
    sections.push({ level, title, anchor });
  }

  return sections;
}

export function extractCodeBlocks(content: string): DocCodeBlock[] {
  const blocks: DocCodeBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || "text",
      code: match[2].trim(),
    });
  }

  return blocks;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function getDocSlug(path: string): string {
  return path.replace("/docs/", "").replace("/README", "").replace("/", ".");
}
