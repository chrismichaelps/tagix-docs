import { Signal, ReadonlySignal } from "@effuse/core";

type BreakpointMobile = {
  readonly _tag: "Mobile";
  readonly width: number;
};

type BreakpointTablet = {
  readonly _tag: "Tablet";
  readonly width: number;
};

type BreakpointDesktop = {
  readonly _tag: "Desktop";
  readonly width: number;
};

export type BreakpointState = BreakpointMobile | BreakpointTablet | BreakpointDesktop;

export interface BreakpointConfig {
  readonly mobile?: number;
  readonly tablet?: number;
}

export interface BreakpointReturn {
  readonly state: Signal<BreakpointState>;
  readonly width: ReadonlySignal<number>;
  readonly isMobile: ReadonlySignal<boolean>;
  readonly isTablet: ReadonlySignal<boolean>;
  readonly isDesktop: ReadonlySignal<boolean>;
  readonly isMobileOrSmaller: ReadonlySignal<boolean>;
  readonly isTabletOrSmaller: ReadonlySignal<boolean>;
  readonly breakpoint: ReadonlySignal<string>;
  readonly init: () => void;
  readonly destroy: () => void;
}

export interface UseMobileMenuReturn {
  readonly isOpen: Signal<boolean>;
  readonly toggle: () => void;
  readonly open: () => void;
  readonly close: () => void;
}
