import 'reflect-metadata';
import { DataSource, DataSourceOptions, DeepPartial } from "typeorm";
import { MockEntity } from "./mock-entity";
import { SoftDeletableMockEntity } from './mock-soft-deletable-entity';

export const MockDataSource = new DataSource(<DataSourceOptions>{
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  entities: [
    MockEntity,
    SoftDeletableMockEntity
  ]
});
