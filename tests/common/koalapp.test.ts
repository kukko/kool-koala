import { expect } from 'chai';
import { AuthenticableEntity, ControllerBase, KoalApp, State, StatusCode } from '../../src';
import { mockConsole, restoreConsole } from '../mocks/console-mock';
import { getKoalAppMock } from '../mocks/koal-app-mock';
import { MockConfigurationParameters } from '../mocks/mock-configuration-parameters';
import axios from 'axios';

import { join } from 'path';
import fs from 'fs';
import { ParameterizedContext } from 'koa';

interface MockState extends State {
  middlewareTest?: string;
}

class MockController extends ControllerBase {
  registerEndpoints(): void {
    this.router.get('/testingMiddleware', async (context: ParameterizedContext<MockState>, next) => {
      context.body = context.state.middlewareTest;
      context.status = StatusCode.OK;
    });
  }
}

describe('KoalApp', () => {
  it('should be defined', () => {
    expect(KoalApp).to.be.a('function');
  });
  describe('Works as expected', () => {
    let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
    before(() => {
      mockConsole();
    })
    describe('Without middlewares', () => {
      before((done) => {
        koalApp = getKoalAppMock({
          ...MockConfigurationParameters,
          staticFiles: [
            {
              folder: join(__dirname, '../assets'),
            }
          ]
        });
        koalApp.initialize().then(() => {
          koalApp.start().then(() => {
            done();
          });
        });
      });

      describe('Serves static files', () => {
        it('Serves text file', (done) => {
          axios.get(`http://localhost:${MockConfigurationParameters.port}/test.txt`, {
            validateStatus: () => true
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.data).to.equal('It is working! Kool!');
            done();
          }).catch(done);
        });
        it('Serves image', (done) => {
          axios.get(`http://localhost:${MockConfigurationParameters.port}/koala.png`, {
            validateStatus: () => true
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/png');
            expect(parseInt(response.headers['content-length'])).to.equal(fs.statSync(join(__dirname, '../assets/koala.png')).size);
            done();
          }).catch(done);
        });
        it('Serves default file when no file requested', (done) => {
          axios.get(`http://localhost:${MockConfigurationParameters.port}/`, {
            validateStatus: () => true
          }).then((response) => {
            expect(response.status).to.equal(StatusCode.OK);
            expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
            expect(response.data.length).to.equal(fs.statSync(join(__dirname, '../assets/index.html')).size);
            done();
          }).catch(done);
        });
        it('Serves default file when requested file not found', (done) => {
          axios.get(`http://localhost:${MockConfigurationParameters.port}/koala.jpg`, {
            validateStatus: () => true
          }).then((response) => {
            expect(response.status).to.equal(StatusCode.OK);
            expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');
            expect(response.data.length).to.equal(fs.statSync(join(__dirname, '../assets/index.html')).size);
            done();
          }).catch(done);
        });
      });
      after(async () => {
        await KoalApp.getInstance().stop();
        await KoalApp.resetInstance();
      });
    });
    describe('With middlewares', () => {
      before((done) => {
        koalApp = getKoalAppMock({
          ...MockConfigurationParameters,
          staticFiles: [
            {
              folder: join(__dirname, '../assets'),
            }
          ],
          middlewares: [
            async (context: ParameterizedContext<MockState>, next) => {
              context.state.middlewareTest = 'testingMiddleware';
              await next();
            }
          ],
          controllers: [
            MockController
          ]
        });
        koalApp.initialize().then(() => {
          koalApp.start().then(() => {
            done();
          });
        });
      });

      it('Middlewares are called', (done) => {
        axios.get(`http://localhost:${MockConfigurationParameters.port}/testingMiddleware`, {
          validateStatus: () => true
        }).then((response) => {
          expect(response.status).to.equal(StatusCode.OK);
          expect(response.data).to.equal('testingMiddleware');
          done();
        }).catch(done);
      });

      after(async () => {
        await KoalApp.getInstance().stop();
        await KoalApp.resetInstance();
      });
    });

    after(async () => {
      restoreConsole();
    });
  });
});