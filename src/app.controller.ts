import { applyDecorators, Body, Controller, Delete, Get, Patch, Post, Query, Type, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiExtension, ApiExtraModels, ApiHeader, ApiOkResponse, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CatDto } from './cat.dto';
import { CreateCatDto } from './create-cat.dto';
import { FileUploadDto } from './file-upload.dto';
import { PaginatedDto } from './paginated.dto';
import { UserRole } from './user-role.enum';

const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

@ApiTags('cats')
@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header'
})
@ApiExtraModels(PaginatedDto)
@Controller('cats')
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

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateCatDto
  })
  @Patch()
  async create1(@Body() coords: number[][]) { }


  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @Post('files')
  uploadFile(@UploadedFile() file) { }

  @ApiExtension('x-foo', { hello: 'world' })
  @Post('test')
  test() {
  }

  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(CatDto) },
            },
          },
        },
      ],
    },
  })
  @Get('find_all')
  async find_all(): Promise<PaginatedDto<CatDto>> {
    return new Promise(() => true);
  }


  @ApiPaginatedResponse(CatDto)
  async findAll(): Promise<PaginatedDto<CatDto>> {
    return new Promise(() => true);
  }
}
