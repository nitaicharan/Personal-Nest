import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsecase } from 'src/application/usecases/users/create';
import { CreateDto } from '../dto/users/create';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly usecase: CreateUsecase) {}

  @Post()
  create(@Body() dto: CreateDto) {
    return this.usecase.execute(dto);
  }

  // @Get('/:id')
  // get() {}
  //
  // @Get()
  // list() {}
  //
  // @Delete()
  // delete() {}
  //
  // @Patch()
  // edit() {}
}
