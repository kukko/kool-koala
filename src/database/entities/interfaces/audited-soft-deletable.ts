import { SoftDeletable } from "./soft-deletable";

export interface AuditedSoftDeletable extends SoftDeletable {
  deletedBy: number;
}
