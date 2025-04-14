import { Column } from "typeorm";
import { EntityBase } from "./entity-base";
import { BasicAudited } from "./interfaces/basic-audited";

export abstract class BasicAuditedEntityBase extends EntityBase implements BasicAudited {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}