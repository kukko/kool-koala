import { expect } from "chai";
import { KoalApp, RepositoryBase, SoftDeletableRepositoryBase } from "../../../src";
import { MockConfigurationParameters } from "../../mocks/mock-configuration-parameters";
import { mockConsole, restoreConsole } from "../../mocks/console-mock";
import { getKoalAppMock } from "../../mocks/koal-app-mock";
import { SoftDeletableMockRepository } from "../../mocks/mock-soft-deletable-repository";
import { SoftDeletableMockEntity } from "../../mocks/mock-soft-deletable-entity";

describe('SoftDeletableRepositoryBase', () => {
  let mockRepository: SoftDeletableRepositoryBase<SoftDeletableMockEntity>;
  before((done) => {
    mockConsole();
    getKoalAppMock(MockConfigurationParameters).initialize().then(() => {
      mockRepository = new SoftDeletableMockRepository();
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
      mockRepository.deleteAll(true).then(() => {
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
      mockRepository.deleteAll(true).then(() => {
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
      }).then(() => {
        return mockRepository.getAll(true);
      }).then((result) => {
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);
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
      mockRepository.deleteAll(true).then(() => {
        done();
      }).catch(done);
    });
  });
  describe('Find entity', () => {
    let testEntity: SoftDeletableMockEntity;
    before((done) => {
      mockRepository.save({
        name: 'Test'
      }).then((result) => {
        testEntity = result;
        done();
      }).catch(done);
    });
    it('Can find entity', (done) => {
      mockRepository.getOneWhere({
        where: {
          name: testEntity.name
        }
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result.name).to.equal(testEntity.name);
        return mockRepository.getById(result.id);
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result).to.have.property('id');
        expect(result.name).to.equal(testEntity.name);
        expect(result.id).to.equal(testEntity.id);
        return result;
      }).then((result) => {
        return mockRepository.delete(result);
      }).then(() => {
        return mockRepository.getOneWhere({
          where: {
            name: testEntity.name
          }
        });
      }).then((result) => {
        expect(result).to.be.null;
        return mockRepository.getById(testEntity.id);
      }).then((result) => {
        expect(result).to.be.null;
      }).then(() => {
        return mockRepository.getOneWhere({
          where: {
            name: testEntity.name
          }
        }, true);
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result.name).to.equal(testEntity.name);
        return mockRepository.getById(testEntity.id, undefined, true);
      }).then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('name');
        expect(result).to.have.property('id');
        expect(result.name).to.equal(testEntity.name);
        expect(result.id).to.equal(testEntity.id);
        done();
      }).catch(done);
    });
  });
  after(async () => {
    await KoalApp.resetInstance();
    restoreConsole();
  });
});
