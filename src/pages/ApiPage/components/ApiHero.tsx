import { define } from "@effuse/core";
import { ApiSearch } from "./ApiSearch";

interface Props {
  query: string;
  onSearch: (e: Event) => void;
}

interface ScriptReturn {
  query: string;
  onSearch: (e: Event) => void;
}

export const ApiHero = define<Props, ScriptReturn>({
  script: ({ props }) => ({ query: props.query, onSearch: props.onSearch }),
  template: ({ query, onSearch }) => (
    <section class="tagix-hero">
      <div class="tagix-hero-content">
        <div class="tagix-hero-split">
          <div class="tagix-hero-text">
            <div class="tagix-wordmark">
              <h1 class="tagix-wordmark-title">API Reference</h1>
            </div>
            <p class="tagix-tagline serif">
              Complete generated documentation for the Tagix library actions, types, and interfaces.
            </p>
            <ApiSearch query={query} onSearch={onSearch} />
          </div>
          <img
            src="/illustrations/feature_api.svg"
            alt="API Reference"
            class="tagix-hero-art"
            width="100"
            height="100"
          />
        </div>
      </div>
    </section>
  ),
});
