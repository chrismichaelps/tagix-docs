import { Comment, DeclarationReflection, SignatureReflection, Reflection } from "typedoc";
import { none, some, pipe, isNonEmptyString, matchOption, type Option } from "tagix";
import type { ApiItem, ExtractResult } from "./types.js";

export function getBestComment(ref: Reflection): Option<Comment> {
  if (ref.comment) return some(ref.comment);

  const signatures = "signatures" in ref ? (ref as DeclarationReflection).signatures : undefined;
  const firstSig = signatures?.[0];

  return firstSig?.comment ? some(firstSig.comment) : none();
}

const renderPart = (part: Comment["summary"][number]): string => {
  if (part.kind === "text") return part.text;
  if (part.kind === "code") return `\`${part.text}\``;
  if (part.kind === "inline-tag") return part.text;
  return "";
};

export const renderContent = (parts: Comment["summary"] = []): string =>
  parts.map(renderPart).join("");

export function extractDescriptionAndTags(
  ref: DeclarationReflection | SignatureReflection
): ExtractResult {
  const commentOpt = getBestComment(ref);

  return matchOption(commentOpt, {
    onNone: () => ({ summary: "", tags: [] }),
    onSome: (comment) => {
      const summary = renderContent(comment.summary).trim();

      const blockTags = comment.blockTags.map((tag) => {
        const name = tag.tag.startsWith("@") ? tag.tag : `@${tag.tag}`;
        const content = renderContent(tag.content).trim();

        return ["@example", "@remarks", "@returns", "@throws"].includes(name)
          ? content
            ? `${name}\n${content}`
            : name
          : content
            ? `${name} ${content}`
            : name;
      });

      const modifierTags = Array.from(comment.modifierTags).map((t) => `@${t}`);
      const tags = [...modifierTags, ...blockTags].filter(isNonEmptyString);

      return { summary, tags };
    },
  });
}

export const buildDescription = (summary: string, tags: string[]): string =>
  pipe(
    summary,
    (s) => (tags.length > 0 ? (s ? `${s}\n\n` : "") + tags.join("\n\n") : s),
    (s) => s.trim()
  );

export const deduplicateDocs = (docs: ApiItem[]): ApiItem[] => {
  const seen = new Map<string, ApiItem>();

  for (const doc of docs) {
    const key = `${doc.name}:${doc.kind}`;
    const prev = seen.get(key);

    if (!prev || prev.description.length < doc.description.length) {
      seen.set(key, doc);
    }
  }

  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
};
