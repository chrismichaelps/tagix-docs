import { define, signal, computed } from "@effuse/core";
import { Link } from "@effuse/router";
import { navigateTo } from "@effuse/router";
import { HEADER_CLASSES, ROUTES, ASSETS } from "./constants";
import { closeMenu, toggleMenu, mobileMenuStore, MobileMenuState } from "../../store/mobileMenu";
import {
  toggleAboutDropdown,
  aboutDropdownStore,
  AboutDropdownState,
  closeAboutDropdown,
} from "../../store/aboutDropdown";
import { i18nStore } from "../../store/appI18n";
import { AboutDropdown } from "../AboutDropdown/AboutDropdown";
import { LanguageSelector } from "../LanguageSelector";

export const Header = define({
  script: ({ useCallback, useStore }) => {
    const isMenuOpen = signal(MobileMenuState.$is("Open")(mobileMenuStore.stateValue));
    const isAboutOpen = signal(AboutDropdownState.$is("Open")(aboutDropdownStore.stateValue));
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.nav);

    const aboutIcon = computed(() =>
      isAboutOpen.value
        ? "/icons/vt-flyout-button-text-icon-active.svg"
        : "/icons/vt-flyout-button-text-icon.svg"
    );

    mobileMenuStore.subscribe((state) => {
      isMenuOpen.value = MobileMenuState.$is("Open")(state);
    });

    aboutDropdownStore.subscribe((state) => {
      isAboutOpen.value = AboutDropdownState.$is("Open")(state);
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

    const handleAboutClick = useCallback((e: Event) => {
      e.preventDefault();
      toggleAboutDropdown();
    });

    const handleGitHubClick = useCallback((e: Event) => {
      e.preventDefault();
      closeMenu();
      window.open("https://github.com/chrismichaelps/tagix", "_blank", "noopener,noreferrer");
    });

    const handleReleasesClick = useCallback((e: Event) => {
      e.preventDefault();
      closeAboutDropdown();
      closeMenu();
      navigateTo(ROUTES.RELEASES);
    });

    return {
      isMenuOpen,
      isAboutOpen,
      aboutIcon,
      toggleMenu,
      handleDocsClick,
      handleApiClick,
      handleAboutClick,
      handleGitHubClick,
      handleReleasesClick,
      t: tVal,
    };
  },
  template: ({
    isMenuOpen,
    isAboutOpen,
    aboutIcon,
    toggleMenu,
    handleDocsClick,
    handleApiClick,
    handleAboutClick,
    handleGitHubClick,
    handleReleasesClick,
    t,
  }) => (
    <>
      <header class={HEADER_CLASSES.HEADER}>
        <div class={HEADER_CLASSES.CONTENT}>
          <Link to={ROUTES.HOME} class={HEADER_CLASSES.LOGO}>
            <img src={ASSETS.LOGO} alt="Tagix Logo" class={HEADER_CLASSES.LOGO_IMG} />
          </Link>

          <nav class={HEADER_CLASSES.NAV}>
            <Link to={ROUTES.DOCS} class={HEADER_CLASSES.NAV_LINK}>
              {() => t.value?.docs}
            </Link>
            <Link to={ROUTES.API} class={HEADER_CLASSES.NAV_LINK}>
              {() => t.value?.api}
            </Link>
            <div class={`tagix-nav-item-wrapper ${isAboutOpen.value ? "is-open" : ""}`}>
              <button class="tagix-nav-link tagix-nav-button" onClick={handleAboutClick}>
                <span>{() => t.value?.about}</span>
                <img
                  src={(() => aboutIcon.value) as any}
                  alt="Toggle About"
                  class="tagix-nav-icon"
                  width="20"
                  height="20"
                />
              </button>
              <AboutDropdown />
            </div>
            <LanguageSelector />
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
          {() => t.value?.docs}
        </a>
        <a href="/api" class="tagix-mobile-menu-link" onClick={handleApiClick}>
          {() => t.value?.api}
        </a>
        <button
          class={`tagix-mobile-menu-link tagix-mobile-menu-button ${isAboutOpen.value ? "is-open" : ""}`}
          onClick={handleAboutClick}
        >
          <span>{() => t.value?.about}</span>
          <img
            src="/icons/vt-flyout-button-text-icon.svg"
            alt=""
            class="tagix-mobile-chevron"
            width="20"
            height="20"
          />
        </button>
        <div class={`tagix-mobile-nav-expand ${isAboutOpen.value ? "is-open" : ""}`}>
          <div class="tagix-mobile-nav-content">
            <a href="/releases" class="tagix-mobile-sub-link" onClick={handleReleasesClick}>
              {() => t.value?.releases}
            </a>
          </div>
        </div>
        <a
          href="https://github.com/chrismichaelps/tagix"
          target="_blank"
          rel="noopener"
          class="tagix-mobile-menu-link"
          onClick={handleGitHubClick}
        >
          {() => t.value?.github}
        </a>
        <div class="tagix-mobile-menu-divider"></div>
        <div class="tagix-mobile-lang-selector">
          <LanguageSelector />
        </div>
      </nav>
    </>
  ),
});
