import { define } from "@effuse/core";
import { Ink } from "@effuse/ink";
import { CodeBlock } from "../../DocsPage/components/CodeBlock";

interface ReadyProps {
  content: string;
}

interface ReadyScriptReturn {
  content: string;
}

export const Ready = define<ReadyProps, ReadyScriptReturn>({
  script: ({ props }) => ({
    content: props.content,
  }),
  template: ({ content }) => (
    <div class="tagix-markdown-wrapper">
      <div class="tagix-markdown-content">
        <Ink content={content} components={{ CodeBlock }} />
      </div>
    </div>
  ),
});
