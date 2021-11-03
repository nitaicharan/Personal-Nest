import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './modules/article/article.module';

@Module({
  controllers: [AppController],
  imports: [ArticleModule],
})
export class AppModule {}
