import { IdentifiableEntity, RepositoryBase } from "../../src";
import { MockEntity } from './mock-entity';
import { mockDataSource } from './mock-data-source';

export class MockRepository<T extends IdentifiableEntity> extends RepositoryBase<T> {
  constructor(private entityType: new () => T) {
    super(mockDataSource);
  }
  getEntityType(): new () => T {
    return this.entityType;
  }
}

export function getMockRepository<T extends IdentifiableEntity>(entityType: new () => T = MockEntity as new () => T) {
  return new MockRepository(entityType);
}
