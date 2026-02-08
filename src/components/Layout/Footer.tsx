import { Link } from "@effuse/router";
import { version } from "../../../node_modules/tagix/package.json" with { type: "json" };
import { FOOTER_CLASSES, ROUTES, EXTERNAL_LINKS, ASSETS } from "./constants";
import "../../styles.css";

export const Footer = () => (
  <footer class={FOOTER_CLASSES.FOOTER}>
    <div class={FOOTER_CLASSES.CONTENT}>
      <nav class={FOOTER_CLASSES.NAV}>
        <div class={FOOTER_CLASSES.SECTION}>
          <h3 class={FOOTER_CLASSES.TITLE}>Site</h3>
          <ul class={FOOTER_CLASSES.LIST}>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.DOCS}>Docs</Link>
            </li>
            <li>
              <Link to={ROUTES.API}>API</Link>
            </li>
            <li>
              <Link to={ROUTES.RELEASES}>Releases</Link>
            </li>
          </ul>
        </div>

        <div class={FOOTER_CLASSES.SECTION}>
          <h3 class={FOOTER_CLASSES.TITLE}>Social</h3>
          <ul class={FOOTER_CLASSES.LIST}>
            <li>
              <a
                href={EXTERNAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener"
                class={FOOTER_CLASSES.SOCIAL_LINK}
              >
                <img src={ASSETS.GITHUB_ICON} alt="GitHub" class={FOOTER_CLASSES.SOCIAL_ICON} />
                GitHub
              </a>
            </li>
            <li>
              <a href="/rss.xml" target="_blank" rel="noopener" class={FOOTER_CLASSES.SOCIAL_LINK}>
                <img src="/icons/rss.svg" alt="RSS Feed" class={FOOTER_CLASSES.SOCIAL_ICON} />
                RSS Feed
              </a>
            </li>
          </ul>
        </div>

        <div class={FOOTER_CLASSES.SECTION}>
          <h3 class={FOOTER_CLASSES.TITLE}>Legal</h3>
          <ul class={FOOTER_CLASSES.LIST}>
            <li>
              <Link to={ROUTES.TERMS}>Terms</Link>
            </li>
            <li>
              <Link to={ROUTES.PRIVACY}>Privacy</Link>
            </li>
            <li>
              <Link to={ROUTES.DISCLAIMER}>Disclaimer</Link>
            </li>
            <li>
              <Link to={ROUTES.CONTACT}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div class={FOOTER_CLASSES.BOTTOM}>
        <div class={FOOTER_CLASSES.VERSION}>
          <img src={ASSETS.FAVICON} alt="Tagix" class={FOOTER_CLASSES.VERSION_ICON} />
          <span>Latest version: {version}</span>
        </div>
        <div class="tagix-footer-built-with">
          <span>Built with</span>
          <img src={ASSETS.EFFUSE_LOGO} alt="Effuse" class="tagix-footer-effuse-logo" />
          <span class="tagix-footer-effuse-text">Effuse</span>
        </div>
        <div class={FOOTER_CLASSES.COPYRIGHT}>&copy; 2026 Tagix. MIT License.</div>
      </div>
    </div>
  </footer>
);
