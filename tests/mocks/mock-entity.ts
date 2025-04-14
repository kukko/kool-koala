import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IdentifiableEntity } from "../../src";

@Entity()
export class MockEntity implements IdentifiableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
