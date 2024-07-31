import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
import { BaseDto } from '../base/base';
import { RemoveNullCharacters } from 'src/infrastructure/database/decoretors/remove-null-characters';

export class UpdateDto extends PickType(BaseDto, ['id']) {
  @IsString()
  @IsNotEmpty()
  @RemoveNullCharacters()
  name: string;

  @IsString()
  @IsNotEmpty()
  @RemoveNullCharacters()
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/)
  username: string;

  @IsEmail()
  email: string;

  @RemoveNullCharacters()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  image?: string;
}
