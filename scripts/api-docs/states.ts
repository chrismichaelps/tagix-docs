import { taggedEnum } from "tagix";
import { Application, ProjectReflection } from "typedoc";
import type { ApiItem } from "./types.ts";

export const GeneratorState = taggedEnum({
  Idle: {},
  Bootstrapping: {},
  Converting: { app: {} as Application },
  Processing: { project: {} as ProjectReflection },
  Writing: { items: [] as ApiItem[] },
  Success: { count: 0 },
  Failure: { error: "" },
});

export type GeneratorStateType = typeof GeneratorState.State;
