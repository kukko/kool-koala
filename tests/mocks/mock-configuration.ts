import { Configuration } from "../../src";
import { MockDataSource } from "./mock-data-source";

export const MockConfiguration = new Configuration({
  port: 8080,
  database: {
    dataSource: MockDataSource,
    shouldRunMigrations: true
  }
})