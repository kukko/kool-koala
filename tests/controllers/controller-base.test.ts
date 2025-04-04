import { expect } from "chai";

import { AuthenticableEntity, ControllerBase, KoalApp } from "../../src/index";
import { getKoalAppMock } from "../mocks/koal-app-mock";
import { mockConsole, restoreConsole } from "../mocks/console-mock";
import { getMockController } from '../mocks/mock-controller';

const mockRoute = '/mock';

describe('ControllerBase', () => {
  let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
  before((done) => {
    mockConsole();
    koalApp = getKoalAppMock({
      port: 3000,
      controllers: [
        getMockController(mockRoute)
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
