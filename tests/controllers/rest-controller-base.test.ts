import { expect } from "chai";

import { AuthenticableEntity, ControllerBase, IdentifiableEntity, KoalApp, RepositoryBase, RestControllerBase } from "../../src/index";
import Router from "koa-router";
import { getKoalAppMock } from "../mocks/koal-app-mock";
import { mockConsole, restoreConsole } from "../mocks/console-mock";

const defaultApiPrefix = '/api';

class MockEntity implements IdentifiableEntity {
  id: number;
}

enum MockRoute {
  API = '/mock',
}

enum MockPermission {
  LIST = 'list',
  VIEW = 'view',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

class MockRepository extends RepositoryBase<MockEntity> {
  getEntityType(): new () => MockEntity {
    return MockEntity;
  }
}

class MockController extends RestControllerBase<MockEntity, MockRoute, MockPermission> {
  constructor(protected router: Router) {
    super(router);
  }
  getEndpoint(): MockRoute {
    return MockRoute.API;
  }
  getRepository(): RepositoryBase<MockEntity> {
    return new MockRepository();
  }
}

describe('ControllerBase', () => {
  let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
  before((done) => {
    mockConsole();
    koalApp = getKoalAppMock({
      port: 3000,
      controllers: [
        MockController
      ]
    });
    koalApp.initialize().then(() => {
      done();
    })
  });
  it('should be defined', () => {
    expect(ControllerBase).to.be.a('function');
  });
  it('Should register LIST endpoint', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === `${defaultApiPrefix}${MockRoute.API}` && route.methods.includes('GET');
    })).to.have.length(1);
  });
  it('Should register VIEW endpoint', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === `${defaultApiPrefix}${MockRoute.API}/:id` && route.methods.includes('GET');
    })).to.have.length(1);
  });
  it('Should register CREATE endpoint', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === `${defaultApiPrefix}${MockRoute.API}` && route.methods.includes('POST');
    })).to.have.length(1);
  });
  it('Should register EDIT endpoint', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === `${defaultApiPrefix}${MockRoute.API}/:id` && route.methods.includes('PUT');
    })).to.have.length(1);
  });
  it('Should register DELETE endpoint', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === `${defaultApiPrefix}${MockRoute.API}/:id` && route.methods.includes('DELETE');
    })).to.have.length(1);
  });
  after(() => {
    KoalApp.resetInstance();
    restoreConsole();
  });
});
