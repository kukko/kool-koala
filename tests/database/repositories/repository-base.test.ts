import { expect } from "chai";
import { KoalApp, RepositoryBase } from "../../../src";
import { MockRepository } from '../../mocks/mock-repository';
import { MockEntity } from "../../mocks/mock-entity";
import { MockConfigurationParameters } from "../../mocks/mock-configuration-parameters";
import { mockConsole, restoreConsole } from "../../mocks/console-mock";
import { getKoalAppMock } from "../../mocks/koal-app-mock";

describe('RepositoryBase', () => {
  let mockRepository: RepositoryBase<MockEntity>;
  before((done) => {
    mockConsole();
    getKoalAppMock(MockConfigurationParameters).initialize().then(() => {
      mockRepository = new MockRepository();
      done();
    });
  });
  it('Should be defined', () => {
    expect(RepositoryBase).to.be.a('function');
  });
  it('Should be a class', () => {
    expect(mockRepository).to.be.an.instanceof(RepositoryBase);
  });
  describe('Save entity', () => {
    it('Can create entity', (done) => {
      mockRepository.save({
        name: 'Test'
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('id');
        expect(result).to.have.property('name');
        done();
      }).catch(done);
    });
    after((done) => {
      mockRepository.deleteAll().then(() => {
        done();
      }).catch(done);
    });
  });
  describe('Fetch entitites', () => {
    before((done) => {
      mockRepository.save({
        name: 'Test'
      }).then(() => {
        done();
      }).catch(done);
    });
    it('Can query entities', (done) => {
      mockRepository.getAll().then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);
        done();
      }).catch(done);
    });
    after((done) => {
      mockRepository.deleteAll().then(() => {
        done();
      }).catch(done);
    });
  });
  describe('Delete entity', () => {
    before((done) => {
      mockRepository.save({
        name: 'Test'
      }).then(() => {
        done();
      }).catch(done);
    });
    it('Can delete entity', (done) => {
      mockRepository.getAll().then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);
        return mockRepository.delete(result[0]);
      }).then(() => {
        return mockRepository.getAll();
      }).then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(0);
        done();
      }).catch(done);
    });
  });
  describe('Update entity', () => {
    before((done) => {
      mockRepository.save({
        name: 'Test'
      }).then(() => {
        done();
      }).catch(done);
    });
    it('Can update entity', (done) => {
      mockRepository.getAll().then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.have.property('name');
        expect(result[0].name).to.equal('Test');
        result[0].name = 'Test 2';
        return mockRepository.save(result[0]);
      }).then(() => {
        return mockRepository.getAll();
      }).then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.have.property('name');
        expect(result[0].name).to.equal('Test 2');
        done();
      }).catch(done);
    });
    after((done) => {
      mockRepository.deleteAll().then(() => {
        done();
      }).catch(done);
    });
  });
  describe('Find entity', () => {
    before((done) => {
      mockRepository.save({
        name: 'Test'
      }).then(() => {
        done();
      }).catch(done);
    });
    it('Can find entity', (done) => {
      mockRepository.getOneWhere({
        where: {
          name: 'Test'
        }
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result.name).to.equal('Test');
        return mockRepository.getById(result.id);
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result).to.have.property('id');
        expect(result.name).to.equal('Test');
        expect(result.id).to.equal(5);
        done();
      }).catch(done);
    });
  });
  after(async () => {
    await KoalApp.resetInstance();
    restoreConsole();
  });
});
