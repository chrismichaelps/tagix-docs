import { TaggedError } from "tagix";

export const AppInitError = TaggedError("AppInitError");
export type AppInitError = InstanceType<typeof AppInitError>;

export const AppRuntimeError = TaggedError("AppRuntimeError");
export type AppRuntimeError = InstanceType<typeof AppRuntimeError>;
