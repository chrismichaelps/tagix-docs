import { defineHook } from "@effuse/core";
import {
  mobileMenuStore,
  MobileMenuState,
  openMenu,
  closeMenu,
  toggleMenu,
} from "../store/mobileMenu";
import { UseMobileMenuReturn } from "../types";

export const useMobileMenu = defineHook<{}, UseMobileMenuReturn>({
  name: "useMobileMenu",
  setup: ({ signal }) => {
    const isOpen = signal(MobileMenuState.$is("Open")(mobileMenuStore.stateValue));

    mobileMenuStore.subscribe((state) => {
      isOpen.value = MobileMenuState.$is("Open")(state);
    });

    return {
      isOpen,
      toggle: toggleMenu,
      open: openMenu,
      close: closeMenu,
    };
  },
});
