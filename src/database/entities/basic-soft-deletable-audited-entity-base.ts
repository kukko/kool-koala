import { Column } from "typeorm";
import { BasicAuditedEntityBase } from "./basic-audited-entity-base";
import { SoftDeletable } from "./interfaces/soft-deletable";

export abstract class BasicSoftDeletableAuditedEntityBase extends BasicAuditedEntityBase implements SoftDeletable {
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}