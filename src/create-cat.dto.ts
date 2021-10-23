import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCatDto {
    /**
     * A list of user's roles
     * @example ['admin']
     */
    name: string;
    age: number;
    breed: string;
    isEnabled: boolean;
}

export class AdditionalCatInfo {
    color: string;
}

export class PartialUpdateCatDto extends PartialType(CreateCatDto) { }

export class PickUpdateCatDto extends PickType(CreateCatDto, ['age']) { }

export class OmitUpdateCatDto extends OmitType(CreateCatDto, ['name']) { }

export class IntersectionUpdateCatDto extends IntersectionType(CreateCatDto, AdditionalCatInfo) { }

export class CompositionUpdateCatDto extends PartialType(OmitType(CreateCatDto, ['name'])) { }