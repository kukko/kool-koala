import { BasicAudited } from "./basic-audited";

export interface Audited extends BasicAudited {
  createdBy: number;
  updatedBy: number;
}
