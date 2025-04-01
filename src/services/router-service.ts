import Router from "koa-router";
import { ControllerConstructor } from "../controllers/controller-base";
import { AuthorizationService } from "./authorization-service";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";
import { Repository } from "typeorm";

export class RouterService {
  private router: Router;
  constructor(private controllers: (ControllerConstructor)[]) {
    this.router = new Router();
    this.controllers.forEach((controllerType) => {
      console.log(`Register endpoints of '${controllerType.name}'`);
      const controller = new controllerType(this.router);
      controller.registerEndpoints();
    });
  }

  getRoutes() {
    return this.router.routes();
  }

  allowedMethods() {
    return this.router.allowedMethods();
  }
}
