import { IdentifiableEntity } from "./identifiable-entity";
import { PermissionEntity } from "./permission-entity";

export interface PermissionHolderEntity {
  permissions: PermissionEntity[];
}