import Router from "koa-router";
import { IdentifiableEntity, RepositoryBase, RestControllerBase } from "../../src";
import { MockEntity } from "./mock-entity";
import { MockRoute } from "./mock-route";
import { MockPermission } from "./mock-permission";
import { getMockRepository } from "./mock-repository";

export function getMockRestController<
  T extends IdentifiableEntity = MockEntity,
  RouteType extends { [J in keyof RouteType]: string } = MockRoute,
  PermissionType extends { [K in keyof PermissionType]: string } = MockPermission
>(
  getEndpoint: () => RouteType[keyof RouteType] = () => {
    return MockRoute.API as RouteType[keyof RouteType];
  },
  getRepository: () => RepositoryBase<T> = () => {
    return getMockRepository(MockEntity) as unknown as RepositoryBase<T>;
  }
) {
  return class MockRestController extends RestControllerBase<T, RouteType, PermissionType> {
    constructor(protected router: Router) {
      super(router);
    }
    getEndpoint(): RouteType[keyof RouteType] {
      return getEndpoint();
    }
    getRepository(): RepositoryBase<T> {
      return getRepository();
    }
  }
}