import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { PermissionHolderEntity } from '../types/entities/permission-holder-entity';
import { AuthorizationError } from '../types/errors/authorization-error';
import { HumanIdentifiable } from '../types/entities/human-identifiable';
import { IdentifiableEntity } from '../types/entities/identifiable';

export class AuthorizationService<
  U extends IdentifiableEntity & PermissionHolderEntity & HumanIdentifiable,
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