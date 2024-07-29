import { Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class UpdateUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  async execute(id: string, model: Partial<UserModel>) {
    const entity = await this.persistency.find(id);
    if (!entity) throw new Error(`User: ${id} doesn't exists`);

    const checkUsernameAndEmail = await this.persistency.findByUsernameOrEmail(
      model.username,
      model.email,
    );

    checkUsernameAndEmail.some((user) => {
      if (user.id === entity.id) return false;

      return true;
    });

    if (checkUsernameAndEmail.length > 0) {
      throw new Error('Email or username already exists!');
    }

    this.persistency.update(id, { ...entity, ...model });
  }
}
