import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EntityBase } from "./entity-base";
import { Audited } from "./interfaces/audited";

export abstract class AuditedEntityBase extends EntityBase implements Audited {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}