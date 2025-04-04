import { AuthenticableEntity } from "../types/entities/authenticable-entity";
import { ConfigurationParameters } from "./configuration-parameters";
import { StringEnum } from "../types/common/string-enum";
import { JwtConfigurationParameters } from "./jwt-configuration-parameters";

export class Configuration<
  U extends AuthenticableEntity,
  P extends StringEnum
> {
  constructor(
    private parameters: ConfigurationParameters<U, P>
  ) { }
  static instantiate<
    T extends AuthenticableEntity,
    Q extends StringEnum
  >(configurationParameters: ConfigurationParameters<T, Q>): Configuration<T, Q> {
    return new Configuration<T, Q>(
      configurationParameters
    );
  }
  getControllers() {
    return this.parameters.controllers;
  }
  getDatabase() {
    return this.parameters.database;
  }
  getPort(): number {
    return this.parameters.port;
  }
  getJwtParameters(): JwtConfigurationParameters {
    return this.parameters.jwt;
  }
  getUserRepository() {
    return this.parameters.userRepository;
  }
  getPermissionType() {
    return this.parameters.permissionType;
  }
  getRestPrefix() {
    return this.parameters.restPrefix ?? '/api';
  }
}
