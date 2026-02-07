import { define } from "@effuse/core";
import { type ApiItem } from "../../../store/api";

interface Props {
  item: ApiItem;
}

interface ScriptReturn {
  item: ApiItem;
}

export const FunctionItem = define<Props, ScriptReturn>({
  script: ({ props }) => ({ item: props.item }),
  template: ({ item }) => (
    <div class="tagix-card p-4 flex flex-col md:flex-row md:items-center gap-2 hover:bg-[var(--tagix-bg-secondary)] transition-colors">
      <div class="flex items-center gap-3">
        <span class="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-600 shrink-0">
          Function
        </span>
        <h3 class="font-mono text-base font-semibold text-[var(--tagix-text-primary)]">
          {item.name}
        </h3>
      </div>
      <div class="text-sm text-[var(--tagix-text-secondary)] line-clamp-1 md:line-clamp-none md:ml-auto">
        <div class="opacity-80">{item.description ? item.description.split(".")[0] : ""}</div>
      </div>
    </div>
  ),
});
