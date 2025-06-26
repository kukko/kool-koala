import { MockDataSource } from "./mock-data-source";

export const MockConfigurationParameters = {
  port: 8083,
  database: {
    dataSource: MockDataSource,
    shouldRunMigrations: true
  }
};