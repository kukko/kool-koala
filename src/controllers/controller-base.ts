import Router from "koa-router";
import { KoalApp } from "../common";

export abstract class ControllerBase {
  constructor(protected router: Router) { }
  abstract registerEndpoints(): void;
  protected getApiUrl(path: string): string {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    return `${KoalApp.getInstance().getConfiguration().getRestPrefix()}${path}`;
  }
}

export type ControllerConstructor = new (router: Router) => ControllerBase;