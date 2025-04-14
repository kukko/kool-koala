import { QueryRunner } from "typeorm";
import { AuthenticableEntity } from "../entities";

export interface State {
  user?: AuthenticableEntity;
  queryRunner: QueryRunner;
}