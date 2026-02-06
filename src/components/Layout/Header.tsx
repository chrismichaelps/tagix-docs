import { define, signal } from "@effuse/core";
import { Link } from "@effuse/router";
import { HEADER_CLASSES, ROUTES, ASSETS } from "./constants";

export const Header = define({
  script: () => {
    const isMenuOpen = signal(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    return { isMenuOpen, toggleMenu, closeMenu };
  },
  template: ({ isMenuOpen, toggleMenu, closeMenu }) => (
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
        <Link to={ROUTES.DOCS} class="tagix-mobile-menu-link" onClick={closeMenu}>
          Docs
        </Link>
        <a
          href="https://github.com/chrismichaelps/tagix"
          target="_blank"
          rel="noopener"
          class="tagix-mobile-menu-link"
        >
          GitHub
        </a>
      </nav>
    </>
  ),
});
