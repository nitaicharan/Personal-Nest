import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ArticleModule } from '../../src/modules/article/article.module';
import { ArticleService } from '../../src/services/article/article.service';

describe('ArticleController', () => {
  let app: INestApplication;
  let service = { fetchArticles: () => [] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ArticleModule],
    })
      .overrideProvider(ArticleService)
      .useValue(service)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`GET /articles`, () => {
    return request(app.getHttpServer())
      .get('/articles')
      .expect(200)
      .expect(service.fetchArticles())
  });

  afterAll(async () => await app.close());
});