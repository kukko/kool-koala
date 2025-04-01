import { StatusCode } from "../../common/status-code";
import { HumanIdentifiableEntity } from "../entities/human-identifiable-entity";
import { ErrorBase } from "./error-base";

export class AuthorizationError<U extends HumanIdentifiableEntity, PT> extends ErrorBase {
  constructor(user: U, permission: PT) {
    super(`User '${user.username}' does not have permission '${permission}'.`, StatusCode.FORBIDDEN);
  }
}