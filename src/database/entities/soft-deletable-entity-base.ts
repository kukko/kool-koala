import { Column } from "typeorm";
import { EntityBase } from "./entity-base";
import { SoftDeletable } from "./interfaces/soft-deletable";

export abstract class SoftDeletableEntityBase extends EntityBase implements SoftDeletable {
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
} 