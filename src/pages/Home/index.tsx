import { define, useHead } from "@effuse/core";
import { Link } from "@effuse/router";
import { version } from "../../../node_modules/tagix/package.json" with { type: "json" };
import "./styles.css";

interface HomePageScriptReturn {}

export const HomePage = define<{}, HomePageScriptReturn>({
  script: ({}) => {
    useHead({
      title: "Tagix - Type-Safe State Management",
      description:
        "Strictly typed state management powered by Tagged Unions, Inferred Actions, and exhaustive Pattern Matching.",
    });

    return () => {};
  },
  template: ({}) => (
    <main class="tagix-home">
      <section class="tagix-hero">
        <div class="tagix-hero-content">
          <div class="tagix-hero-split">
            <div class="tagix-hero-text">
              <div class="tagix-wordmark">
                <span class="tagix-wordmark-title">Tagix</span>
              </div>
              <p class="tagix-tagline serif">
                Strictly typed state management powered by Tagged Unions, Inferred Actions, and
                exhaustive Pattern Matching.
              </p>
              <div class="tagix-button-group">
                <Link to="/docs" class="tagix-btn-primary">
                  <span>Get Started</span>
                </Link>
                <a
                  href="https://github.com/chrismichaelps/tagix"
                  class="tagix-btn-secondary"
                  target="_blank"
                  rel="noopener"
                >
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
            <img
              src="/illustrations/home_hero_abstract.svg"
              alt="Tagix Abstract Art"
              class="tagix-hero-art"
              height="100px"
              width="100px"
            />
          </div>
        </div>
      </section>

      <section class="tagix-section">
        <h2 class="tagix-section-title">Releases</h2>
        <div class="tagix-updates-column">
          <div class="tagix-update-item">
            <div class="tagix-update-header">
              <span class="tagix-update-label">New</span>
              <p class="tagix-update-title">Tagix v{version}</p>
              <p class="tagix-update-date">Feb 7, 2026</p>
            </div>
            <Link class="tagix-update-link" to="/releases">
              <span>Read more</span>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="currentColor">
                <path d="M4.14585 9.87492L14.4584 9.87492L9.60419 5.04158L10.5 4.14575L16.8542 10.4999L10.5 16.8541L9.60419 15.9583L14.4584 11.1249L4.14585 11.1249L4.14585 9.87492Z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section class="tagix-section">
        <h2 class="tagix-section-title">Type Safety by Design</h2>
        <p class="tagix-section-subtitle">
          Built to leverage TypeScript's control flow analysis for robust application state
        </p>

        <div class="tagix-grid">
          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_modular.svg"
                alt="Modular"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">Tagged Unions</h3>
            <p class="tagix-card-text">
              Define state as mathematically exhaustive discriminated unions. Impossible states
              become compile-time errors.
            </p>
          </div>

          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_reactive.svg"
                alt="Reactive"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">Inferred Actions</h3>
            <p class="tagix-card-text">
              Declare actions with automatic type inference. The compiler derives payload and
              reducer types directly from your implementation.
            </p>
          </div>

          <div class="tagix-card">
            <div class="tagix-icon">
              <img
                src="/illustrations/feature_safe.svg"
                alt="Safe"
                style="width: 48px; height: 48px;"
              />
            </div>
            <h3 class="tagix-card-title">Pattern Matching</h3>
            <p class="tagix-card-text">
              Enforce handling of all state variants. TypeScript's control flow analysis guarantees
              your application logic is exhaustive.
            </p>
          </div>
        </div>
      </section>
    </main>
  ),
});
