import { Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';

@Injectable()
export class ListUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  execute() {
    // TODO: check the user permission to list user
    return this.persistency.list();
  }
}
