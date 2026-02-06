export const STORAGE_KEYS = {
  THEME: "tagix-theme",
} as const;

export const ANIMATION_SELECTORS = {
  HERO: ".hero-animate",
  FADE_IN: ".fade-in",
  SLIDE_UP: ".slide-up",
  SECTION: ".section-animate",
  LIST: ".list-animate",
  ITEM: ".list-item",
} as const;

export const ANIMATION_DEFAULTS = {
  DURATION: 0.6,
  DELAY: 0,
  STAGGER: 0.1,
  EASING: "ease-out",
  HERO_DELAY: 0.2,
  SECTION_DELAY_BASE: 0.3,
  SECTION_DELAY_STEP: 0.15,
  LIST_DELAY_BASE: 0.5,
  LIST_DELAY_STEP: 0.2,
} as const;
