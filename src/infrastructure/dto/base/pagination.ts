import { IsArray } from 'class-validator';
import { PaginationMetadataDto } from './pagination-medata';

export class PageDto<T> extends PaginationMetadataDto {
  @IsArray()
  readonly data: T[];
}
