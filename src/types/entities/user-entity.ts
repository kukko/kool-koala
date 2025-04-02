import { IdentifiableEntity } from "./identifiable-entity";

export interface UserEntity extends IdentifiableEntity {
  username: string;
}