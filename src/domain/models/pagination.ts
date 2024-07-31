import { BaseModel } from './base';
import { PaginationMetadataModel } from './pagination-metadata';

export class PaginationModel<T extends BaseModel> {
  readonly data: T[];
  readonly pagination: PaginationMetadataModel;
}
