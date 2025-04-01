import { IdentifiableEntity } from "./identifiable";

export interface UserEntity extends IdentifiableEntity {
  username: string;
}