import { Middleware } from "koa";
import { State } from "../types/common/state";
import { KoalApp } from "../common";

export const transactionMiddleware: Middleware<State> = async (context, next) => {
  const queryRunner = KoalApp.getInstance().getDatabaseConnection().createQueryRunner();
  context.state.queryRunner = queryRunner;
  queryRunner.startTransaction();
  try {
    await next();
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};
