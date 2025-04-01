import { IdentifiableEntity } from "./identifiable";
import { PermissionEntity } from "./permission-entity";

export interface PermissionHolderEntity {
  permissions: PermissionEntity[];
}