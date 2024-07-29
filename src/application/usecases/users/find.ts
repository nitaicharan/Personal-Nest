import { Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';

@Injectable()
export class FindUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  async execute(id: string) {
    const model = await this.persistency.find(id);
    if (!model) throw new Error(`User: ${id} doesn't exists`);

    return model;
  }
}
