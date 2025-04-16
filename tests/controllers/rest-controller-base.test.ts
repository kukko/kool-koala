import { expect } from "chai";
import { AuthenticableEntity, ControllerBase, KoalApp, RepositoryBase } from "../../src/index";
import { getKoalAppMock } from "../mocks/koal-app-mock";
import { MockRoute } from "../mocks/mock-route";
import { MockRestController } from '../mocks/mock-rest-controller'
import axios from 'axios';
import { MockConfigurationParameters } from "../mocks/mock-configuration-parameters";
import { mockConsole, restoreConsole } from "../mocks/console-mock";

const defaultApiPrefix = '/api';

describe('RestControllerBase', () => {
  let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
  before((done) => {
    mockConsole();
    koalApp = getKoalAppMock({
      ...MockConfigurationParameters,
      controllers: [
        MockRestController
      ]
    });
    koalApp.initialize().then(() => {
      koalApp.start().then(() => {
        done();
      });
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
  describe('Endpoints work correctly', () => {
    it('Create endpoint', (done) => {
      axios.post('http://localhost:8082/api/mock', {
        name: 'test'
      }, {
        validateStatus: () => true
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.data).to.be.an('object');
        expect(response.data.entity.name).to.equal('test');
        expect(response.data.entity.id).to.be.a('number');
        expect(response.data.entity.id).to.be.equal(1);
        done();
      }).catch(done);
    });
    it('List endpoint', (done) => {
      axios.get('http://localhost:8082/api/mock', {
        validateStatus: () => true
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
        expect(response.data.length).to.equal(1);
        done();
      }).catch(done);
    });
    it('View endpoint', (done) => {
      axios.get('http://localhost:8082/api/mock/1', {
        validateStatus: () => true
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
        expect(response.data.name).to.equal('test');
        expect(response.data.id).to.be.a('number');
        expect(response.data.id).to.be.equal(1);
        done();
      }).catch(done);
    });
    it('Delete endpoint', (done) => {
      axios.delete('http://localhost:8082/api/mock/1', {
        validateStatus: () => true
      }).then((response) => {
        expect(response.status).to.equal(200);
        axios.get('http://localhost:8082/api/mock/1', {
          validateStatus: () => true
        }).then((response) => {
          expect(response.status).to.equal(404);
          axios.get('http://localhost:8082/api/mock', {
            validateStatus: () => true
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
            expect(response.data.length).to.equal(0);
            done();
          });
        }).catch(done);
      }).catch(done);
    });
  });
  after(async () => {
    KoalApp.getInstance().stop();
    await KoalApp.resetInstance();
    restoreConsole();
  });
});
