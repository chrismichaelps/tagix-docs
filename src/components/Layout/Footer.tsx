import { define, computed, type Signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { version } from "../../../node_modules/tagix/package.json" with { type: "json" };
import { FOOTER_CLASSES, ROUTES, EXTERNAL_LINKS, ASSETS } from "./constants";
import { i18nStore } from "../../store/appI18n";
import "../../styles.css";

interface FooterScriptReturn {
  t: Signal<any>;
}

export const Footer = define<{}, FooterScriptReturn>({
  script: ({ useStore }) => {
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.footer);
    return { t: tVal };
  },
  template: ({ t }) => (
    <footer class={FOOTER_CLASSES.FOOTER}>
      <div class={FOOTER_CLASSES.CONTENT}>
        <nav class={FOOTER_CLASSES.NAV}>
          <div class={FOOTER_CLASSES.SECTION}>
            <h3 class={FOOTER_CLASSES.TITLE}>{() => t.value?.sections.site}</h3>
            <ul class={FOOTER_CLASSES.LIST}>
              <li>
                <Link to={ROUTES.HOME}>{() => i18nStore.translations.value?.nav.home}</Link>
              </li>
              <li>
                <Link to={ROUTES.DOCS}>{() => i18nStore.translations.value?.nav.docs}</Link>
              </li>
              <li>
                <Link to={ROUTES.API}>{() => i18nStore.translations.value?.nav.api}</Link>
              </li>
              <li>
                <Link to={ROUTES.RELEASES}>{() => i18nStore.translations.value?.nav.releases}</Link>
              </li>
            </ul>
          </div>

          <div class={FOOTER_CLASSES.SECTION}>
            <h3 class={FOOTER_CLASSES.TITLE}>{() => t.value?.sections.social}</h3>
            <ul class={FOOTER_CLASSES.LIST}>
              <li>
                <a
                  href={EXTERNAL_LINKS.GITHUB}
                  target="_blank"
                  rel="noopener"
                  class={FOOTER_CLASSES.SOCIAL_LINK}
                >
                  <img src={ASSETS.GITHUB_ICON} alt="GitHub" class={FOOTER_CLASSES.SOCIAL_ICON} />
                  {() => i18nStore.translations.value?.nav.github}
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener"
                  class={FOOTER_CLASSES.SOCIAL_LINK}
                >
                  <img src="/icons/rss.svg" alt="RSS Feed" class={FOOTER_CLASSES.SOCIAL_ICON} />
                  {() => t.value?.links.rss}
                </a>
              </li>
            </ul>
          </div>

          <div class={FOOTER_CLASSES.SECTION}>
            <h3 class={FOOTER_CLASSES.TITLE}>{() => t.value?.sections.legal}</h3>
            <ul class={FOOTER_CLASSES.LIST}>
              <li>
                <Link to={ROUTES.TERMS}>{() => t.value?.links.terms}</Link>
              </li>
              <li>
                <Link to={ROUTES.PRIVACY}>{() => t.value?.links.privacy}</Link>
              </li>
              <li>
                <Link to={ROUTES.DISCLAIMER}>{() => t.value?.links.disclaimer}</Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT}>{() => t.value?.links.contact}</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div class={FOOTER_CLASSES.BOTTOM}>
          <div class={FOOTER_CLASSES.VERSION}>
            <img src={ASSETS.FAVICON} alt="Tagix" class={FOOTER_CLASSES.VERSION_ICON} />
            <span>{() => t.value?.latestVersion.replace("{version}", version)}</span>
          </div>
          <div class="tagix-footer-built-with">
            <span>{() => t.value?.builtWith}</span>
            <img src={ASSETS.EFFUSE_LOGO} alt="Effuse" class="tagix-footer-effuse-logo" />
            <span class="tagix-footer-effuse-text">Effuse</span>
          </div>
          <div class={FOOTER_CLASSES.COPYRIGHT}>{() => t.value?.copyright}</div>
        </div>
      </div>
    </footer>
  ),
});
