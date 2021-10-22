import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';
import { UserRole } from './user-role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post()
  @ApiBody({ type: [CreateCatDto] })
  async create(@Body() createCatDto: CreateCatDto[]) {
  }

  @ApiQuery({ name: 'role', enum: UserRole })
  @Delete()
  async filterByRole(@Query('role') role: UserRole = UserRole.User) { }

  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
    },
  })
  @Patch()
  async create1(@Body() coords: number[][]) { }
}
