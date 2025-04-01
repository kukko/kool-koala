import Router from "koa-router";
import { AuthorizationService } from "../services/authorization-service";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";

export abstract class ControllerBase {
  constructor(protected router: Router) { }
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

export type ControllerConstructor = new (router: Router) => ControllerBase;