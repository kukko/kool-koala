import { expect } from 'chai';
import { AuthenticableEntity, KoalApp } from '../../src';
import { mockConsole, restoreConsole } from '../mocks/console-mock';
import { getKoalAppMock } from '../mocks/koal-app-mock';
import { MockConfigurationParameters } from '../mocks/mock-configuration-parameters';
import axios from 'axios';

import { join } from 'path';

describe('KoalApp', () => {
  it('should be defined', () => {
    expect(KoalApp).to.be.a('function');
  });
  describe('Works as expected', () => {
    let koalApp: KoalApp<AuthenticableEntity, {}> | undefined;
    before((done) => {
      //mockConsole();
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

    it('Serves static file', (done) => {
      axios.get(`http://localhost:${MockConfigurationParameters.port}/test.txt`, {
        validateStatus: () => true
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.equal('It is working! Kool!');
        done();
      }).catch(done);
    });

    after(async () => {
      await KoalApp.getInstance().stop();
      await KoalApp.resetInstance();
      //restoreConsole();
    });
  });
});