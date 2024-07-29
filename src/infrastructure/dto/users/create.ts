import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
