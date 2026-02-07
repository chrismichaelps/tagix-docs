import { define, signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { navigateTo } from "@effuse/router";
import { HEADER_CLASSES, ROUTES, ASSETS } from "./constants";
import { closeMenu, toggleMenu, mobileMenuStore, MobileMenuState } from "../../store/mobileMenu";

export const Header = define({
  script: ({ useCallback }) => {
    const isMenuOpen = signal(MobileMenuState.$is("Open")(mobileMenuStore.stateValue));

    mobileMenuStore.subscribe((state) => {
      isMenuOpen.value = MobileMenuState.$is("Open")(state);
    });

    const handleDocsClick = useCallback((e: Event) => {
      e.preventDefault();
      closeMenu();
      navigateTo(ROUTES.DOCS);
    });

    const handleApiClick = useCallback((e: Event) => {
      e.preventDefault();
      closeMenu();
      navigateTo(ROUTES.API);
    });

    const handleGitHubClick = useCallback((e: Event) => {
      e.preventDefault();
      closeMenu();
      window.open("https://github.com/chrismichaelps/tagix", "_blank", "noopener,noreferrer");
    });

    return { isMenuOpen, toggleMenu, handleDocsClick, handleApiClick, handleGitHubClick };
  },
  template: ({ isMenuOpen, toggleMenu, handleDocsClick, handleApiClick, handleGitHubClick }) => (
    <>
      <header class={HEADER_CLASSES.HEADER}>
        <div class={HEADER_CLASSES.CONTENT}>
          <Link to={ROUTES.HOME} class={HEADER_CLASSES.LOGO}>
            <img src={ASSETS.LOGO} alt="Tagix Logo" class={HEADER_CLASSES.LOGO_IMG} />
          </Link>

          <nav class={HEADER_CLASSES.NAV}>
            <Link to={ROUTES.DOCS} class={HEADER_CLASSES.NAV_LINK}>
              Docs
            </Link>
            <Link to={ROUTES.API} class={HEADER_CLASSES.NAV_LINK}>
              API
            </Link>
          </nav>

          <button
            class="tagix-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen.value}
          >
            <span class="tagix-hamburger-line"></span>
            <span class="tagix-hamburger-line"></span>
            <span class="tagix-hamburger-line"></span>
          </button>
        </div>
      </header>

      <nav class={`tagix-mobile-menu ${isMenuOpen.value ? "is-open" : ""}`}>
        <a href="/docs" class="tagix-mobile-menu-link" onClick={handleDocsClick}>
          Docs
        </a>
        <a href="/api" class="tagix-mobile-menu-link" onClick={handleApiClick}>
          API
        </a>
        <a
          href="https://github.com/chrismichaelps/tagix"
          target="_blank"
          rel="noopener"
          class="tagix-mobile-menu-link"
          onClick={handleGitHubClick}
        >
          GitHub
        </a>
      </nav>
    </>
  ),
});
