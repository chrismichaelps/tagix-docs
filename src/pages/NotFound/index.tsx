import { define, useHead } from "@effuse/core";
import { Link } from "@effuse/router";
import { initPageAnimations } from "../../utils/animations";
import "../../styles.css";

interface NotFoundPageScriptReturn {}

export const NotFoundPage = define<{}, NotFoundPageScriptReturn>({
  script: ({ onMount }) => {
    useHead({
      title: "Page Not Found | Tagix",
      description: "The page you are looking for does not exist.",
    });

    onMount(() => {
      setTimeout(() => {
        initPageAnimations();
      }, 100);

      return () => {};
    });

    return () => {};
  },
  template: () => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-hero">
          <div class="tagix-hero-content">
            <div class="tagix-wordmark">
              <img
                src="/illustrations/not_found.svg"
                alt="404 Illustration"
                class="tagix-hero-art"
                style="width: 300px; height: 300px;"
              />
            </div>
            <h1 class="tagix-section-title" style="margin-bottom: 1rem;">
              Page not found
            </h1>
            <p class="tagix-tagline serif">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div class="tagix-button-group">
              <Link to="/" class="tagix-btn-primary">
                Return Home
              </Link>
              <Link to="/docs" class="tagix-btn-secondary">
                View Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
