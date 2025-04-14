import { BasicAuditedEntityBase } from "./basic-audited-entity-base";
import { Audited } from "./interfaces";

export class AuditedEntityBase extends BasicAuditedEntityBase implements Audited {
  createdBy: number;
  updatedBy: number;
}