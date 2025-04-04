import { expect } from "chai";

import { AuthenticableEntity, ControllerBase, KoalApp } from "../../src/index";
import Router from "koa-router";
import { getKoalAppMock } from "../mocks/koal-app-mock";
import { mockConsole, restoreConsole } from "../mocks/console-mock";

const mockRoute = '/mock';

class MockController extends ControllerBase {
  constructor(protected router: Router) {
    super(router);
  }

  registerEndpoints(): void {
    this.router.get(mockRoute, () => { });
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
  it('Should register endpoints', async () => {
    expect(koalApp?.getRouterService().getRouter().stack.filter((route) => {
      return route.path === mockRoute && route.methods.includes('GET');
    })).to.have.length(1);
  });
  after(() => {
    KoalApp.resetInstance();
    restoreConsole();
  });
});
