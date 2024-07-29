import { UserModel } from 'src/domain/models/user';
import { IBasePersistency } from './base';

export interface IUserPersistency extends IBasePersistency<UserModel> {
  findByUsernameOrEmail(
    username: string | undefined,
    email: string | undefined,
  ): Promise<UserModel[]>;
}

export const IUserPersistency = Symbol('IUserPersistency');
