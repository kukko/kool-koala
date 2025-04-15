import { DeleteDateColumn } from "typeorm";
import { SoftDeletable } from "./interfaces/soft-deletable";
import { AuditedEntityBase } from "./audited-entity-base";

export abstract class SoftDeletableAuditedEntityBase extends AuditedEntityBase implements SoftDeletable {
  @DeleteDateColumn()
  deletedAt: Date;
}