import { AuditedSoftDeletable } from "./interfaces";
import { SoftDeletableEntityBase } from "./soft-deletable-entity-base";

export abstract class AuditedSoftDeletableEntity extends SoftDeletableEntityBase implements AuditedSoftDeletable {
  deletedBy: number;
}
