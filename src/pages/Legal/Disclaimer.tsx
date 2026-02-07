import { define, useHead } from "@effuse/core";
import { Link } from "@effuse/router";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

export const DisclaimerPage = define({
  script: () => {
    useHead({
      title: "Disclaimer - Tagix",
      description: "Disclaimer for Tagix, the type-safe state management library.",
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
                <h1 class="tagix-page-title">Disclaimer</h1>
                <p class="tagix-page-date">Last updated: February 2026</p>
              </div>
              <img
                src="/illustrations/disclaimer.svg"
                alt="Disclaimer Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <h2>General Disclaimer</h2>
              <p class="serif">
                The information provided by Tagix and its documentation is for general informational
                purposes only. While we strive to keep the information up to date and accurate, we
                make no representations or warranties of any kind, express or implied, about the
                completeness, accuracy, reliability, suitability, or availability of the library or
                documentation.
              </p>

              <h2>No Professional Advice</h2>
              <p class="serif">
                The content in our documentation is provided for technical reference and educational
                purposes regarding software development. It does not constitute professional IT
                consulting or architectural advice for your specific use cases.
              </p>

              <h2>External Links</h2>
              <p class="serif">
                Our documentation may contain links to external websites. We have no control over
                the content and availability of those sites and are not responsible for their
                content or practices.
              </p>

              <h2>Use at Your Own Risk</h2>
              <p class="serif">
                Your use of Tagix is at your own risk. The library is provided without any
                guarantees or warranty. In association with the library, we make no warranties of
                any kind, either express or implied.
              </p>

              <h2>Limitation of Liability</h2>
              <p class="serif">
                To the fullest extent permitted by law, we exclude all liability for any loss or
                damage arising out of or in connection with your use of Tagix.
              </p>

              <h2>Contact</h2>
              <p class="serif">
                For questions about this disclaimer, please visit our{" "}
                <Link to="/contact">contact page</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
