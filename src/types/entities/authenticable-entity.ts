import { HumanIdentifiable } from "./human-identifiable";
import { IdentifiableEntity } from "./identifiable";
import { PermissionHolderEntity } from "./permission-holder-entity";

export type AuthenticableEntity = IdentifiableEntity & PermissionHolderEntity & HumanIdentifiable;