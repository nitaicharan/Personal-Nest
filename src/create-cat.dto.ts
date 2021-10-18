import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class CreateCatDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    breed: string;
}

export class AdditionalCatInfo {
    @ApiProperty()
    color: string;
}

export class PartialUpdateCatDto extends PartialType(CreateCatDto) { }

export class PickUpdateCatDto extends PickType(CreateCatDto, ['age']) { }

export class OmitUpdateCatDto extends OmitType(CreateCatDto, ['name']) { }

export class IntersectionUpdateCatDto extends IntersectionType(CreateCatDto, AdditionalCatInfo) { }

export class CompositionUpdateCatDto extends PartialType(OmitType(CreateCatDto, ['name'])) { }