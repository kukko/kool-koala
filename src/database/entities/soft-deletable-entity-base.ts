import { Column, DeleteDateColumn } from "typeorm";
import { EntityBase } from "./entity-base";
import { SoftDeletable } from "./interfaces/soft-deletable";

export abstract class SoftDeletableEntityBase extends EntityBase implements SoftDeletable {
  @DeleteDateColumn()
  deletedAt: Date;
}
