import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationMetadataDto {
  @Min(0)
  @IsNumber()
  @IsOptional()
  readonly offset: number = 0;

  @IsOptional()
  @IsPositive()
  readonly limit: number = 10;
}
