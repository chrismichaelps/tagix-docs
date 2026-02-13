import { define, signal, computed, type Signal } from "@effuse/core";
import { navigateTo } from "@effuse/router";
import {
  aboutDropdownStore,
  AboutDropdownState,
  closeAboutDropdown,
} from "../../store/aboutDropdown";
import { i18nStore } from "../../store/appI18n";
import { ROUTES } from "../Layout/constants";

interface AboutDropdownScriptReturn {
  isOpen: Signal<boolean>;
  t: Signal<any>;
  handleBackdropClick: (e: Event) => void;
  handleReleasesClick: (e: Event) => void;
}

export const AboutDropdown = define<{}, AboutDropdownScriptReturn>({
  script: ({ useCallback, useStore }) => {
    const isStoreOpen = signal(AboutDropdownState.$is("Open")(aboutDropdownStore.stateValue));
    const store = useStore("i18n") as typeof i18nStore;
    const tVal = computed(() => store.translations.value?.nav);

    aboutDropdownStore.subscribe((state) => {
      isStoreOpen.value = AboutDropdownState.$is("Open")(state);
    });

    const handleBackdropClick = useCallback((e: Event) => {
      if ((e.target as HTMLElement).classList.contains("about-dropdown-backdrop")) {
        closeAboutDropdown();
      }
    });

    const handleReleasesClick = useCallback((e: Event) => {
      e.preventDefault();
      closeAboutDropdown();
      navigateTo(ROUTES.RELEASES);
    });

    return {
      isOpen: isStoreOpen,
      t: tVal,
      handleBackdropClick,
      handleReleasesClick,
    };
  },
  template: ({ isOpen, t, handleBackdropClick, handleReleasesClick }) => (
    <>
      {() =>
        isOpen.value && (
          <>
            <div class="about-dropdown-backdrop" onClick={handleBackdropClick}></div>
            <div class="about-dropdown">
              <nav class="about-dropdown-nav">
                <a href="/releases" class="about-dropdown-link" onClick={handleReleasesClick}>
                  <span>{() => t.value?.releases}</span>
                </a>
              </nav>
            </div>
          </>
        )
      }
    </>
  ),
});
