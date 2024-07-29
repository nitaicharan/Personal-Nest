import { Inject, Injectable } from '@nestjs/common';
import { IUserPersistency } from 'src/application/persistencies/user';
import { PaginationMetadataModel } from 'src/domain/models/pagination-metadata';

@Injectable()
export class ListUsecase {
  constructor(
    @Inject(IUserPersistency) private readonly persistency: IUserPersistency,
  ) {}

  execute(pagination: PaginationMetadataModel) {
    // TODO: check the user permission to list user
    return this.persistency.list(pagination);
  }
}
