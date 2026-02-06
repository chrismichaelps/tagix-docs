import { TaggedError } from "tagix";

export const DocsParseError = TaggedError("DocsParseError");
export type DocsParseError = InstanceType<typeof DocsParseError>;

export const DocsNotFoundError = TaggedError("DocsNotFoundError");
export type DocsNotFoundError = InstanceType<typeof DocsNotFoundError>;

export const DocsLoadError = TaggedError("DocsLoadError");
export type DocsLoadError = InstanceType<typeof DocsLoadError>;
