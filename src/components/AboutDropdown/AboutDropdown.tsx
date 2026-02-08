import { define, signal } from "@effuse/core";
import { navigateTo } from "@effuse/router";
import {
  aboutDropdownStore,
  AboutDropdownState,
  closeAboutDropdown,
} from "../../store/aboutDropdown";
import { ROUTES } from "../Layout/constants";

export const AboutDropdown = define({
  script: ({ useCallback }) => {
    const isOpen = signal(AboutDropdownState.$is("Open")(aboutDropdownStore.stateValue));

    aboutDropdownStore.subscribe((state) => {
      isOpen.value = AboutDropdownState.$is("Open")(state);
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
      isOpen,
      handleBackdropClick,
      handleReleasesClick,
    };
  },
  template: ({ isOpen, handleBackdropClick, handleReleasesClick }) => (
    <>
      {isOpen.value && (
        <>
          <div class="about-dropdown-backdrop" onClick={handleBackdropClick}></div>
          <div class="about-dropdown">
            <nav class="about-dropdown-nav">
              <a href="/releases" class="about-dropdown-link" onClick={handleReleasesClick}>
                <span>Releases</span>
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  ),
});
