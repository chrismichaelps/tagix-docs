import { define } from "@effuse/core";
import { animate } from "motion";

interface Props {
  query: string;
  onSearch: (e: Event) => void;
}

interface ScriptReturn {
  query: string;
  onSearch: (e: Event) => void;
  inputRef: (el: Element) => void;
}

export const ApiSearch = define<Props, ScriptReturn>({
  script: ({ props, onMount }) => {
    let inputEl: HTMLInputElement | null = null;

    const inputRef = (el: Element) => {
      inputEl = el as HTMLInputElement;
    };

    onMount(() => {
      if (inputEl) {
        inputEl.style.transform = "scale(1)";
        inputEl.style.transition = "border-color 0.2s ease, box-shadow 0.2s ease";

        const onMouseEnter = () => {
          animate(inputEl!, { scale: 1.02 } as any, { duration: 0.2, easing: "ease-out" } as any);
        };

        const onMouseLeave = () => {
          if (document.activeElement !== inputEl) {
            animate(inputEl!, { scale: 1 } as any, { duration: 0.2, easing: "ease-out" } as any);
          }
        };

        const onFocus = () => {
          animate(inputEl!, { scale: 1.02 } as any, { duration: 0.2, easing: "ease-out" } as any);
        };

        const onBlur = () => {
          animate(inputEl!, { scale: 1 } as any, { duration: 0.2, easing: "ease-out" } as any);
        };

        inputEl.addEventListener("mouseenter", onMouseEnter);
        inputEl.addEventListener("mouseleave", onMouseLeave);
        inputEl.addEventListener("focus", onFocus);
        inputEl.addEventListener("blur", onBlur);

        return () => {
          if (inputEl) {
            inputEl.removeEventListener("mouseenter", onMouseEnter);
            inputEl.removeEventListener("mouseleave", onMouseLeave);
            inputEl.removeEventListener("focus", onFocus);
            inputEl.removeEventListener("blur", onBlur);
          }
        };
      }
      return undefined;
    });

    return { query: props.query, onSearch: props.onSearch, inputRef };
  },
  template: ({ query, onSearch, inputRef }) => (
    <div style="max-width: 500px;">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search API..."
        value={query}
        onInput={onSearch}
        class="tagix-input w-full outline-none focus:outline-none ring-0 focus:ring-0 border-transparent focus:border-transparent"
        style="outline: none !important; box-shadow: none !important; border: 1px solid transparent !important;"
        autofocus
      />
    </div>
  ),
});
