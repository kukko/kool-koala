import { expect } from 'chai';
import { AuthenticableEntity, Configuration, ConfigurationParameters, IdentifiableEntity, PermissionEntity } from '../../src/index';
import { getMockController } from '../mocks/mock-controller';
import { MockDataSource } from '../mocks/mock-data-source';
import { MockPermission } from '../mocks/mock-permission';

let configurationParameters: ConfigurationParameters;

describe('Configuration', () => {
  before(() => {
    configurationParameters = {
      port: 3000,
      controllers: [
        getMockController()
      ],
      database: {
        dataSource: MockDataSource,
        shouldRunMigrations: false
      },
      jwt: {
        saltRounds: 10,
        secretKey: 'secret'
      },
      permissionType: MockPermission,
      restPrefix: '/api'
    };
  });
  it('should be defined', () => {
    expect(Configuration).to.be.a('function');
  });
  describe('Methods return correct value', () => {
    let configuration: Configuration<AuthenticableEntity, {}> | undefined;
    before(() => {
      configuration = new Configuration<AuthenticableEntity, {}>(configurationParameters);
    });
    it('Should return the correct port', () => {
      expect(configuration?.getPort()).to.equal(configurationParameters.port);
    });
    it('Should return the correct controllers', () => {
      expect(configuration?.getControllers()).to.equal(configurationParameters.controllers);
    });
    it('Should return the correct database', () => {
      expect(configuration?.getDatabase()).to.equal(configurationParameters.database);
    });
    it('Should return the correct jwt', () => {
      expect(configuration?.getJwtParameters()).to.equal(configurationParameters.jwt);
    });
    it('Should return the correct user repository', () => {
      expect(configuration?.getUserRepository()).to.equal(configurationParameters.userRepository);
    });
    it('Should return the correct permission type', () => {
      expect(configuration?.getPermissionType()).to.equal(configurationParameters.permissionType);
    });
    it('Should return the correct rest prefix', () => {
      expect(configuration?.getRestPrefix()).to.equal(configurationParameters.restPrefix);
    });
  });
});