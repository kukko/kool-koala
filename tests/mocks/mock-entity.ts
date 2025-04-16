import { Column, Entity } from "typeorm";
import { AuditedEntityBase, EntityBase, IdentifiableEntity } from "../../src";

@Entity()
export class MockEntity extends EntityBase implements IdentifiableEntity {
  @Column()
  name: string;
}
