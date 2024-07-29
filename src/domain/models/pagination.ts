import { BaseModel } from './base';
import { PaginationMetadataModel } from './pagination-metadata';

export class PaginationModel<
  T extends BaseModel,
> extends PaginationMetadataModel {
  readonly data: T[];
}
