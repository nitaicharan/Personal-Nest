import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  @Get()
  findAll() {
    return [];
  }
}
