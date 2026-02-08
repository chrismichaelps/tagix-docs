import { define } from "@effuse/core";

export const ReleasesHero = define({
  script: () => ({}),
  template: () => (
    <section class="tagix-hero">
      <div class="tagix-hero-content">
        <div class="tagix-hero-split">
          <div class="tagix-hero-text">
            <div class="tagix-wordmark">
              <h1 class="tagix-wordmark-title">Releases</h1>
            </div>
            <p class="tagix-tagline serif">
              Tagix release history and changelog. Type-safe state management powered by Tagged
              Unions.
            </p>
          </div>
          <img
            src="/illustrations/releases.svg"
            alt="Releases"
            class="tagix-hero-art"
            width="100"
            height="100"
          />
        </div>
      </div>
    </section>
  ),
});
