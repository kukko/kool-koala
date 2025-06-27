import { ControllerConstructor } from "../controllers";
import { AuthenticableEntity, Context } from "../types";
import { StringEnum } from "../types/common/string-enum";
import { JwtConfigurationParameters } from "./jwt-configuration-parameters";
import { DatabaseConfigurationParamters } from "./database-configuration-paramters";
import { RepositoryBase } from "../database";
import { StaticFilesConfigurationParameters } from "./static-files-configuration-parameters";
import { Next } from "koa";

export interface ConfigurationParameters<
  U extends AuthenticableEntity = AuthenticableEntity,
  P extends StringEnum = {}
> {
  port: number,
  controllers?: (ControllerConstructor)[],
  database?: DatabaseConfigurationParamters,
  jwt?: JwtConfigurationParameters,
  userRepository?: RepositoryBase<U>,
  permissionType?: P,
  restPrefix?: string,
  staticFiles?: StaticFilesConfigurationParameters[]
  middlewares?: ((context: Context, next: Next) => Promise<void>)[];
}
