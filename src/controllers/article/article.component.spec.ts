import { ArticleController } from './article.controller';
import { Test } from '@nestjs/testing';

describe('ArticleController', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ArticleController],
    }).compile();

    controller = moduleRef.get<ArticleController>(ArticleController);
  });

  describe('findAll', () => {
    it('should return an array of Article', async () => {
      expect(await controller.findAll()).toEqual([]);
    });
  });
});
