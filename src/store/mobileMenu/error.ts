import { TaggedError } from "tagix";

export const MobileMenuNotFoundError = TaggedError("MobileMenuNotFoundError");
export type MobileMenuNotFoundError = InstanceType<typeof MobileMenuNotFoundError>;
