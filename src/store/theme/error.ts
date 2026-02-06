import { TaggedError } from "tagix";

export const ThemeInitError = TaggedError("ThemeInitError");
export type ThemeInitError = InstanceType<typeof ThemeInitError>;

export const ThemeSwitchError = TaggedError("ThemeSwitchError");
export type ThemeSwitchError = InstanceType<typeof ThemeSwitchError>;
