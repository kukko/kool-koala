import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { AuthorizationError } from '../types/errors/authorization-error';
import { AuthenticableEntity } from '../types';

export class AuthorizationService<
  U extends AuthenticableEntity,
  P
> {
  constructor(private userRepository: Repository<U>) {
  }
  async userHasRight(user: U, permission: P) {
    user = await this.userRepository.findOne({
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