import { define, signal } from "@effuse/core";
import Prism from "prismjs";

interface CodeBlockProps {
  language?: string;
  code: string;
}

interface CodeBlockScriptReturn {
  setCodeRef: (el: Element) => void;
  language?: string;
  code: string;
}

export const CodeBlock = define<CodeBlockProps, CodeBlockScriptReturn>({
  script: ({ props, onMount }) => {
    const codeRef = signal<HTMLElement | null>(null);

    const setCodeRef = (el: Element) => {
      codeRef.value = el as HTMLElement;
    };

    onMount(() => {
      if (codeRef.value) {
        Prism.highlightElement(codeRef.value);
      }
      return undefined;
    });

    return {
      setCodeRef,
      language: props.language,
      code: props.code,
    };
  },
  template: ({ setCodeRef, language, code }) => {
    const languageClass = language ? `language-${language}` : "language-text";

    return (
      <div class="tagix-code-block-container" data-rendered-by="tagix-prism">
        {language && (
          <div class="tagix-code-block-header">
            <span class="tagix-code-block-lang">{language}</span>
          </div>
        )}
        <pre class={`${languageClass} tagix-pre`}>
          <code ref={setCodeRef} class={languageClass}>
            {code}
          </code>
        </pre>
      </div>
    );
  },
});
