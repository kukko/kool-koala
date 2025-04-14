import { expect } from "chai";

import { AuthenticableEntity, ControllerBase, KoalApp, RepositoryBase } from "../../src/index";
import { getKoalAppMock } from "../mocks/koal-app-mock";
import { mockConsole, restoreConsole } from "../mocks/console-mock";
import { MockRoute } from "../mocks/mock-route";
import { MockRestController } from '../mocks/mock-rest-controller'

const defaultApiPrefix = '/api';

describe('ControllerBase', () => {
  let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
  before((done) => {
    mockConsole();
    koalApp = getKoalAppMock({
      port: 3000,
      controllers: [
        MockRestController
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
