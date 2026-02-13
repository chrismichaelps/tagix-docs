import { taggedEnum } from "tagix";

export const LanguageSelectorState = taggedEnum({
  Closed: {},
  Open: {},
});

export type LanguageSelectorStateType = typeof LanguageSelectorState.State;
