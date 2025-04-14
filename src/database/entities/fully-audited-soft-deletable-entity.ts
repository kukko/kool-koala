import { Audited, AuditedSoftDeletable } from "./interfaces";

export abstract class FullyAuditedSoftDeletableEntity implements AuditedSoftDeletable, Audited {
  createdAt: Date;
  createdBy: number;

  updatedAt: Date;
  updatedBy: number;

  deletedBy: number;
  deletedAt: Date;
}
