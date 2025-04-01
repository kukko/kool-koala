import Router from "koa-router";
import { AuthorizationService } from "../services/authorization-service";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";

export abstract class ControllerBase<
  U extends AuthenticableEntity,
  P
> {
  constructor(protected router: Router, protected authorizationService: AuthorizationService<U, P>) { }
  abstract registerEndpoints(): void;
  protected getApiUrl(path: string): string {
    if (path.startsWith("/")) {
      return `/api${path}`;
    }
    else {
      return `/api/${path}`;
    }
  }
}

export type ControllerConstructor<
  U extends AuthenticableEntity,
  P
> = new (router: Router, authorizationService: AuthorizationService<U, P>) => ControllerBase<U, P>;