import { RepositoryBase, RestControllerBase } from "../../src";
import { MockEntity } from "./mock-entity";
import { MockRoute } from "./mock-route";
import { MockRepository } from "./mock-repository";

export class MockRestController extends RestControllerBase<MockEntity, MockRoute, {}> {
  getEndpoint(): MockRoute {
    return MockRoute.API;
  }
  getRepository(): RepositoryBase<MockEntity> {
    return new MockRepository();
  }
}
