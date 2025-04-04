import { DataSource } from "typeorm";

export const mockDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite"
});