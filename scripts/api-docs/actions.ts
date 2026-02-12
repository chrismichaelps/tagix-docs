import { createAction, createActionGroup } from "tagix";
import { type GeneratorStateType, type ProcessingResult, type ErrorResult } from "./types.ts";
import { Application, ProjectReflection } from "typedoc";

export const Actions = createActionGroup("Generator", {
  start: createAction<void, GeneratorStateType>("Start").withState(() => ({
    _tag: "Bootstrapping",
  })),

  bootstrapSuccess: createAction<{ app: Application }, GeneratorStateType>(
    "BootstrapSuccess"
  ).withState((_, { app }) => ({ _tag: "Converting", app })),

  convertSuccess: createAction<{ project: ProjectReflection }, GeneratorStateType>(
    "ConvertSuccess"
  ).withState((_, { project }) => ({ _tag: "Processing", project })),

  processSuccess: createAction<ProcessingResult, GeneratorStateType>("ProcessSuccess").withState(
    (_, { items }) => ({ _tag: "Writing", items })
  ),

  finish: createAction<{ count: number }, GeneratorStateType>("Finish").withState(
    (_, { count }) => ({ _tag: "Success", count })
  ),

  fail: createAction<ErrorResult, GeneratorStateType>("Fail").withState((_, { error }) => ({
    _tag: "Failure",
    error,
  })),
});
