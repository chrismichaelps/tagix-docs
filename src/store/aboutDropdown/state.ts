import { createStore, taggedEnum, createAction } from "tagix";
import { ACTION_TYPES, STORE_NAME } from "./constants";

export const AboutDropdownState = taggedEnum({
  Closed: {},
  Open: {},
});

export type AboutDropdownStateType = typeof AboutDropdownState.State;

export const closeAction = createAction<undefined, AboutDropdownStateType>(ACTION_TYPES.CLOSE)
  .withPayload(undefined)
  .withState(() => AboutDropdownState.Closed({}));

export const toggleAction = createAction<undefined, AboutDropdownStateType>(ACTION_TYPES.TOGGLE)
  .withPayload(undefined)
  .withState((s) => {
    const isOpen = AboutDropdownState.$is("Open")(s);
    return isOpen ? AboutDropdownState.Closed({}) : AboutDropdownState.Open({});
  });

export const aboutDropdownStore = createStore(AboutDropdownState.Closed({}), AboutDropdownState, {
  name: STORE_NAME,
});

aboutDropdownStore.register(ACTION_TYPES.CLOSE, closeAction);
aboutDropdownStore.register(ACTION_TYPES.TOGGLE, toggleAction);

export const closeAboutDropdown = () => aboutDropdownStore.dispatch(closeAction);
export const toggleAboutDropdown = () => aboutDropdownStore.dispatch(toggleAction);
