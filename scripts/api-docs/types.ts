import { ReflectionKind } from "typedoc";
import type { GeneratorState } from "./states.ts";

export { Application, ProjectReflection, ReflectionKind } from "typedoc";

export interface ApiItem {
  name: string;
  kind: string;
  description: string;
}

export type GeneratorStateType = typeof GeneratorState.State;

export interface ProcessingResult {
  items: ApiItem[];
  count: number;
}

export interface ErrorResult {
  error: string;
}

export type KindMap = Partial<Record<ReflectionKind, string>>;

export interface ExtractResult {
  summary: string;
  tags: string[];
}
