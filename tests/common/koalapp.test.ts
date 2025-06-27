import { expect } from 'chai';
import { AuthenticableEntity, KoalApp } from '../../src';
import { mockConsole, restoreConsole } from '../mocks/console-mock';
import { getKoalAppMock } from '../mocks/koal-app-mock';
import { MockConfigurationParameters } from '../mocks/mock-configuration-parameters';
import axios from 'axios';

import { join } from 'path';
import fs from 'fs';

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
        console.log(`http://localhost:${MockConfigurationParameters.port}/koala.png`);
        axios.get(`http://localhost:${MockConfigurationParameters.port}/koala.png`, {
          validateStatus: () => true
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.headers['content-type']).to.equal('image/png');
          expect(parseInt(response.headers['content-length'])).to.equal(fs.statSync(join(__dirname, '../assets/koala.png')).size);
          done();
        }).catch(done);
      });
    });

    after(async () => {
      await KoalApp.getInstance().stop();
      await KoalApp.resetInstance();
      //restoreConsole();
    });
  });
});