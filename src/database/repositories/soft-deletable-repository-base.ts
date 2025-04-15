import { DeleteResult, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere } from "typeorm";
import { RepositoryBase } from "./repository-base";
import { SoftDeletableEntityBase } from "../entities";

export abstract class SoftDeletableRepositoryBase<T extends SoftDeletableEntityBase> extends RepositoryBase<T> {
  override getAll(withDeleted: boolean = false) {
    return this.getRepository().find({
      withDeleted
    });
  }

  override getWhere(options: FindManyOptions<T>, withDeleted: boolean = false) {
    options.withDeleted = withDeleted;
    return super.getWhere(options);
  }

  override getOneWhere(options: FindOneOptions<T>, withDeleted: boolean = false) {
    options.withDeleted = withDeleted;
    return super.getOneWhere(options);
  }

  override getById(id: number, relations?: FindOptionsRelations<T>, withDeleted: boolean = false) {
    return this.getRepository().findOne(<FindOneOptions<T>>{
      where: {
        id
      },
      relations,
      withDeleted
    });
  }

  override delete(entity: T, hardDelete: boolean = false) {
    if (!hardDelete) {
      return this.getRepository().softDelete(entity.id);
    }
    else {
      return this.getRepository().delete(entity.id);
    }
  }

  override deleteWhere(where?: FindOptionsWhere<T>, hardDelete: boolean = false) {
    if (!hardDelete) {
      return this.getRepository().softDelete(where);
    }
    else {
      return this.getRepository().delete(where);
    }
  }

  override deleteAll(hardDelete: boolean = false): Promise<DeleteResult> {
    return this.deleteWhere({}, hardDelete);
  }
}