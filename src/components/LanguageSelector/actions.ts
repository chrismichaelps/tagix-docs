import { createAction, createActionGroup } from "tagix";
import { LanguageSelectorStateType, LanguageSelectorState } from "./state";

const toggle = createAction<void, LanguageSelectorStateType>("Toggle")
  .withPayload(undefined)
  .withState((state) => {
    if (LanguageSelectorState.$is("Closed")(state)) {
      return LanguageSelectorState.Open({});
    }
    return LanguageSelectorState.Closed({});
  });

const close = createAction<void, LanguageSelectorStateType>("Close")
  .withPayload(undefined)
  .withState(() => LanguageSelectorState.Closed({}));

export const langSelectorActions = createActionGroup("langSelector", {
  toggle,
  close,
});
