import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, QueryRunner, Repository } from "typeorm";
import { IdentifiableEntity } from "../../types";
import { KoalApp } from "../../common";

export abstract class RepositoryBase<T extends IdentifiableEntity> {
  private _repository: Repository<T>;
  constructor(queryRunner?: QueryRunner) {
    if (queryRunner === undefined) {
      this._repository = KoalApp.getInstance().getDatabaseConnection().getRepository(this.getEntityType());
    }
    else {
      this._repository = queryRunner.manager.getRepository(this.getEntityType());
    }
  }
  getRepository() {
    return this._repository;
  }
  abstract getEntityType(): new () => T;
  getAll() {
    return this._repository.find();
  }
  getWhere(options: FindManyOptions<T>) {
    return this._repository.find(options);
  }
  getOneWhere(options: FindOneOptions<T>) {
    return this._repository.findOne(options);
  }
  getById(id: number, relations?: FindOptionsRelations<T>) {
    return this.getRepository().findOne(<FindOneOptions<T>>{
      where: {
        id
      },
      relations
    });
  }
  save(entity: T | DeepPartial<T>) {
    return this.getRepository().save(entity);
  }
  find(where: FindManyOptions<T>) {
    return this.getRepository().find(where);
  }
  findOne(where: FindOneOptions<T>) {
    return this.getRepository().findOne(where);
  }
  delete(entity: T) {
    return this.getRepository().delete(entity.id);
  }
  deleteWhere(where?: FindOptionsWhere<T>) {
    return this.getRepository().delete(where);
  }
  deleteAll() {
    return this.deleteWhere({});
  }
}
