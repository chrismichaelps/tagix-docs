import { Comment, DeclarationReflection, SignatureReflection, Reflection } from "typedoc";
import {
  none,
  some,
  fromNullableOption,
  matchOption,
  pipe,
  isNonEmptyString,
  type Option,
} from "tagix";
import type { ApiItem, ExtractResult } from "./types.ts";

export function getBestComment(ref: Reflection): Option<Comment> {
  if (ref.comment) return some(ref.comment);
  if ("signatures" in ref) {
    const signatures = (ref as DeclarationReflection).signatures;
    if (signatures && signatures.length > 0) {
      return fromNullableOption(signatures[0].comment);
    }
  }
  return none();
}

export function renderContent(
  parts: Comment["summary"] | Comment["blockTags"][number]["content"] = []
): string {
  return parts
    .map((part) =>
      matchOption(fromNullableOption(part.kind), {
        onNone: () => "",
        onSome: (kind: string) => {
          if (kind === "text") return (part as any).text;
          if (kind === "code") return `\`${(part as any).text}\``;
          if (kind === "inline-tag") return (part as any).text || (part as any).target?.name || "";
          return "";
        },
      })
    )
    .join("");
}

export function extractDescriptionAndTags(
  ref: DeclarationReflection | SignatureReflection
): ExtractResult {
  const commentOpt = getBestComment(ref);

  return matchOption(commentOpt, {
    onNone: () => ({ summary: "", tags: [] }),
    onSome: (comment: Comment) => {
      const summary = renderContent(comment.summary).trim();
      const blockTags = comment.blockTags.map((tag) => {
        const tagName = tag.tag.startsWith("@") ? tag.tag : `@${tag.tag}`;
        const content = renderContent(tag.content).trim();
        return ["@example", "@remarks", "@returns", "@throws"].includes(tagName)
          ? content
            ? `${tagName}\n${content}`
            : tagName
          : content
            ? `${tagName} ${content}`
            : tagName;
      });
      const modifierTags = (ref as any).modifierTags || [];
      const allTags = [...modifierTags, ...blockTags].filter(isNonEmptyString);
      return { summary, tags: allTags };
    },
  });
}

export function buildDescription(summary: string, tags: string[]): string {
  return pipe(
    summary,
    (s) => (tags.length > 0 ? (s ? `${s}\n\n` : "") + tags.join("\n\n") : s),
    (s) => s.trim()
  );
}

export function deduplicateDocs(docs: ApiItem[]): ApiItem[] {
  const uniqueDocs = new Map<string, ApiItem>();
  for (const doc of docs) {
    const key = `${doc.name}:${doc.kind}`;
    const existing = uniqueDocs.get(key);
    if (!existing || existing.description.length < doc.description.length) {
      uniqueDocs.set(key, doc);
    }
  }
  return Array.from(uniqueDocs.values()).sort((a, b) => a.name.localeCompare(b.name));
}
