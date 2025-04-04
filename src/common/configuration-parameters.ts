import { Repository } from "typeorm";
import { ControllerConstructor } from "../controllers";
import { AuthenticableEntity } from "../types";
import { StringEnum } from "../types/common/string-enum";
import { JwtConfigurationParameters } from "./jwt-configuration-parameters";
import { DatabaseConfigurationParamters } from "./database-configuration-paramters";

export interface ConfigurationParameters<
  U extends AuthenticableEntity = AuthenticableEntity,
  P extends StringEnum = {}
> {
  port: number,
  controllers?: (ControllerConstructor)[],
  database?: DatabaseConfigurationParamters,
  jwt?: JwtConfigurationParameters,
  userRepository?: Repository<U>,
  permissionType?: P,
  restPrefix?: string,
}