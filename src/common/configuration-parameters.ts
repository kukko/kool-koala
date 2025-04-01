import { DataSource, Repository } from "typeorm";
import { ControllerConstructor } from "../controllers";
import { AuthenticableEntity } from "../types";

export interface DatabaseConfigurationParamters {
  dataSource: DataSource,
  shouldRunMigrations: boolean
}

export interface ConfigurationParameters<U extends AuthenticableEntity, P> {
  controllers: (ControllerConstructor)[],
  database?: DatabaseConfigurationParamters,
  jwt?: {
    saltRounds: number,
    secretKey: string
  },
  userRepository: Repository<U>
}