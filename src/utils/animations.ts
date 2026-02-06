import gsap from "gsap";
import { ANIMATION_SELECTORS, ANIMATION_DEFAULTS } from "../constants";

const expoOut = "power4.out";

export function animateFadeInUp(
  elements: Element | Element[] | NodeListOf<Element>,
  options: { delay?: number; stagger?: number; duration?: number } = {}
) {
  const {
    delay = ANIMATION_DEFAULTS.DELAY,
    stagger = ANIMATION_DEFAULTS.STAGGER,
    duration = ANIMATION_DEFAULTS.DURATION,
  } = options;

  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: expoOut,
    }
  );
}

export function animateHeroText(element: Element, options: { delay?: number } = {}) {
  const { delay = ANIMATION_DEFAULTS.HERO_DELAY } = options;

  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay,
      ease: expoOut,
    }
  );
}

export function animateSection(element: Element, options: { delay?: number } = {}) {
  const { delay = 0 } = options;

  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: expoOut,
    }
  );
}

export function animateListItems(
  container: Element,
  itemSelector: string,
  options: { delay?: number; stagger?: number } = {}
) {
  const { delay = 0, stagger = 0.08 } = options;
  const items = container.querySelectorAll(itemSelector);

  gsap.fromTo(
    items,
    { opacity: 0, x: -15 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay,
      stagger,
      ease: expoOut,
    }
  );
}

export function initPageAnimations() {
  const hero = document.querySelector(ANIMATION_SELECTORS.HERO);
  if (hero) animateHeroText(hero);

  const sections = document.querySelectorAll(ANIMATION_SELECTORS.SECTION);
  sections.forEach((section, i) => {
    animateSection(section, {
      delay: ANIMATION_DEFAULTS.SECTION_DELAY_BASE + i * ANIMATION_DEFAULTS.SECTION_DELAY_STEP,
    });
  });

  const lists = document.querySelectorAll(ANIMATION_SELECTORS.LIST);
  lists.forEach((list, i) => {
    animateListItems(list, ANIMATION_SELECTORS.ITEM, {
      delay: ANIMATION_DEFAULTS.LIST_DELAY_BASE + i * ANIMATION_DEFAULTS.LIST_DELAY_STEP,
    });
  });
}

export function animateThemeTransition(
  onMidpoint: () => void,
  options: { duration?: number } = {}
): void {
  const { duration = 0.3 } = options;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    background: currentColor;
    opacity: 0;
  `;
  document.body.appendChild(overlay);

  gsap
    .timeline()
    .to(overlay, {
      opacity: 0.08,
      duration: duration / 2,
      ease: "power2.in",
    })
    .call(() => {
      onMidpoint();
    })
    .to(overlay, {
      opacity: 0,
      duration: duration / 2,
      ease: "power2.out",
      onComplete: () => {
        overlay.remove();
      },
    });
}
