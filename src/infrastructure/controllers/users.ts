import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUsecase } from 'src/application/usecases/users/create';
import { CreateDto } from '../dto/users/create';
import { ListUsecase } from 'src/application/usecases/users/list';
import { PaginationMetadataDto } from '../dto/base/pagination-medata';
import { DeleteUsecase } from 'src/application/usecases/users/delete';
import { FindUsecase } from 'src/application/usecases/users/find';
import { UpdateUsecase } from 'src/application/usecases/users/update';
import { UpdateDto } from '../dto/users/update';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(
    private readonly createUsecase: CreateUsecase,
    private readonly listUsecase: ListUsecase,
    private readonly delteUsecase: DeleteUsecase,
    private readonly findUsecase: FindUsecase,
    private readonly updateUsecase: UpdateUsecase,
  ) {}

  @Post()
  async create(@Body() dto: CreateDto) {
    await this.createUsecase.execute({ ...dto, articles: [] });
  }

  @Get('/:id')
  find(@Param('id') id: string) {
    return this.findUsecase.execute(id);
  }

  @Get()
  list(@Query() pagination: PaginationMetadataDto) {
    return this.listUsecase.execute(pagination);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.delteUsecase.execute(id);
  }

  @Patch('/:id')
  async edit(@Param('id') id: string, @Body() dto: UpdateDto) {
    await this.updateUsecase.execute(id, dto);
  }
}
