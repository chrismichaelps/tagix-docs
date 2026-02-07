import { define, useHead } from "@effuse/core";
import { Link } from "@effuse/router";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

export const TermsPage = define({
  script: () => {
    useHead({
      title: "Terms of Service - Tagix",
      description: "Terms of service for using Tagix, the type-safe state management library.",
    });

    setTimeout(() => initPageAnimations(), 100);

    return {};
  },
  template: () => (
    <div class="tagix-home">
      <main class="tagix-main">
        <section class="tagix-section">
          <div class="tagix-section-content tagix-section-narrow internal-nav-fix">
            <div class="tagix-hero-split">
              <div class="tagix-hero-text">
                <h1 class="tagix-page-title">Terms of Service</h1>
                <p class="tagix-page-date">Last updated: February 2026</p>
              </div>
              <img
                src="/illustrations/terms.svg"
                alt="Terms of Service Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <h2>1. Acceptance of Terms</h2>
              <p class="serif">
                By installing, accessing, or using the Tagix software library, you agree to be bound
                by these Terms of Service. If you do not agree to these terms, please do not use the
                library in your projects.
              </p>

              <h2>2. License</h2>
              <p class="serif">
                Tagix is released under the MIT License. You are free to use, copy, modify, merge,
                publish, distribute, sublicense, and/or sell copies of the software, subject to the
                conditions of the MIT License.
              </p>

              <h2>3. Disclaimer of Warranties</h2>
              <p class="serif">
                Tagix is provided "as is" without warranty of any kind, express or implied,
                including but not limited to the warranties of merchantability, fitness for a
                particular purpose, and noninfringement.
              </p>

              <h2>4. Limitation of Liability</h2>
              <p class="serif">
                In no event shall the authors or copyright holders be liable for any claim, damages,
                or other liability, whether in an action of contract, tort, or otherwise, arising
                from, out of, or in connection with the software or the use or other dealings in the
                software.
              </p>

              <h2>5. Changes to Terms</h2>
              <p class="serif">
                We reserve the right to modify these terms at any time. Continued use of Tagix after
                any changes constitutes acceptance of the new terms.
              </p>

              <h2>6. Contact</h2>
              <p class="serif">
                For questions about these terms, please visit our{" "}
                <Link to="/contact">contact page</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
