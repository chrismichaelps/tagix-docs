import { TaggedError } from "tagix";

export const GeneratorError = TaggedError("GeneratorError");

export type GeneratorErrorType = InstanceType<typeof GeneratorError>;
