import { Controller } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { CompositionUpdateCatDto, CreateCatDto, IntersectionUpdateCatDto, OmitUpdateCatDto, PartialUpdateCatDto, PickUpdateCatDto } from './create-cat.dto';

@Controller('cats')
@ApiExtraModels(CreateCatDto)
@ApiExtraModels(OmitUpdateCatDto)
@ApiExtraModels(PickUpdateCatDto)
@ApiExtraModels(PartialUpdateCatDto)
@ApiExtraModels(CompositionUpdateCatDto)
@ApiExtraModels(IntersectionUpdateCatDto)
export class AppController {
}
