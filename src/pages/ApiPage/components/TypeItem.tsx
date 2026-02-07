import { define } from "@effuse/core";
import { Ink } from "@effuse/ink";
import { type ApiItem } from "../../../store/api";
import { KIND_LABELS, KIND_COLORS } from "../constants";

const formatDescription = (description: string): string => {
  if (!description) return "";
  return description.replace(
    /@(param|returns|typeParam|remarks|example|default|deprecated|throws)/g,
    "**@$1**"
  );
};

interface Props {
  item: ApiItem;
}

interface ScriptReturn {
  item: ApiItem;
}

const CustomStrong = (props: { children?: any }) => {
  let content = "";
  if (typeof props.children === "string") {
    content = props.children;
  } else if (Array.isArray(props.children)) {
    content = props.children.map((c) => String(c)).join("");
  } else if (props.children?.props?.children) {
    content = String(props.children.props.children);
  } else {
    content = String(props.children || "");
  }

  if (content.trim().startsWith("@")) {
    return <span class="tsdoc-tag">{content}</span>;
  }
  return <strong {...props}>{props.children}</strong>;
};

export const TypeItem = define<Props, ScriptReturn>({
  script: ({ props }) => ({ item: props.item }),
  template: ({ item }) => (
    <div class="tagix-card">
      <div class="flex items-center justify-between mb-2">
        <h3 class="tagix-card-title font-mono text-lg">{item.name}</h3>
        <span
          class={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
            bg-${KIND_COLORS[item.kind] || "gray"}-50 text-${KIND_COLORS[item.kind] || "gray"}-600`}
        >
          {KIND_LABELS[item.kind] || item.kind}
        </span>
      </div>
      <div class="tagix-card-text prose prose-sm max-w-none">
        <Ink
          content={formatDescription(item.description || "") || "_No description provided_"}
          components={{ strong: CustomStrong }}
        />
      </div>
    </div>
  ),
});
