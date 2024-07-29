import { Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';

@Injectable()
export class DeleteUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  async execute(id: string) {
    const model = await this.persistency.find(id);
    if (!model) throw new Error(`User: ${id} doesn't exists`);

    this.persistency.delete(id);
  }
}
