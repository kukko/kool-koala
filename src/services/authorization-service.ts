import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { AuthorizationError } from '../types/errors/authorization-error';
import { AuthenticableEntity } from '../types';
import { KoalApp } from '../common';

export class AuthorizationService<
  U extends AuthenticableEntity,
  P
> {
  constructor() {
  }
  async userHasRight(user: U, permission: P) {
    user = <U>await KoalApp.getInstance().getConfiguration().getUserRepository().getOneWhere({
      where: <FindOptionsWhere<U>>{
        id: user.id
      },
      relations: <FindOptionsRelations<U>>{
        permissions: true
      }
    });
    if (!user.permissions.some((p) => p.textId === permission)) {
      throw new AuthorizationError(user, permission);
    }
  }
}