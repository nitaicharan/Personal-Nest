import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';
import { BaseModel } from 'src/domain/models/base';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class CreateUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  async execute(model: Omit<UserModel, keyof BaseModel>) {
    // NOTE: send notification after creation
    const usernameCheck = await this.persistency.findByUsernameOrEmail(
      model.username,
      model.email,
    );

    if (usernameCheck.length) {
      throw new BadRequestException(
        `User with username: ${model.username} or email: ${model.email} already exists!`,
      );
    }

    return this.persistency.create(model);
  }
}
