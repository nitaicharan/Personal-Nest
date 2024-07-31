import { IsUUID } from 'class-validator';

export class BaseDto {
  @IsUUID()
  id: string;
}
