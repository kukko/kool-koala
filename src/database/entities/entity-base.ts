import { PrimaryGeneratedColumn } from "typeorm";
import { IdentifiableEntity } from "../../types";

export abstract class EntityBase implements IdentifiableEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
