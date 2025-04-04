import { DataSource } from "typeorm";

export interface DatabaseConfigurationParamters {
  dataSource: DataSource,
  shouldRunMigrations: boolean
}
