import { DataSource, Repository } from "typeorm";
import { ControllerConstructor } from "../controllers";
import { AuthenticableEntity } from "../types";

export interface DatabaseConfigurationParamters {
  dataSource: DataSource,
  shouldRunMigrations: boolean
}

export interface ConfigurationParameters<
  U extends AuthenticableEntity,
  P extends Record<string, string | number>
> {
  port: number,
  controllers: (ControllerConstructor)[],
  database?: DatabaseConfigurationParamters,
  jwt?: {
    saltRounds: number,
    secretKey: string
  },
  userRepository: Repository<U>,
  permissionType: P,
  restPrefix?: string,
}