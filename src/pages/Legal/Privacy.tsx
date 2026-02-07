import { define, useHead } from "@effuse/core";
import { Link } from "@effuse/router";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

export const PrivacyPage = define({
  script: () => {
    useHead({
      title: "Privacy Policy - Tagix",
      description: "Privacy policy for Tagix, the type-safe state management library.",
    });

    setTimeout(() => initPageAnimations(), 100);

    return {};
  },
  template: () => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-section">
          <div class="tagix-section-content tagix-section-narrow">
            <div class="tagix-hero-split">
              <div class="tagix-hero-text">
                <h1 class="tagix-page-title">Privacy Policy</h1>
                <p class="tagix-page-date">Last updated: February 2026</p>
              </div>
              <img
                src="/illustrations/privacy.svg"
                alt="Privacy Policy Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <h2>1. Information We Collect</h2>
              <p class="serif">
                Tagix is a client-side JavaScript library. We do not collect, store, or process any
                personal information from users of the library.
              </p>

              <h2>2. Documentation Website</h2>
              <p class="serif">
                Our documentation website is a static site. We do not use any tracking cookies or
                analytics services.
              </p>

              <h2>3. Third-Party Services</h2>
              <p class="serif">
                Tagix is distributed through npm (Node Package Manager). When you install Tagix,
                npm's privacy policy applies to that interaction. We encourage you to review npm's
                privacy practices.
              </p>

              <h2>4. Open Source</h2>
              <p class="serif">
                Tagix is open source software. The source code is publicly available on GitHub, and
                contributions are subject to GitHub's privacy policy.
              </p>

              <h2>5. Changes to This Policy</h2>
              <p class="serif">
                We may update this privacy policy from time to time. Any changes will be posted on
                this page with an updated revision date.
              </p>

              <h2>6. Contact</h2>
              <p class="serif">
                For privacy-related questions, please visit our{" "}
                <Link to="/contact">contact page</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
