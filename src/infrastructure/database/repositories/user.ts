import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/domain/models/user';
import { Repository } from 'typeorm';
import { BaseRepository } from './base';
import { UserEntity } from '../entities/user';

@Injectable()
export class UserRepository extends BaseRepository<UserModel, UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  findByUsernameOrEmail(username: string, email: string) {
    try {
      return this.repository.find({ where: [{ username }, { email }] });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  fromModel(model: UserModel): UserEntity {
    return {
      ...this.repository.create(),
      ...model,
    };
  }

  toModel(entity: UserEntity): UserModel {
    return entity;
  }
}
