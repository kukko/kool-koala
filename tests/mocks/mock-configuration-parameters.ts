import { Configuration } from "../../src";
import { MockDataSource } from "./mock-data-source";

export const MockConfigurationParameters = {
  port: 8082,
  database: {
    dataSource: MockDataSource,
    shouldRunMigrations: true
  }
};