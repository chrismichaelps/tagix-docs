import { MOBILE_MENU_ID, CSS_CLASSES } from "./constants";

export function updateMenuVisibility(open: boolean): void {
  const mobileMenu = document.getElementById(MOBILE_MENU_ID);
  if (mobileMenu) {
    if (open) {
      mobileMenu.classList.remove(CSS_CLASSES.HIDDEN);
    } else {
      mobileMenu.classList.add(CSS_CLASSES.HIDDEN);
    }
  }
}

export function isMenuVisible(): boolean {
  const mobileMenu = document.getElementById(MOBILE_MENU_ID);
  return mobileMenu ? !mobileMenu.classList.contains(CSS_CLASSES.HIDDEN) : false;
}
