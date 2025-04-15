import { Column, Entity } from "typeorm";
import { SoftDeletableEntityBase } from "../../src";

@Entity()
export class SoftDeletableMockEntity extends SoftDeletableEntityBase {
  @Column()
  name: string;
}
