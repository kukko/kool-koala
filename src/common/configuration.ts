import { DataSource, Repository } from "typeorm";
import { ControllerConstructor } from "../controllers/controller-base";
import { AuthenticableEntity } from "../types/entities/authenticable-entity";
import { ConfigurationParameters, DatabaseConfigurationParamters } from "./configuration-parameters";

interface JwtParameters {
  saltRounds: number,
  secretKey: string
}

export class Configuration<U extends AuthenticableEntity, P> {
  private port = 8080;
  constructor(
    private controllers: (ControllerConstructor)[],
    private jwt: JwtParameters,
    private userRepository: Repository<U>,
    private database?: DatabaseConfigurationParamters,
  ) { }
  static instantiate<T extends AuthenticableEntity, Q>(configurationParameters: ConfigurationParameters<T, Q>): Configuration<T, Q> {
    return new Configuration<T, Q>(
      configurationParameters.controllers,
      {
        saltRounds: configurationParameters.jwt?.saltRounds,
        secretKey: configurationParameters.jwt?.secretKey
      },
      configurationParameters.userRepository,
      configurationParameters.database
    );
  }
  getControllers() {
    return this.controllers;
  }
  getDatabase() {
    return this.database;
  }
  getPort(): number {
    return this.port;
  }
  getJwtParameters(): JwtParameters {
    return this.jwt;
  }
  getUserRepository() {
    return this.userRepository;
  }
}
