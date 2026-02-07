import { define, useHead } from "@effuse/core";
import { initPageAnimations } from "../../utils/animations";
import "./styles.css";

export const ContactPage = define({
  script: () => {
    useHead({
      title: "Contact - Tagix",
      description: "Contact information for Tagix, the type-safe state management library.",
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
                <h1 class="tagix-page-title">Contact Us</h1>
                <p class="tagix-page-date">Last updated: February 2026</p>
              </div>
              <img
                src="/illustrations/contact.svg"
                alt="Contact Illustration"
                class="tagix-hero-art"
              />
            </div>

            <div class="tagix-legal-content">
              <p class="serif">
                We'd love to hear from you. Whether you have a question about features, pricing, or
                anything else, our team is ready to answer all your questions.
              </p>

              <section>
                <h2>Get in Touch</h2>
                <p class="serif">
                  For any inquiries, please email us directly:
                  <br />
                  <a href="mailto:chrisperezsantiago1@gmail.com">chrisperezsantiago1@gmail.com</a>
                </p>
              </section>

              <section>
                <h2>GitHub</h2>
                <p class="serif">
                  Report bugs, request features, or contribute to Tagix on our GitHub repository:
                  <br />
                  <a href="https://github.com/chrismichaelps/tagix" target="_blank" rel="noopener">
                    https://github.com/chrismichaelps/tagix
                  </a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  ),
});
