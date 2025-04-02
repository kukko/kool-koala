import { DataSource, Repository } from "typeorm";
import { ControllerConstructor } from "../controllers/controller-base";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";
import { ConfigurationParameters, DatabaseConfigurationParamters } from "./configuration-parameters";

interface JwtParameters {
  saltRounds: number,
  secretKey: string
}

export class Configuration<
  U extends AuthenticableEntity,
  P extends Record<string, string | number>
> {
  constructor(
    private parameters: ConfigurationParameters<U, P>
  ) { }
  static instantiate<
    T extends AuthenticableEntity,
    Q extends Record<string, string | number>
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
  getJwtParameters(): JwtParameters {
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
