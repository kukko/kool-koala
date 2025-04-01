import Router from "koa-router";
import { ControllerConstructor } from "../controllers/controller-base";
import { AuthorizationService } from "./authorization-service";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";
import { Repository } from "typeorm";

export class RouterService<U extends AuthenticableEntity, P> {
  private router: Router;
  private authorizationService: AuthorizationService<U, P>;
  constructor(private controllers: (ControllerConstructor<U, P>)[], repository: Repository<U>) {
    this.router = new Router();
    this.authorizationService = new AuthorizationService<U, P>(repository);
    this.controllers.forEach((controllerType) => {
      console.log(`Register endpoints of '${controllerType.name}'`);
      const controller = new controllerType(this.router, this.authorizationService);
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
