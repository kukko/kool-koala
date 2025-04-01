import { StatusCode } from "../../common/status-code";
import { HumanIdentifiable } from "../entities/human-identifiable";
import { UserEntity } from "../entities/user-entity";
import { ErrorBase } from "./error-base";

export class AuthorizationError<U extends HumanIdentifiable, PT> extends ErrorBase {
  constructor(user: U, permission: PT) {
    super(`User '${user.username}' does not have permission '${permission}'.`, StatusCode.FORBIDDEN);
  }
}