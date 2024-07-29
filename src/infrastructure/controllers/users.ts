import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUsecase } from 'src/application/usecases/users/create';
import { CreateDto } from '../dto/users/create';
import { ListUsecase } from 'src/application/usecases/users/list';
import { PaginationMetadataDto } from '../dto/base/pagination-medata';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(
    private readonly createUsecase: CreateUsecase,
    private readonly listUsecase: ListUsecase,
  ) {}

  @Post()
  create(@Body() dto: CreateDto) {
    return this.createUsecase.execute({ ...dto, articles: [] });
  }

  // @Get('/:id')
  // get() {}

  @Get()
  list(@Query() pagination: PaginationMetadataDto) {
    return this.listUsecase.execute(pagination);
  }

  // @Delete()
  // delete() {}
  //
  // @Patch()
  // edit() {}
}
