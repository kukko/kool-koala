import { HumanIdentifiableEntity } from "./human-identifiable-entity";
import { IdentifiableEntity } from "./identifiable-entity";
import { PermissionHolderEntity } from "./permission-holder-entity";

export type AuthenticableEntity = IdentifiableEntity & PermissionHolderEntity & HumanIdentifiableEntity;
