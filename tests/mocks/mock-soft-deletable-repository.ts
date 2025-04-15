import { SoftDeletableRepositoryBase } from "../../src";
import { SoftDeletableMockEntity } from "./mock-soft-deletable-entity";

export class SoftDeletableMockRepository extends SoftDeletableRepositoryBase<SoftDeletableMockEntity> {
  constructor() {
    super();
  }
  getEntityType(): new () => SoftDeletableMockEntity {
    return SoftDeletableMockEntity;
  }
}
