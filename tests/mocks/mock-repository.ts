import { IdentifiableEntity, RepositoryBase } from "../../src";
import { MockEntity } from './mock-entity';

export class MockRepository extends RepositoryBase<MockEntity> {
  constructor() {
    super();
  }
  getEntityType(): new () => MockEntity {
    return MockEntity;
  }
}
