import { OmitType } from '@nestjs/swagger';
import { UpdateDto } from './update';

export class CreateDto extends OmitType(UpdateDto, ['id']) {}
